package com.epsilonschool.controller;

import com.epsilonschool.dao.service.EapSubjectService;
import com.epsilonschool.dao.service.UserService;
import com.epsilonschool.entity.EapSubject;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.xml.crypto.Data;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class EapSubjectController {

    private EapSubjectService eapSubjectService;
    private UserService userService;

    public EapSubjectController(EapSubjectService eapSubjectService, UserService userService) {
        this.eapSubjectService = eapSubjectService;
        this.userService = userService;
    }

    @RequestMapping(value = "/eapsubject/add", method = RequestMethod.POST)
    public ResponseEntity addEapSubject(@RequestBody EapSubject eapSubject) {
        ResponseEntity response = eapSubjectService.addEapSubject(eapSubject);
        double weighedAverageGrade = eapSubjectService.calculateUserAverageGrade(eapSubject.getUserId());
        userService.updateAverageGrade(eapSubject.getUserId(), weighedAverageGrade);
        return response;
    }

    @PostMapping("/eapsubject/get/{uid}")
    public List<EapSubject> getAllEapSubjects(@PathVariable String uid) {
        return eapSubjectService.getAllSubjectsByUserId(uid);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/eapsubject/remove")
    public void removeEapSubject(@RequestParam("id") String id, @RequestParam("uid") String uid) {
        eapSubjectService.removeEapSubject(Integer.valueOf(id));
        double weighedAverageGrade = eapSubjectService.calculateUserAverageGrade(uid);
        userService.updateAverageGrade(uid, weighedAverageGrade);
    }
}
