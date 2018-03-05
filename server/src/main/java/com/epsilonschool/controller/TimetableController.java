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

    @RequestMapping(value = "/timetable/addTo", method = RequestMethod.POST)
    public void addToTimetable(@RequestBody Timetable timetable) {
        timetableService.addToTimeTable(timetable);
    }

    @RequestMapping(value = "/timetable/get/{username}", method = RequestMethod.POST)
    public List<Subject> getSubjectsFromTimetable(@PathVariable String username) {
        String user = userService.getUserByName(username).getId();
        return timetableService.getSubjects(user);
    }
}
