package com.epsilonschool.controller;

import com.epsilonschool.dao.service.TaskService;
import com.epsilonschool.entity.Task;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class TaskController {
    private TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @RequestMapping(value = "/task/get/{subjectId}", method = RequestMethod.POST)
    public List<Task> getTask(@PathVariable String subjectId) {
        return taskService.getTask(subjectId);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @RequestMapping(value = "/task/add", method = RequestMethod.POST)
    public void addTask(@RequestBody Task task) {
        taskService.addTask(task);
    }
}
