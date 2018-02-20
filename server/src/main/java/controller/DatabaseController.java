package controller;

import database_io.DatabaseInput;
import database_io.DatabaseOutput;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;

@Controller("databaseController")
public class DatabaseController {

    @Autowired
    private JdbcTemplate database;
    private DatabaseInput databaseInput;
    private DatabaseOutput databaseoutput;

    public DatabaseController() {
    }


    public void setDatabases() {
        databaseInput = new DatabaseInput(database);
        databaseoutput = new DatabaseOutput(database);
        //databaseOutput = new DatabaseOutput(database);
    }

    public void insertSubject(String name, String subjectCode, String lecturer) {
        databaseInput.insertSubject(name, subjectCode, lecturer);
    }

    public String[] getSubject(int id) {
        return databaseoutput.getSubject(id);
    }
}
