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
    private int userId;
    @JsonProperty("subject_id")
    private int subjectId;

    public Timetable(){}

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public void setSubjectId(int subjectId) {
        this.subjectId = subjectId;
    }

    public int getSubjectId() {
        return subjectId;
    }

    public int getUserId() {
        return userId;
    }
}
