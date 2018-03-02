package com.epsilonschool.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.PropertySource;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan(basePackages = {"com.epsilonschool.controller", "com.epsilonschool.dao",
        "com.epsilonschool.dao.service", "com.epsilonschool.dao.repository"})
@PropertySource(value = {"classpath:application.properties"})
@EntityScan(basePackages =  {"com.epsilonschool.entity"})
@EnableJpaRepositories("com.epsilonschool.dao.repository")
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}