package com.epsilonschool.controller;

import com.epsilonschool.entity.Subject;
import com.epsilonschool.dao.service.SubjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class SubjectController {

    @Autowired
    private JdbcTemplate database;

    public SubjectController(SubjectService subjectService) {
        this.subjectService = subjectService;
    }

    public SubjectService subjectService;


    @CrossOrigin(origins = "http://localhost:9000")
    @RequestMapping(value = "/subject/get/{subjectId}", method = RequestMethod.POST)
    public Subject getSubject(@PathVariable String subjectId) {
        return subjectService.getDataFromRepo(subjectId);
    }

    @RequestMapping(value = "/subjects", method = RequestMethod.POST)
    public List<Subject> getSubjects() {
        return subjectService.getSubjects();
    }

    @RequestMapping(value = "/subject/add", method = RequestMethod.POST)
    public void addSubject(@RequestBody Subject subject) {
        subjectService.addSubject(subject);
    }

}
