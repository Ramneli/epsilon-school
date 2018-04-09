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


    public TimetableController(TimetableService timetableService) {
        this.timetableService = timetableService;
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @RequestMapping(value = "/timetable/addTo", method = RequestMethod.POST)
    public void addToTimetable(@RequestBody Timetable timetable) {
        timetableService.addToTimeTable(timetable);
    }


    @CrossOrigin(origins = "http://localhost:4200")
    @RequestMapping(value = "/timetable/get/{user_id}", method = RequestMethod.POST)
    public List<Subject> getSubjectsFromTimetable(@PathVariable String user_id) {
        return timetableService.getSubjects(user_id);
    }
}
