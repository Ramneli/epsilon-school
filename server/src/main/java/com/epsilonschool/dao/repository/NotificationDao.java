package com.epsilonschool.dao.repository;

import com.epsilonschool.entity.Notification;
import com.epsilonschool.entity.mapper.NotificationRowMapper;
import org.springframework.jdbc.core.support.JdbcDaoSupport;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

@Repository
public class NotificationDao extends JdbcDaoSupport {

    private static final int NOTIFICATION_DEADLINE = 14;
    private static final String tableName = "notifications";

    public void update(String id, String message, Date deadline) {
        String sql = "UPDATE " + tableName + " SET message = ? , deadline = ?" +
                "   WHERE id = ?";

        List<Object> params = new ArrayList<>();
        params.add(id);
        params.add(message);
        params.add(deadline);

        getJdbcTemplate().update(sql, params.toArray());
    }

    public List<Notification> getAllValidNotifications() {
        String sql = "SELECT * FROM " + tableName + " " +
                "   WHERE deadline >  CURRENT_DATE - " + NOTIFICATION_DEADLINE;
        return getJdbcTemplate().query(sql, new NotificationRowMapper());
    }

    public void insert(Notification notification) {
        String sql = "INSERT INTO " + tableName + " (id, message, deadline) " +
                "   VALUES (?, ?, ?)";

        List<Object> params = new ArrayList<>();
        params.add(notification.getId());
        params.add(notification.getMessage());
        params.add(notification.getDeadline());

        getJdbcTemplate().update(sql, params.toArray());
    }
}
