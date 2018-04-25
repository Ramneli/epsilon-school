package com.epsilonschool.controller;

import com.epsilonschool.dao.service.SettingsService;
import com.epsilonschool.entity.Settings;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/settings")
public class SettingsController {

    private SettingsService settingsService;

    public SettingsController(SettingsService settingsService) {
        this.settingsService = settingsService;
    }

    @PostMapping("/save")
    public void saveSettings(@RequestBody Settings settings) {
        this.settingsService.saveUserSettings(settings);
    }

    @PostMapping("/update")
    public void updateSettings(@RequestBody Settings settings) {
        System.out.println("Updating settings...");
        this.settingsService.updateUserSettings(settings);
    }

    @PostMapping("/load")
    public Settings loadSettings(@RequestParam("uid") String uid) {
        System.out.println("Loading...");
        return this.settingsService.loadUserSettings(uid);
    }
}
