package com.epsilonschool.controller;

import com.epsilonschool.dao.service.ReportService;
import com.epsilonschool.dao.service.SettingsService;
import com.epsilonschool.dao.service.UserService;
import com.epsilonschool.entity.Settings;
import com.epsilonschool.entity.User;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {
    private UserService userService;
    private SettingsService settingsService;
    private ReportService reportService;

    public UserController(UserService userService, SettingsService settingsService, ReportService reportService) {
        this.userService = userService;
        this.settingsService = settingsService;
        this.reportService = reportService;
    }

    @GetMapping("/adduser")
    public boolean addUser(@RequestParam("uid") String uid) {
        userService.addUser(new User(uid));
        settingsService.saveUserSettings(new Settings(uid, '0'));
        return true;
    }

    @GetMapping("/status")
    private int getAdminStatus(@RequestParam("uid") String uid) {
        return this.userService.getUserByUid(uid).getAdmin();
    }

    @GetMapping("/access")
    private int getAccessStatus(@RequestParam("uid") String uid) {
        return this.userService.getUserByUid(uid).getIsBlocked();
    }

    @GetMapping("/checkuser")
    public boolean checkUser(@RequestParam("uid") String uid) {
        Optional<User> user = Optional.ofNullable(userService.getUserByUid(uid));
        return user.isPresent() || addUser(uid);
    }

    @PostMapping("/allReported")
    public List<User> getAllReportedUsers() {
        return this.userService.getAllReportedUsers();
    }

    @GetMapping("/changeblock")
    public void blockUser(@RequestParam("uid") String uid) {
        User user = userService.getUserByUid(uid);
        if (user.getIsBlocked() == 1) {
            userService.unblockUser(uid);
        } else {
            userService.blockUser(uid);
        }
    }

    @PostMapping("/getgrade")
    private double getUserAverageGrade(@RequestParam("uid") String uid) {
        return userService.getUserAverageGrade(uid);
    }

    @GetMapping("/resolveReport")
    public void resolveReportsOfUser(@RequestParam("uid") String uid) {
        userService.resolveReports(uid);
        reportService.clearReportsOfUser(uid);
        User user = userService.getUserByUid(uid);
        if (user.getIsBlocked() == 1) {
            userService.unblockUser(uid);
        }
    }
}
