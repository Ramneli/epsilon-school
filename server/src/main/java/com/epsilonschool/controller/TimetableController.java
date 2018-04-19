package com.epsilonschool.controller;

import com.epsilonschool.dao.service.TimetableService;
import com.epsilonschool.dao.service.UserService;
import com.epsilonschool.entity.Subject;
import com.epsilonschool.entity.Timetable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class TimetableController {
    private TimetableService timetableService;
    private UserService userService;


    public TimetableController(TimetableService timetableService, UserService userService) {
        this.timetableService = timetableService;
        this.userService = userService;
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @RequestMapping(value = "/timetable/addTo", method = RequestMethod.POST)
    public void addToTimetable(@RequestBody Timetable timetable) {
        timetableService.addToTimeTable(timetable);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @RequestMapping(value = "/timetable/remove", method = RequestMethod.POST)
    public void removeFromTimetable(@RequestBody Timetable timetable) {
        timetableService.removeFromTimeTable(timetable);
    }


    @CrossOrigin(origins = "http://localhost:4200")
    @RequestMapping(value = "/timetable/get/{uid}", method = RequestMethod.POST)
    public List<Subject> getSubjectsFromTimetable(@PathVariable String uid) {
        return timetableService.getSubjects(uid);
    }
}
