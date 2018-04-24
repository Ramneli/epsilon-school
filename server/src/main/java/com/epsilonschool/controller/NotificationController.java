package com.epsilonschool.controller;

import com.epsilonschool.dao.service.NotificationService;
import com.epsilonschool.entity.Notification;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/notification")
public class NotificationController {

    private NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }


    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/update")
    public void updateNotification(@RequestBody Notification notification) {
        this.notificationService.updateNotifications(notification);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/save")
    public void saveNotification(@RequestBody Notification notification) {
        this.notificationService.save(notification);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/load")
    public List<Notification> loadNotifications() {
        return this.notificationService.loadNotifications();
    }
}
