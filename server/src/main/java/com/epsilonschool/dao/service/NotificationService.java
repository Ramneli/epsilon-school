package com.epsilonschool.dao.service;

import com.epsilonschool.dao.repository.NotificationRepository;
import com.epsilonschool.entity.Notification;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationService {

    private NotificationRepository notificationRepository;

    public NotificationService(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    public void updateNotifications(Notification notification) {
        notificationRepository.updateNotification(notification.getId(), notification.getMessage(), notification.getDeadline());
    }

    public void save(Notification notification) {
        this.notificationRepository.save(notification);
    }

    public List<Notification> loadNotifications() {
        return this.notificationRepository.findAll();
    }
}