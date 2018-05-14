package com.epsilonschool.controller;

import com.epsilonschool.dao.repository.EapSubjectRepository;
import com.epsilonschool.dao.service.EapSubjectService;
import com.epsilonschool.entity.EapSubject;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mockito;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;

public class EapSubjectTests {

    EapSubjectService eapSubjectService;
    EapSubjectRepository eapSubjectRepository;
    EapSubject responseEntityValidEapSubject;
    EapSubject responseEntityInvalidEapSubject;




    @Before
    public void setUp() {
        eapSubjectRepository = Mockito.mock(EapSubjectRepository.class);
        eapSubjectService = new EapSubjectService(eapSubjectRepository);
        responseEntityValidEapSubject = new EapSubject();
        responseEntityInvalidEapSubject = new EapSubject();

        responseEntityValidEapSubject.setGrade(2);
        responseEntityValidEapSubject.setEap(2);
        responseEntityValidEapSubject.setUserId("1");

        responseEntityInvalidEapSubject.setGrade(7);
        responseEntityInvalidEapSubject.setEap(2);
        responseEntityValidEapSubject.setUserId("1");
    }

    @Test
    public void testIfSubjectIsValidSubjectWithEapGreaterThanAllowed() {
        EapSubject eapSubject = new EapSubject();
        eapSubject.setEap(128);
        eapSubject.setGrade(5);
        Assert.assertFalse(eapSubjectService.isValidEapSubject(eapSubject));
    }

    @Test
    public void testIfSubjectIsValidWithMaxAllowedValues() {
        EapSubject eapSubject = new EapSubject();
        eapSubject.setEap(127);
        eapSubject.setGrade(5);
        Assert.assertTrue(eapSubjectService.isValidEapSubject(eapSubject));
    }

    @Test
    public void testIfSubjectIsValidWithMinAllowedValues() {
        EapSubject eapSubject = new EapSubject();
        eapSubject.setEap(1);
        eapSubject.setGrade(1);
        Assert.assertTrue(eapSubjectService.isValidEapSubject(eapSubject));
    }

    @Test
    public void testIfSubjectIsValidWithZeroGrade() {
        EapSubject eapSubject = new EapSubject();
        eapSubject.setEap(54);
        eapSubject.setGrade(0);
        Assert.assertFalse(eapSubjectService.isValidEapSubject(eapSubject));
    }

    @Test
    public void testIfSubjectIsValidWithZeroEap() {
        EapSubject eapSubject = new EapSubject();
        eapSubject.setEap(0);
        eapSubject.setGrade(2);
        Assert.assertFalse(eapSubjectService.isValidEapSubject(eapSubject));
    }

    @Test
    public void testIfSubjectIsValidWithZeroGradeAndEap() {
        EapSubject eapSubject = new EapSubject();
        eapSubject.setEap(0);
        eapSubject.setGrade(0);
        Assert.assertFalse(eapSubjectService.isValidEapSubject(eapSubject));
    }

    @Test
    public void testIfSubjectIsValidSubjectWithGradeGreaterThanAllowed() {
        EapSubject eapSubject = new EapSubject();
        eapSubject.setEap(2);
        eapSubject.setGrade(6);
        Assert.assertFalse(eapSubjectService.isValidEapSubject(eapSubject));
    }

    @Test
    public void testIfSubjectIsValidSubjectWithGradeAndEapGreaterThanAllowed() {
        EapSubject eapSubject = new EapSubject();
        eapSubject.setEap(128);
        eapSubject.setGrade(6);
        Assert.assertFalse(eapSubjectService.isValidEapSubject(eapSubject));
    }

    @Test
    public void testEapCalculatorWith10ProperSubjects() {
        List<EapSubject> mock10Subjects = new ArrayList<>();
        for (int i = 0; i < 10; i++) {
            EapSubject eapSubject = new EapSubject();
            eapSubject.setGrade(5);
            eapSubject.setEap(i);
            mock10Subjects.add(eapSubject);
        }
        Mockito.when(eapSubjectRepository.findAllByUserId("1")).thenReturn(mock10Subjects);
        Assert.assertEquals(eapSubjectService.calculateUserAverageGrade("1"), 5, 0.001);
    }

