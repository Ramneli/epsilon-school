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

    @CrossOrigin(origins = "http://localhost:9000")
    @RequestMapping(value = "/subject/get/{subjectName}", method = RequestMethod.POST)
    public List<Subject> getSubject(@PathVariable String subjectName) {
        return subjectService.getSubject(subjectName);
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
