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
        timetable.setUserId(getUserIdByUsername(timetable.getUsername()));
        timetableService.addToTimeTable(timetable);
    }

    private String getUserIdByUsername(String username) {
        return userService.getUserByName(username).getId();
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @RequestMapping(value = "/timetable/get/{user_id}", method = RequestMethod.POST)
    public List<Subject> getSubjectsFromTimetable(@PathVariable String user_id) {
        return timetableService.getSubjects(user_id);
    }
}
