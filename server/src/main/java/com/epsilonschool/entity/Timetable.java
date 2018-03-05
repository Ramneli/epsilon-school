package com.epsilonschool.entity;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Timetable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;
    @JsonProperty("user_id")
    private String userId;
    @JsonProperty("subject_id")
    private String subjectId;

    public Timetable(){}

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public void setSubjectId(String subjectId) {
        this.subjectId = subjectId;
    }

    public String getSubjectId() {
        return subjectId;
    }

    public String getUserId() {
        return userId;
    }
}
