package com.epsilonschool.dao.repository;

import com.epsilonschool.entity.EapSubject;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EapSubjectRepository extends CrudRepository<EapSubject, Integer> {

    List<EapSubject> findAllByUserId(String userId);
}
