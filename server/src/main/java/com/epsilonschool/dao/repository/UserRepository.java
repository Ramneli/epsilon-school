package com.epsilonschool.dao.repository;

import com.epsilonschool.entity.User;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Repository
public interface UserRepository extends CrudRepository<User, String>{
    User findByUid(String uid);

    @Modifying
    @Transactional
    @Query (value = "UPDATE user SET average_grade=?2 WHERE uid=?1", nativeQuery = true)
    void updateAverageGrade(String userId, double weighedAverageGrade);

    @Query (value = "SELECT * FROM user WHERE report_count > 0", nativeQuery = true)
    List<User> findAllReportedUsers();

    @Modifying
    @Transactional
    @Query (value = "UPDATE user SET is_blocked=0 WHERE uid=?1", nativeQuery = true)
    void unBlockUser(String uid);

    @Modifying
    @Transactional
    @Query (value = "UPDATE user SET is_blocked=1 WHERE uid=?1", nativeQuery = true)
    void blockUser(String uid);

    @Modifying
    @Transactional
    @Query (value = "UPDATE user SET report_count=0 WHERE uid=?1", nativeQuery = true)
    void resolveReports(String uid);

    @Modifying
    @Transactional
    @Query (value = "UPDATE user SET report_count = report_count + 1 WHERE uid =?1", nativeQuery = true)
    void increaseReportCount(String reportee);
}
