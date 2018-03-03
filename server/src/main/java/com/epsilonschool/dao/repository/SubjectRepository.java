package com.epsilonschool.dao.repository;

import com.epsilonschool.entity.Subject;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SubjectRepository extends CrudRepository<Subject, String> {

    @Query(value = "select * from subject where name = 'mata'", nativeQuery = true)
    Subject getCustomSubject();

    List<Subject> findAll();
}
