package com.epsilonschool.controller;

import com.epsilonschool.entity.Subject;
import com.epsilonschool.dao.service.SubjectService;
import com.epsilonschool.entity.Task;
import com.epsilonschool.dao.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

@RestController
public class SubjectController {

    @Autowired
    private JdbcTemplate database;

    public SubjectController(SubjectService subjectService) {
        this.subjectService = subjectService;
    }

    public SubjectService subjectService;
    public TaskService taskService;


    @CrossOrigin(origins = "http://localhost:9000")
    @RequestMapping(value = "/subject/get/{subjectId}", method = RequestMethod.POST)
    public Subject getSubjectFromDatabase(@PathVariable String subjectId) {
        return subjectService.getDataFromRepo(subjectId);
    }

    @CrossOrigin(origins = "http://localhost:9000")
    @RequestMapping(value = "/task/get/{taskId}", method = RequestMethod.POST)
    public Task getTask(@PathVariable String taskId) {
        return taskService.getTask(taskId);
    }
}
