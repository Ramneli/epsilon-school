package com.epsilonschool.dao.repository;

import com.epsilonschool.entity.Timetable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface TimetableRepository extends CrudRepository<Timetable, String> {

    List<Timetable> findAll();

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM timetable WHERE uid=?1 AND subject_id=?2", nativeQuery = true)
    void delete(String uid, String subjectId);
}
