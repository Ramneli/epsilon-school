package com.epsilonschool.dao.repository;

import com.epsilonschool.entity.Settings;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface SettingsRepository extends CrudRepository<Settings, String> {

    @Modifying
    @Transactional
    @Query(value = "UPDATE TABLE settings SET old_tasks=?2 WHERE uid=?1", nativeQuery = true)
    void updateSettings(String uid, char oldTasks);

    Settings findByUid(String uid);
}
