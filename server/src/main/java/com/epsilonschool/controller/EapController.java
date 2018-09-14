package com.epsilonschool.controller;

import com.epsilonschool.dao.service.EapService;
import com.epsilonschool.dao.service.UserService;
import com.epsilonschool.entity.EapSubject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/eap")
public class EapController {

    @Autowired
    private EapService eapService;
    @Autowired
    private UserService userService;

    @PostMapping("/add")
    public ResponseEntity addSubject(@RequestBody EapSubject eapSubject) {
        // FIXME: wtf?
        eapService.addSubject(eapSubject);
        double weighedAverageGrade = eapService.getUserAverageGrade(eapSubject.getUserId());
        userService.updateAverageGrade(eapSubject.getUserId(), weighedAverageGrade);
        return ResponseEntity.ok(true);
    }

    @PostMapping("/{uid}/get")
    public ResponseEntity<List<EapSubject>> getAllSubjects(@PathVariable String uid) {
        return ResponseEntity.ok(eapService.getAllSubjectsByUserId(uid));
    }

    @PostMapping("/delete")
    public ResponseEntity<Boolean> deleteSubject(@RequestParam String id, @RequestParam String uid) {
        // FIXME: wtf?
        eapService.deleteSubject(id);
        double weighedAverageGrade = eapService.getUserAverageGrade(uid);
        userService.updateAverageGrade(uid, weighedAverageGrade);
        return ResponseEntity.ok(true);
    }
}