    @Test
    public void testEapCalculatorWithBorderlineEapAndGradeValues() {
        List<EapSubject> mockSubjects = new ArrayList<>();
        EapSubject eapSubject1 = new EapSubject();
        eapSubject1.setEap(1);
        eapSubject1.setGrade(1);
        EapSubject eapSubject2 = new EapSubject();
        eapSubject2.setEap(127);
        eapSubject2.setGrade(5);
        EapSubject eapSubject3 = new EapSubject();
        eapSubject3.setEap(1);
        eapSubject3.setGrade(5);
        EapSubject eapSubject4 = new EapSubject();
        eapSubject4.setEap(127);
        eapSubject4.setGrade(1);
        mockSubjects.add(eapSubject1);
        mockSubjects.add(eapSubject2);
        mockSubjects.add(eapSubject3);
        mockSubjects.add(eapSubject4);
        Mockito.when(eapSubjectRepository.findAllByUserId("1")).thenReturn(mockSubjects);

        Assert.assertEquals(eapSubjectService.calculateUserAverageGrade("1"), 3, 0.001);
    }

    @Test
    public void testEapCalculatorWithDecimalAverage() {
        List<EapSubject> mockSubjects = new ArrayList<>();
        EapSubject eapSubject1 = new EapSubject();
        eapSubject1.setEap(3);
        eapSubject1.setGrade(2);
        EapSubject eapSubject2 = new EapSubject();
        eapSubject2.setEap(5);
        eapSubject2.setGrade(4);
        EapSubject eapSubject3 = new EapSubject();
        eapSubject3.setEap(4);
        eapSubject3.setGrade(4);
        EapSubject eapSubject4 = new EapSubject();
        eapSubject4.setEap(6);
        eapSubject4.setGrade(4);
        mockSubjects.add(eapSubject1);
        mockSubjects.add(eapSubject2);
        mockSubjects.add(eapSubject3);
        mockSubjects.add(eapSubject4);
        Mockito.when(eapSubjectRepository.findAllByUserId("1")).thenReturn(mockSubjects);
        
        Assert.assertEquals(eapSubjectService.calculateUserAverageGrade("1"), 3.667, 0.001);
    }

    @Test
    public void testAddEapSubjectToUserWithZeroSubjects() {
        Mockito.when(eapSubjectRepository.countSubjectsForUser("1")).thenReturn(0);

        ResponseEntity responseEntity = eapSubjectService.addEapSubject(responseEntityValidEapSubject);
        Assert.assertEquals(responseEntity.getStatusCodeValue(),200);
    }

    @Test
    public void testAddEapSubjectToUserWith49Subjects() {
        Mockito.when(eapSubjectRepository.countSubjectsForUser("1")).thenReturn(49);

        ResponseEntity responseEntity = eapSubjectService.addEapSubject(responseEntityValidEapSubject);
        Assert.assertEquals(responseEntity.getStatusCodeValue(),200);
    }

    @Test
    public void testAddEapSubjectToUserWith50Subjects() {
        Mockito.when(eapSubjectRepository.countSubjectsForUser("1")).thenReturn(50);

        ResponseEntity responseEntity = eapSubjectService.addEapSubject(responseEntityValidEapSubject);
        Assert.assertEquals(responseEntity.getStatusCodeValue(),400);
    }

    @Test
    public void testAddEapSubjectWithInvalidData() {
        Mockito.when(eapSubjectRepository.countSubjectsForUser("1")).thenReturn(49);
        ResponseEntity responseEntity = eapSubjectService.addEapSubject(responseEntityInvalidEapSubject);
        Assert.assertEquals(responseEntity.getStatusCodeValue(),400);
    }

}
