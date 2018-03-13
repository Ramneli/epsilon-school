package com.epsilonschool.dao.service;

import com.epsilonschool.dao.repository.TimetableRepository;
import com.epsilonschool.entity.Subject;
import com.epsilonschool.entity.Timetable;
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
        List<Timetable> timetables = findAllUserSubjectRelations(userId);
        return findAllSubjectsOfUser(timetables);
    }

    private List<Subject> findAllSubjectsOfUser(List<Timetable> timetables) {
        return timetables.stream()
                .map(timetable -> subjectService.getById(timetable.getSubjectId()))
                .collect(Collectors.toList());
    }

    private List<Timetable> findAllUserSubjectRelations(String userId) {
        return timetableRepository.findAll().stream()
                .filter(timetable -> timetable.getUserId().equals(userId)).collect(Collectors.toList());
    }
}
