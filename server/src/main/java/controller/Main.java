package controller;

import configuration.ApplicationConfiguration;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.support.AbstractApplicationContext;

@SpringBootApplication
public class Main {
    public static void main(String[] args) {
        SpringApplication.run(Main.class, args);
        AbstractApplicationContext context = new AnnotationConfigApplicationContext(ApplicationConfiguration.class);
        //DatabaseInput input = (DatabaseInput) context.getBean("databaseController");
        DatabaseController controller = (DatabaseController) context.getBean("databaseController");
        //input.insertSubject("mata", "YMR3730", "Kairi Kasemets");
        //input.insertTask(5, "Kodune töö.", "2018.02.26");
        //controller.setDatabases();
        //System.out.println(Arrays.toString(controller.getTask(1)));
    }
}
