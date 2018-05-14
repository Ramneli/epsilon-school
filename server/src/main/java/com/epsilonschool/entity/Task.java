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
    @JsonProperty(value = "type")
    private String type;
    @JsonProperty(value = "author")
    private String author;
    @JsonProperty(value = "taskClass")
    private String taskClass;

    public Task(){}

    public Task(String subjectId, String taskDescription, Date taskDeadline, String type) {
        this.subjectId = subjectId;
        this.description = taskDescription;
        this.deadline = taskDeadline;
        this.type = type;
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

    public void setType(String type) {
        this.type = type;
    }

    public String getType() {
        return type;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getTaskClass() {
        return taskClass;
    }

    public void setTaskClass(String taskClass) {
        this.taskClass = taskClass;
    }
}
