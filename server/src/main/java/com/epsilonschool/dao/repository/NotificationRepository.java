package com.epsilonschool.dao.repository;

import com.epsilonschool.entity.Notification;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.util.List;

@Repository
public interface NotificationRepository extends CrudRepository<Notification, String> {

    @Modifying
    @Transactional
    @Query(value = "UPDATE notifications SET message=?2 , deadline=?3 WHERE id=?1", nativeQuery = true)
    void updateNotification(String id, String message, Date deadline);

    List<Notification> findAll();
}
