package com.epsilonschool.entity;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.sql.Date;

@Entity
@JsonAutoDetect(getterVisibility = JsonAutoDetect.Visibility.NONE)
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty(value = "id")
    private String id;
    @JsonProperty(value = "subject_id")
    private String subjectId;
    @JsonProperty(value = "description")
    private String description;
    @JsonProperty(value = "deadline")
    private Date deadline;

    public Task(){}

    public Task(String subjectId, String taskDescription, Date taskDeadline) {
        this.subjectId = subjectId;
        this.description = taskDescription;
        this.deadline = taskDeadline;
    }

    public void setSubjectId(String subjectId) {
        this.subjectId = subjectId;
    }

    public void setDeadline(Date taskDeadline) {
        this.deadline = taskDeadline;
    }

    public void setDescription(String taskDescription) {
        this.description = taskDescription;
    }

    public String getSubjectId() {
        return subjectId;
    }

    public String getTaskId() {
        return id;
    }

    public Date getDeadline() {
        return deadline;
    }

    public String getDescription() {
        return description;
    }
}
