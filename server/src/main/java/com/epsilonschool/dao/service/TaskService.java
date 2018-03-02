package com.epsilonschool.dao.service;

import com.epsilonschool.dao.repository.TaskRepository;
import com.epsilonschool.entity.Task;
import org.springframework.stereotype.Service;

@Service
public class TaskService {
    private TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public Task getTask(String taskId) {
        return taskRepository.findOne(taskId);
    }
}
