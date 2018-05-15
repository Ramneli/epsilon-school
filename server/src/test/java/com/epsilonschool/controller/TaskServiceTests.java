package com.epsilonschool.controller;

import com.epsilonschool.dao.repository.ReportRepository;
import com.epsilonschool.dao.repository.SubjectRepository;
import com.epsilonschool.dao.repository.TaskRepository;
import com.epsilonschool.dao.service.TaskService;
import com.epsilonschool.entity.Task;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mockito;

import static org.mockito.Mockito.times;

public class TaskServiceTests {
    TaskRepository taskRepository;
    SubjectRepository subjectRepository;
    TaskService taskService;
    ReportRepository reportRepository;

    @Before
    public void setUp() {
        taskRepository = Mockito.mock(TaskRepository.class);
        subjectRepository = Mockito.mock(SubjectRepository.class);
        reportRepository = Mockito.mock(ReportRepository.class);
        taskService = new TaskService(taskRepository, subjectRepository, reportRepository);
    }

    @Test
    public void testTaskService
}