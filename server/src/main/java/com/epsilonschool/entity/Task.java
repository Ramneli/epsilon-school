package com.epsilonschool.entity;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.sql.Date;

@Entity
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String taskId;
    @JsonProperty("subject_id")
    private int subjectId;
    @JsonProperty("task_description")
    private String taskDescription;
    @JsonProperty("task_deadline")
    private Date taskDeadline;

    public Task(){}

    public Task(int subjectId, String taskDescription, Date taskDeadline) {
        this.subjectId = subjectId;
        this.taskDescription = taskDescription;
        this.taskDeadline = taskDeadline;
    }

    public void setSubjectId(int subjectId) {
        this.subjectId = subjectId;
    }

    public void setDeadline(Date taskDeadline) {
        this.taskDeadline = taskDeadline;
    }

    public void setDescription(String taskDescription) {
        this.taskDescription = taskDescription;
    }

    public int getSubjectId() {
        return subjectId;
    }

    public String getTaskId() {
        return taskId;
    }

    public Date getDeadline() {
        return taskDeadline;
    }

    public String getDescription() {
        return taskDescription;
    }
}
