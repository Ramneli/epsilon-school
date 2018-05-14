package com.epsilonschool.dao.service;

import com.epsilonschool.dao.repository.NotificationRepository;
import com.epsilonschool.entity.Notification;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

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
        List<Notification> allNotifications = this.notificationRepository.findAll();

        return allNotifications.stream()
                .filter(n -> n.getDeadline().after(Date.valueOf(LocalDate.now().minusDays(14))))
                .collect(Collectors.toList());
    }
}