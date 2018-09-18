package com.epsilonschool.controller;

import com.epsilonschool.dao.service.NotificationService;
import com.epsilonschool.entity.Notification;
import org.apache.commons.lang3.Validate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/notification")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    @PutMapping()
    public void update(@RequestBody Notification notification) {
        Validate.isTrue(notification.getId() != null, "Id can not be null on update.");
        notificationService.update(notification);
    }

    @PostMapping()
    public void insert(@RequestBody Notification notification) {
        Validate.isTrue(notification.getId() == null, "Id must be null on insert.");
        notificationService.save(notification);
    }

    @GetMapping()
    public ResponseEntity<List<Notification>> getNotifications() {
        return ResponseEntity.ok().body(notificationService.getValidNotifications());
    }
}
