package com.epsilonschool.dao.service;

import com.epsilonschool.dao.repository.SubjectRepository;
import com.epsilonschool.entity.Subject;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubjectService {

    private SubjectRepository subjectRepository;

    public Subject getDataFromRepo(String id) {
        return subjectRepository.findOne(id);
    }

    public Subject getCustomSubject() {
        return subjectRepository.getCustomSubject();
    }

    public void addSubject(Subject subject) {
        subjectRepository.save(subject);
    }

    public List<Subject> getSubjects() {
        return subjectRepository.findAll();
    }
    public SubjectService(SubjectRepository subjectRepository) {
        this.subjectRepository = subjectRepository;
    }
}
