package com.epsilonschool.dao.repository;

import com.epsilonschool.entity.Timetable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TimetableRepository extends CrudRepository<Timetable, String> {

    List<Timetable> findAll();
}
