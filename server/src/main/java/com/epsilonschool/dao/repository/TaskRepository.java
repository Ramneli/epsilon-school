package com.epsilonschool.dao.repository;

import com.epsilonschool.entity.Task;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends CrudRepository<Task, String> {
    // TODO: Return all tasks that are relevant: task date > current date. Use @Query.


    @Query(value = "SELECT * FROM task WHERE deadline >= CURDATE()", nativeQuery = true)
    List<Task> findAll();
}
