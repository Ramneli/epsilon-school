package com.epsilonschool.dao.repository;

import com.epsilonschool.entity.Task;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.util.List;

@Repository
public interface TaskRepository extends CrudRepository<Task, String> {

    List<Task> findAll();
    @Modifying
    @Transactional
    @Query(value = "UPDATE task SET description=?1, deadline=?4 WHERE id=?2 AND author=?3", nativeQuery = true)
    void updateTask(String description, String taskId, String authorUid, Date taskDeadline);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM task WHERE id=?1 AND author=?2", nativeQuery = true)
    void deleteTask(String taskId, String uid);

    @Query(value = "SELECT * FROM task WHERE id IN (SELECT task_id FROM reports WHERE reportee=?1)", nativeQuery = true)
    List<Task> findAllReportedTasks(String uid);
}
