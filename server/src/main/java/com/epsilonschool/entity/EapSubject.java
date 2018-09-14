package com.epsilonschool.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder(toBuilder = true)
public class EapSubject implements Serializable {

    private int id;
    private String userId;
    private String name;
    private int grade;
    private int eap;
}
