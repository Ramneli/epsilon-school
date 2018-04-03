package com.epsilonschool.controller;

import com.epsilonschool.entity.Subject;
import com.epsilonschool.dao.service.SubjectService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class SubjectController {

    private SubjectService subjectService;

    public SubjectController(SubjectService subjectService) {
        this.subjectService = subjectService;
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @RequestMapping(value = "/subject/get/{subjectId}", method = RequestMethod.POST)
    public Subject getSubject(@PathVariable String subjectId) {
        return subjectService.getById(subjectId);
    }

    @RequestMapping(value = "/subjects", method = RequestMethod.POST)
    public List<Subject> getSubjects() {
        return subjectService.getSubjects();
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @RequestMapping(value = "/subject/add", method = RequestMethod.POST)
    public void addSubject(@RequestBody Subject subject) {
        subjectService.addSubject(subject);
    }
}
