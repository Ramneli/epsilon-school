package com.epsilonschool.entity.mapper;

import com.epsilonschool.entity.Notification;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class NotificationRowMapper implements RowMapper<Notification> {
    @Override
    public Notification mapRow(ResultSet rs, int rowNum) throws SQLException {
        return Notification.builder()
                .id(rs.getString("id"))
                .message(rs.getString("message"))
                .deadline(rs.getDate("deadline"))
                .build();
    }
}
