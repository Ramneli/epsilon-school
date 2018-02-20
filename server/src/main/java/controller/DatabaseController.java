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
    private DatabaseOutput databaseOutput;

    public DatabaseController() {
    }


    public void setDatabases() {
        databaseInput = new DatabaseInput(database);
        databaseOutput = new DatabaseOutput(database);
    }

    public void insertSubject(String name, String subjectCode, String lecturer) {
        databaseInput.insertSubject(name, subjectCode, lecturer);
    }
    public void insertTask(int subject_id, String subject_text, String tahtaeg) {
        databaseInput.insertTask(subject_id, subject_text, tahtaeg);
    }
    public void insertSubjectToTimeTable(int user_id, int subject_id){
        databaseInput.insertSubjectToTimeTable(user_id, subject_id);
    }

    public String[] getSubject(int id) {
        return databaseOutput.getSubject(id);
    }
    public String[] getTask(int task_id) { return databaseOutput.getTask(task_id); }
}
