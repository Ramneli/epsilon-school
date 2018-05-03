package com.epsilonschool.controller;

import com.epsilonschool.entity.Subject;
import com.epsilonschool.dao.service.SubjectService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/subject")
public class SubjectController {

    private SubjectService subjectService;

    public SubjectController(SubjectService subjectService) {
        this.subjectService = subjectService;
    }

    @PostMapping("/get/{subjectId}")
    public Subject getSubject(@PathVariable String subjectId) {
        return subjectService.getById(subjectId);
    }

    @PostMapping("/all")
    public List<Subject> getSubjects() {
        return subjectService.getSubjects();
    }

    @PostMapping("/search")
    public List<Subject> getSubjectsSearch(@RequestParam String searchKeyword) {
        return subjectService.getSubjects(searchKeyword);
    }

    @PostMapping("/add")
    public void addSubject(@RequestBody Subject subject) {
        subjectService.addSubject(subject);
    }
}
