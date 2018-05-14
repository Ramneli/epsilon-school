package com.epsilonschool.controller;

import com.epsilonschool.dao.service.TaskService;
import com.epsilonschool.entity.Task;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/task")
public class TaskController {
    private TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @PostMapping("/get/{subjectId}")
    public List<Task> getTask(@PathVariable String subjectId) {
        return taskService.getTask(subjectId);
    }

    @PostMapping("/getAll")
    public List<Task> getAllTasks() {
        return taskService.getAllTasks();
    }

    @PostMapping("/add")
    public boolean addTask(@RequestBody Task task) {
        return taskService.addTask(task);
    }

    @PostMapping("/getAll/{subjectId}")
    public String getTasksForSubject(@PathVariable String subjectId, @RequestParam String uid) {
        return taskService.getSubjectWithAllTasks(subjectId, uid).toString();
    }

    @PostMapping("/update")
    public boolean updateTask(@RequestBody Task task) {
        return taskService.updateTask(task);
    }

    @PostMapping("/delete")
    public boolean deleteTask(@RequestBody Task task) {
        return taskService.deleteTask(task);
    }

}
