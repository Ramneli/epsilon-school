package com.epsilonschool.controller;

import com.epsilonschool.dao.repository.SubjectRepository;
import com.epsilonschool.dao.service.SubjectService;
import com.epsilonschool.entity.Subject;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mockito;

public class SubjectControllerTests {

    SubjectRepository subjectRepository;
    SubjectService subjectService;
    SubjectController subjectController;

    @Before
    public void setUp() {
        subjectRepository = Mockito.mock(SubjectRepository.class);
        subjectService = new SubjectService(subjectRepository);
        subjectController = new SubjectController(subjectService);

    }
    @Test
    public void testSubjectControllerGetOneSubject() {

        subjectController.getSubject("896");

        Mockito.verify(subjectRepository, Mockito.times(1)).findById("896");
    }

    @Test
    public void testSubjectControllerGetAllSubjects() {

        subjectController.getSubjects();

        Mockito.verify(subjectRepository, Mockito.times(1)).findAll();
    }

    @Test
    public void testSubjectControllerAddNewSubject() {

        Subject subject = new Subject();
        subjectController.addSubject(subject);

        Mockito.verify(subjectRepository, Mockito.times(1)).save(subject);
    }
}
