package com.epsilonschool.entity;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@JsonAutoDetect(getterVisibility = JsonAutoDetect.Visibility.NONE)
public class Settings {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty("id")
    private String id;
    @JsonProperty("uid")
    private String uid;
    @JsonProperty("oldTasks")
    private char oldTasks;

    public Settings() {
    }

    public Settings (String uid, char oldTasks) {
        this.uid = uid;
        this.oldTasks = oldTasks;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUid() {
        return uid;
    }

    public void setUid(String uid) {
        this.uid = uid;
    }

    public char getOldTasks() {
        return oldTasks;
    }

    public void setOldTasks(char oldTasks) {
        this.oldTasks = oldTasks;
    }
}
