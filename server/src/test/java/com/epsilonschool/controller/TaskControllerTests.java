package com.epsilonschool.controller;

import com.epsilonschool.dao.repository.ReportRepository;
import com.epsilonschool.dao.repository.SettingsRepository;
import com.epsilonschool.dao.repository.SubjectRepository;
import com.epsilonschool.dao.repository.TaskRepository;
import com.epsilonschool.dao.service.TaskService;
import com.epsilonschool.entity.Task;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mockito;

import static org.mockito.Mockito.mockingDetails;
import static org.mockito.Mockito.times;

public class TaskControllerTests {
    TaskRepository taskRepository;
    SubjectRepository subjectRepository;
    ReportRepository reportRepository;
    SettingsRepository settingsRepository;
    TaskService taskService;
    TaskController taskController;

    @Before
    public void setUp() {
        taskRepository = Mockito.mock(TaskRepository.class);
        subjectRepository = Mockito.mock(SubjectRepository.class);
        settingsRepository = Mockito.mock(SettingsRepository.class);
        reportRepository = Mockito.mock(ReportRepository.class);
        taskService = new TaskService(taskRepository, subjectRepository, reportRepository, settingsRepository);
        taskController = new TaskController(taskService);
    }

    @Test
    public void testTaskControllerGetAllTasks() {
        taskController.getAllTasks();

        Mockito.verify(taskRepository, times(1)).findAll();
    }

    @Test
    public void testTaskControllerGetTaskByID() {
        taskController.getTask("34");

        Mockito.verify(taskRepository, times(1)).findAll();
    }

    @Test
    public void testTaskControllerAddNewTask() {
        Task task = new Task();
        taskController.addTask(task);

        Mockito.verify(taskRepository, times(1)).save(task);
    }
}
