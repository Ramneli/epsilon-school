package com.epsilonschool.dao.repository;

import com.epsilonschool.entity.EapSubject;
import com.epsilonschool.entity.User;
import com.epsilonschool.entity.mapper.EapSubjectRowMapper;
import org.apache.tomcat.jdbc.pool.DataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.support.JdbcDaoSupport;
import org.springframework.stereotype.Repository;

import java.util.Arrays;
import java.util.List;

@Repository
public class EapDao extends JdbcDaoSupport {

    @Autowired
    public DataSource dataSource;

    public void insert(EapSubject eapSubject) {
        String sql = "INSERT INTO eap_subject (id, grade, name, user_id, eap) " +
                "   VALUES (?, ?, ?, ?, ?)";

        List<Object> params = Arrays.asList(
                eapSubject.getId(), eapSubject.getGrade(),
                eapSubject.getName(), eapSubject.getUserId(), eapSubject.getEap());

        getJdbcTemplate().update(sql, params.toArray());
    }

    public List<EapSubject> findAllByUserId(String userId) {
        String sql = "SELECT * FROM eap_subject WHERE user_id = ?";
        return getJdbcTemplate().query(sql, new EapSubjectRowMapper(), userId);
    }

    public int getCountSubjectsForUser(String userId) {
        User.builder().id("1").build();
        String sql = "SELECT Count(*) AS subjects_count " +
                "   FROM eap_calc_subjects WHERE user_id = ?";
        return getJdbcTemplate().queryForObject(sql, Integer.class, userId);
    }

    public int delete(String id) {
        String sql = "DELETE FROM eap_subject WHERE id = ?";
        return getJdbcTemplate().update(sql, id);
    }
}
