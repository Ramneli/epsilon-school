package com.epsilonschool.dao.service;

import com.epsilonschool.dao.repository.EapDao;
import com.epsilonschool.entity.EapSubject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;


@Service
public class EapService {

    private static final int MAX_SUBJECTS = 50;
    private static final int MIN_GRADE = 1;
    private static final int MAX_GRADE = 5;
    private static final int MIN_EAP = 1;
    private static final int MAX_EAP = 120;

    @Autowired
    private EapDao eapDao;

    public void addSubject(EapSubject eapSubject) {
        int subjectsForUser = this.eapDao.getCountSubjectsForUser(eapSubject.getUserId());
        if (subjectsForUser >= MAX_SUBJECTS) {
            throw new IllegalArgumentException("Too many subjects for user.");
        } else {
            if (isValidSubject(eapSubject)) {
                this.eapDao.insert(eapSubject);
                return;
            }
            throw new IllegalArgumentException("Invalid data.");
        }
    }

    public boolean isValidSubject(EapSubject eapSubject) {
        return isValidEap(eapSubject) && isValidGrade(eapSubject);
    }

    private boolean isValidGrade(EapSubject subject) {
        return subject.getGrade() <= MAX_GRADE && subject.getGrade() >= MIN_GRADE;
    }

    private boolean isValidEap(EapSubject subject) {
        return subject.getEap() <= MAX_EAP && subject.getEap() >= MIN_EAP;
    }


    public List<EapSubject> getAllSubjectsByUserId(String userId) {
        return eapDao.findAllByUserId(userId);
    }

    public double getUserAverageGrade(String userId) {
        List<EapSubject> userEapSubjects = eapDao.findAllByUserId(userId);
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

    public void deleteSubject(String id) {
        eapDao.delete(id);
    }
}
