package com.epsilonschool.dao.service;

import com.epsilonschool.dao.repository.TaskRepository;
import com.epsilonschool.entity.Task;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TaskService {
    private TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public List<Task> getTask(String subjectId) {
        return getAllTasksOfSubject(subjectId);
    }

    private List<Task> getAllTasksOfSubject(String subjectId) {
        return taskRepository.findAll().stream()
                .filter(task -> task.getSubjectId().equals(subjectId)).collect(Collectors.toList());
    }

    public boolean addTask(Task task) {
        try {
            taskRepository.save(task);
        } catch (Exception e) {
            return false;
        }
        return true;
    }
}
