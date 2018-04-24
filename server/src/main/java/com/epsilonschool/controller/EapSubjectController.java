package com.epsilonschool.controller;

import com.epsilonschool.dao.service.EapSubjectService;
import com.epsilonschool.dao.service.UserService;
import com.epsilonschool.entity.EapSubject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class EapSubjectController {

    private EapSubjectService eapSubjectService;
    private UserService userService;

    public EapSubjectController(EapSubjectService eapSubjectService, UserService userService) {
        this.eapSubjectService = eapSubjectService;
        this.userService = userService;
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @RequestMapping(value = "/eapsubject/add", method = RequestMethod.POST)
    public ResponseEntity addEapSubject(@RequestBody EapSubject eapSubject) {
        eapSubjectService.addEapSubject(eapSubject);
        double weighedAverageGrade = eapSubjectService.calculateUserAverageGrade(eapSubject.getUserId());
        userService.updateAverageGrade(eapSubject.getUserId(), weighedAverageGrade);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/eapsubject/get/{uid}")
    public List<EapSubject> getAllEapSubjects(@PathVariable String uid) {
        return eapSubjectService.getAllSubjectsByUserId(uid);
    }
}
