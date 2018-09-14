package com.epsilonschool.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder(toBuilder = true)
public class User {
    private String id;
    private String uid;
    private int admin;
    private int isBlocked;
    private int reportCount;
}
