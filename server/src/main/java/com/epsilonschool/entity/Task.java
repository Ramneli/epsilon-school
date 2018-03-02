package com.epsilonschool.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.sql.Date;

@Entity
public class Task {
    @Id
    private int taskId;
    private int subjectId;
    private String taskDescription;
    private Date taskDeadline;

    public Task(int subjectId, String taskDescription, Date taskDeadline) {
        this.taskId = taskId;
        this.subjectId = subjectId;
        this.taskDescription = taskDescription;
        this.taskDeadline = taskDeadline;
    }

    public void setSubjectId(int subjectId) {
        this.subjectId = subjectId;
    }

    public void setTaskId(int taskId) {
        this.taskId = taskId;
    }

    public void setTaskDeadline(Date taskDeadline) {
        this.taskDeadline = taskDeadline;
    }

    public void setTaskDescription(String taskDescription) {
        this.taskDescription = taskDescription;
    }

    public int getSubjectId() {
        return subjectId;
    }

    public int getTaskId() {
        return taskId;
    }

    public Date getTaskDeadline() {
        return taskDeadline;
    }

    public String getTaskDescription() {
        return taskDescription;
    }
}
