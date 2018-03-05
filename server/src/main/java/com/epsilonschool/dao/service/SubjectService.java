package com.epsilonschool.dao.service;

import com.epsilonschool.dao.repository.SubjectRepository;
import com.epsilonschool.entity.Subject;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubjectService {

    private SubjectRepository subjectRepository;

    public Subject getCustomSubject() {
        return subjectRepository.getCustomSubject();
    }

    public void addSubject(Subject subject) {
        subjectRepository.save(subject);
    }

    public Subject getById(String id) {
        return subjectRepository.findById(id);
    }

    public List<Subject> getSubjects() {
        return subjectRepository.findAll();
    }
    public SubjectService(SubjectRepository subjectRepository) {
        this.subjectRepository = subjectRepository;
    }
}
