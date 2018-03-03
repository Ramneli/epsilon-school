package com.epsilonschool.dao.service;

import com.epsilonschool.dao.repository.TimetableRepository;
import com.epsilonschool.entity.Timetable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TimetableService {

    private TimetableRepository timetableRepository;

    public TimetableService(TimetableRepository timetableRepository) {
        this.timetableRepository = timetableRepository;
    }

    public void addToTimeTable(Timetable timetable) {
        timetableRepository.save(timetable);
    }

    public List<Timetable> getSubjects(String userId) {
        return timetableRepository.findByUserId(userId);
    }
}
