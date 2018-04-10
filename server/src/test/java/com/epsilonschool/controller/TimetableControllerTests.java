package com.epsilonschool.controller;

import com.epsilonschool.dao.repository.SubjectRepository;
import com.epsilonschool.dao.repository.TimetableRepository;
import com.epsilonschool.dao.repository.UserRepository;
import com.epsilonschool.dao.service.SubjectService;
import com.epsilonschool.dao.service.TimetableService;
import com.epsilonschool.dao.service.UserService;
import com.epsilonschool.entity.Timetable;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mockito;

import static org.mockito.Mockito.times;


public class TimetableControllerTests {

    TimetableRepository timetableRepository;
    SubjectRepository subjectRepository;
    UserRepository userRepository;
    SubjectService subjectService;
    TimetableService timetableService;
    UserService userService;
    TimetableController controller;

    @Before
    public void setUp() {
        timetableRepository = Mockito.mock(TimetableRepository.class);
        subjectRepository = Mockito.mock(SubjectRepository.class);
        userRepository = Mockito.mock(UserRepository.class);

        subjectService = new SubjectService(subjectRepository);
        timetableService = new TimetableService(timetableRepository, subjectService);
        userService = new UserService(userRepository);

        controller = new TimetableController(timetableService, userService);
    }

    @Test
    public void testTimetableGetByUid() {
        controller.getSubjectsFromTimetable("newuid123");

        Mockito.verify(timetableRepository, times(1)).findAll();
    }

    @Test
    public void testTimetableAddToTimetable() {
        Timetable timetable = new Timetable();
        controller.addToTimetable(timetable);

        Mockito.verify(timetableRepository, times(1)).save(timetable);
    }

}
