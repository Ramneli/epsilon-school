package com.epsilonschool.controller;

import com.epsilonschool.dao.service.TimetableService;
import com.epsilonschool.dao.service.UserService;
import com.epsilonschool.entity.Subject;
import com.epsilonschool.entity.Timetable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/timetable")
public class TimetableController {
    private TimetableService timetableService;
    private UserService userService;


    public TimetableController(TimetableService timetableService, UserService userService) {
        this.timetableService = timetableService;
        this.userService = userService;
    }

    @PostMapping("/addTo")
    public void addToTimetable(@RequestBody Timetable timetable) {
        timetableService.addToTimeTable(timetable);
    }

    @PostMapping("/remove")
    public void removeFromTimetable(@RequestBody Timetable timetable) {
        timetableService.removeFromTimeTable(timetable);
    }

    @PostMapping("/get/{uid}")
    public List<Subject> getSubjectsFromTimetable(@PathVariable String uid) {
        return timetableService.getSubjects(uid);
    }
}
