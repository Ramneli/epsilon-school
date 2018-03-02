package com.epsilonschool.dao.service;

import com.epsilonschool.dao.repository.SubjectRepository;
import com.epsilonschool.entity.Subject;
import org.springframework.stereotype.Service;

@Service
public class SubjectService {

    private SubjectRepository subjectRepository;

    public Subject getDataFromRepo(String id) {
        return subjectRepository.findOne(id);
    }

    public SubjectService(SubjectRepository subjectRepository) {
        this.subjectRepository = subjectRepository;
    }
}
