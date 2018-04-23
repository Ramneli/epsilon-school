package com.epsilonschool.dao.service;

import com.epsilonschool.dao.repository.SettingsRepository;
import com.epsilonschool.entity.Settings;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

@Service
public class SettingsService {

    private SettingsRepository settingsRepository;

    public SettingsService(SettingsRepository settingsRepository) {
        this.settingsRepository = settingsRepository;
    }

    public void updateUserSettings(Settings settings) {
        settingsRepository.updateSettings(settings.getUid(), settings.getOldTasks());
    }

    public Settings loadUserSettings(String uid) {
        return settingsRepository.findByUid(uid);
    }

    public void saveUserSettings(Settings settings) {
        try {
            this.settingsRepository.save(settings);
        } catch (DataIntegrityViolationException e) {
            System.out.println(e.getMessage());
        }
    }
}
