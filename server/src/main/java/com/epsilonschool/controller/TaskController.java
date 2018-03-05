package com.epsilonschool.controller;

import com.epsilonschool.dao.service.TaskService;
import com.epsilonschool.entity.Task;
import org.springframework.web.bind.annotation.*;

@RestController
public class TaskController {
    private TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @CrossOrigin(origins = "http://localhost:9000")
    @RequestMapping(value = "/task/get/{taskId}", method = RequestMethod.POST)
    public Task getTask(@PathVariable String taskId) {
        return taskService.getTask(taskId);
    }

    @RequestMapping(value = "/task/add", method = RequestMethod.POST)
    public void addTask(@RequestBody Task task) {
        taskService.addTask(task);
    }
}
