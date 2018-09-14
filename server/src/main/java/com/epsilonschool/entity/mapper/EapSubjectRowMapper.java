package com.epsilonschool.entity.mapper;

import com.epsilonschool.entity.EapSubject;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class EapSubjectRowMapper implements RowMapper<EapSubject> {
    @Override
    public EapSubject mapRow(ResultSet rs, int rowNum) throws SQLException {
        return EapSubject.builder()
                .id(rs.getInt("id"))
                .eap(rs.getInt("eap"))
                .userId(rs.getString("user_id"))
                .grade(rs.getInt("grade"))
                .name(rs.getString("name"))
                .build();
    }
}
