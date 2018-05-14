package com.epsilonschool.dao.service;

import com.epsilonschool.dao.repository.EapSubjectRepository;
import com.epsilonschool.entity.EapSubject;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;


@Service
public class EapSubjectService {

    public static final int MAX_SUBJECTS = 50;

    private EapSubjectRepository eapSubjectRepository;

    public EapSubjectService(EapSubjectRepository eapSubjectRepository) {
        this.eapSubjectRepository = eapSubjectRepository;
    }

    public ResponseEntity addEapSubject(EapSubject eapSubject) {
        try {
            if (this.eapSubjectRepository.countSubjectsForUser(eapSubject.getUserId()) >= MAX_SUBJECTS) {
                return ResponseEntity.badRequest().body("Too many subjects for user.");
            } else {
                if (isValidEapSubject(eapSubject)) {
                    this.eapSubjectRepository.save(eapSubject);
                    return ResponseEntity.ok(HttpStatus.OK);
                }
                return ResponseEntity.badRequest().body("Invalid data.");
            }
        } catch (DataIntegrityViolationException e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body("Invalid data.");
        }
    }

    public boolean isValidEapSubject(EapSubject eapSubject) {
        return eapSubject.getEap() < 128 && eapSubject.getEap() > 0 && eapSubject.getGrade() <= 5 && eapSubject.getGrade() > 0;
    }


    public List<EapSubject> getAllSubjectsByUserId(String userId) {
        return eapSubjectRepository.findAllByUserId(userId);
    }

    public double calculateUserAverageGrade(String userId) {
        List<EapSubject> userEapSubjects = eapSubjectRepository.findAllByUserId(userId);
        double eapSum = 0;
        double weighedEap = 0;
        for (EapSubject eapSubject : userEapSubjects) {
            eapSum += eapSubject.getEap();
            weighedEap += eapSubject.getEap() * eapSubject.getGrade();
        }
        if (eapSum == 0) return 0;
        BigDecimal roundedValue = BigDecimal.valueOf(weighedEap / eapSum);
        roundedValue = roundedValue.setScale(3, BigDecimal.ROUND_HALF_UP);
        return roundedValue.doubleValue();
    }

    public void removeEapSubject(int id) {
        eapSubjectRepository.delete(id);
    }
}
