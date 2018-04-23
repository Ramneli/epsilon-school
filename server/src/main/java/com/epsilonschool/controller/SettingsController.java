package com.epsilonschool.controller;

import com.epsilonschool.dao.service.SettingsService;
import com.epsilonschool.entity.Settings;
import org.springframework.web.bind.annotation.*;

@RestController
public class SettingsController {

    private SettingsService settingsService;

    public SettingsController(SettingsService settingsService) {
        this.settingsService = settingsService;
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @RequestMapping(value = "/settings/save", method = RequestMethod.POST)
    public void saveSettings(@RequestBody Settings settings) {
        this.settingsService.updateUserSettings(settings);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @RequestMapping(value = "/settings/load", method = RequestMethod.POST)
    public Settings loadSettings(@RequestParam("uid") String uid) {
        return this.settingsService.loadUserSettings(uid);
    }
}
