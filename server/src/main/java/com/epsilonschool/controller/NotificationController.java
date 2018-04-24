package com.epsilonschool.controller;

import com.epsilonschool.dao.service.NotificationService;
import com.epsilonschool.entity.Notification;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/notification")
public class NotificationController {

    private NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @PostMapping("/update")
    public void updateNotification(@RequestBody Notification notification) {
        this.notificationService.updateNotifications(notification);
    }

    @PostMapping("/save")
    public void saveNotification(@RequestBody Notification notification) {
        this.notificationService.save(notification);
    }

    @PostMapping("/load")
    public List<Notification> loadNotifications() {
        return this.notificationService.loadNotifications();
    }
}
