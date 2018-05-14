package com.epsilonschool.dao.repository;

import com.epsilonschool.entity.EapSubject;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface EapSubjectRepository extends CrudRepository<EapSubject, Integer> {

    List<EapSubject> findAllByUserId(String userId);

    @Query(value = "SELECT Count(*) AS arv FROM eap_calc_subjects WHERE user_id=?1", nativeQuery = true)
    int countSubjectsForUser(String userId);
}
