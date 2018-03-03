package com.epsilonschool.controller;

import com.epsilonschool.dao.service.TimetableService;
import com.epsilonschool.entity.Timetable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class TimetableController {
    private TimetableService timetableService;

    public TimetableController(TimetableService timetableService) {
        this.timetableService = timetableService;
    }

    @RequestMapping(value = "/timetable/addTo", method = RequestMethod.POST)
    public void addToTimetable(@RequestBody Timetable timetable) {
        timetableService.addToTimeTable(timetable);
    }

    @RequestMapping(value = "/timetable/get/{userId}", method = RequestMethod.POST)
    public List<Timetable> getSubjectsFromTimetable(@PathVariable String userId) {
        //TODO: Find and return all subjects of a user. Solution below not working.
        return timetableService.getSubjects(userId);
    }
}
