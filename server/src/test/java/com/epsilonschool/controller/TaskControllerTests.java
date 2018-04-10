package com.epsilonschool.controller;

import com.epsilonschool.dao.repository.TaskRepository;
import com.epsilonschool.dao.service.TaskService;
import com.epsilonschool.entity.Task;
import org.junit.Test;
import org.mockito.Mockito;

import static org.mockito.Mockito.times;

public class TaskControllerTests {
    @Test
    public void testTaskControllerGetAllTasks() {
        TaskRepository taskRepository = Mockito.mock(TaskRepository.class);
        TaskService taskService = new TaskService(taskRepository);
        TaskController taskController = new TaskController(taskService);

        taskController.getAllTasks();

        Mockito.verify(taskRepository, times(1)).findAll();
    }

    @Test
    public void testTaskControllerGetTaskByID() {
        TaskRepository taskRepository = Mockito.mock(TaskRepository.class);
        TaskService taskService = new TaskService(taskRepository);
        TaskController taskController = new TaskController(taskService);

        taskController.getTask("34");

        Mockito.verify(taskRepository, times(1)).findAll();
    }

    @Test
    public void testTaskControllerAddNewTask() {
        TaskRepository taskRepository = Mockito.mock(TaskRepository.class);
        TaskService taskService = new TaskService(taskRepository);
        TaskController taskController = new TaskController(taskService);

        Task task = new Task();
        taskController.addTask(task);

        Mockito.verify(taskRepository, times(1)).save(task);
    }
}
