package com.epsilonschool.dao.service;

import com.epsilonschool.dao.repository.EapSubjectRepository;
import com.epsilonschool.entity.EapSubject;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class EapSubjectService {

    private EapSubjectRepository eapSubjectRepository;

    public EapSubjectService(EapSubjectRepository eapSubjectRepository) {
        this.eapSubjectRepository = eapSubjectRepository;
    }

    public void addEapSubject(EapSubject eapSubject) {
        this.eapSubjectRepository.save(eapSubject);
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
        BigDecimal roundedValue = BigDecimal.valueOf(weighedEap / eapSum);
        roundedValue = roundedValue.setScale(3, BigDecimal.ROUND_HALF_UP);
        return roundedValue.doubleValue();
    }
}
