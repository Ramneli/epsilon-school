package com.epsilonschool.entity;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;

@Entity
public class Subject {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @JsonProperty("name")
    private String name;
    @JsonProperty("subject_code")
    private String subjectCode;
    @JsonProperty("lecturer_name")
    private String lecturerName;

    public Subject() {}

    public Subject(String name, String code, String lecturerName) {
        this.name = name;
        this.subjectCode = code;
        this.lecturerName = lecturerName;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setCode(String code) {
        this.subjectCode = code;
    }

    public void setLecturerName(String lecturerName) {
        this.lecturerName = lecturerName;
    }

    public String getName() {
        return name;
    }

    public String getLecturerName() {
        return lecturerName;
    }

    public String getCode() {
        return subjectCode;
    }

    public int getId() {
        return id;
    }
}
