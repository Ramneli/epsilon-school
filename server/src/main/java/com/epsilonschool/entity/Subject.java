package com.epsilonschool.entity;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Subject {
    @Id
    private String id;
    private String name;
    private String subjectCode;
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

    public String getId() {
        return id;
    }
}
