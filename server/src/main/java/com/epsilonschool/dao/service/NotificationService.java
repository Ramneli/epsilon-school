package com.epsilonschool.dao.service;

import com.epsilonschool.dao.repository.NotificationDao;
import com.epsilonschool.entity.Notification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationService {

    @Autowired
    private NotificationDao notificationDao;

    public void update(Notification notification) {
        notificationDao.update(notification.getId(), notification.getMessage(), notification.getDeadline());
    }

    public void save(Notification notification) {
        this.notificationDao.insert(notification);
    }

    public List<Notification> getValidNotifications() {
        return notificationDao.getAllValidNotifications();
    }
}