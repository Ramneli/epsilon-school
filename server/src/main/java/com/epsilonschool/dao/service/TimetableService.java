package com.epsilonschool.dao.service;

import com.epsilonschool.dao.repository.SubjectRepository;
import com.epsilonschool.dao.repository.TimetableRepository;
import com.epsilonschool.entity.Subject;
import com.epsilonschool.entity.Timetable;
import com.epsilonschool.entity.User;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TimetableService {

    private TimetableRepository timetableRepository;
    private SubjectService subjectService;

    public TimetableService(TimetableRepository timetableRepository, SubjectService subjectService) {
        this.timetableRepository = timetableRepository;
        this.subjectService = subjectService;
    }

    public void addToTimeTable(Timetable timetable) {
        timetableRepository.save(timetable);
    }

    public List<Subject> getSubjects(String userId) {
        List<Timetable> timetables =  timetableRepository.findAll().stream()
                .filter(s -> s.getUserId().equals(userId)).collect(Collectors.toList());
        return timetables.stream()
                .map(t -> subjectService.getById(t.getSubjectId()))
                .collect(Collectors.toList());
    }
}
