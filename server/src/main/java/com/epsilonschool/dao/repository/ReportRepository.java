package com.epsilonschool.dao.repository;

import com.epsilonschool.entity.Report;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface ReportRepository extends CrudRepository<Report, String> {
    List<Report> findAllByReportee(String reportee);

    @Modifying
    @Transactional
    @Query (value = "DELETE FROM reports WHERE reportee=?1", nativeQuery = true)
    void clearReportsOfUser(String uid);

    @Query(value = "SELECT Count(*) AS arv FROM reports WHERE task_id=?1", nativeQuery = true)
    int countReportsForTask(String taskId);

    @Query(value = "SELECT * FROM reports", nativeQuery = true)
    List<Report> findAllReports();
}
