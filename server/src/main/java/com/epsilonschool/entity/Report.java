package com.epsilonschool.entity;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;

@Entity
@JsonAutoDetect(getterVisibility = JsonAutoDetect.Visibility.NONE)
@Table(name = "reports")
public class Report {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty("id")
    private int id;
    @JsonProperty("reportee")
    private String reportee;
    @JsonProperty("reporter")
    private String reporter;
    @JsonProperty("description")
    private String description;
    @JsonProperty("task_id")
    private int taskId;

    public Report() {

    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getReportee() {
        return reportee;
    }

    public void setReportee(String reportee) {
        this.reportee = reportee;
    }

    public String getReporter() {
        return reporter;
    }

    public void setReporter(String reporter) {
        this.reporter = reporter;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getTaskId() {
        return taskId;
    }

    public void setTaskId(int taskId) {
        this.taskId = taskId;
    }
}
