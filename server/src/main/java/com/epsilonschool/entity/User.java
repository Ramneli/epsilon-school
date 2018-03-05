package com.epsilonschool.entity;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;
    private String name;

    public User() {}

    public User(String name) {
        this.name = name;
    }

    public void setUsername(String name) {
        this.name = name;
    }

    public String getUsername() {
        return name;
    }

    public String getId() {
        return id;
    }
}
