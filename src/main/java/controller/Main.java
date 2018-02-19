package controller;

import Database.DatabaseInput;
import configuration.ApplicationConfiguration;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.support.AbstractApplicationContext;

import java.util.Arrays;

@SpringBootApplication
public class Main {

    public static void main(String[] args) {
        AbstractApplicationContext context = new AnnotationConfigApplicationContext(ApplicationConfiguration.class);
        SpringApplication.run(Main.class, args);
        DatabaseInput input = (DatabaseInput) context.getBean("insertService");
        input.insertSubject("mata", "YMR3730", "Kairi Kasemets");
    }
}
