package com.epsilonschool.entity;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;

@Entity
public class Timetable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;
    @JsonProperty(value = "uid")
    private String uid;
    @JsonProperty("subject_id")
    private String subjectId;

    @Transient
    @JsonProperty("username")
    private String username;

    public Timetable(){}

    public void setUid(String uid) {
        this.uid = uid;
    }

    public void setSubjectId(String subjectId) {
        this.subjectId = subjectId;
    }

    public String getSubjectId() {
        return subjectId;
    }

    public String getUid() {
        return uid;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
