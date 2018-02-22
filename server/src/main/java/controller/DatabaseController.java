package controller;

import com.fasterxml.jackson.databind.util.JSONPObject;
import database_io.DatabaseInput;
import database_io.DatabaseOutput;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import parsing_strategies.JsonStrategy;

import java.util.Arrays;

@RestController("databaseController")
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

    @RequestMapping(value = "/user/add", method = RequestMethod.POST)
    public String test(@RequestBody String payload) {
        System.out.println(Arrays.toString(new JsonStrategy().convertTask(payload)));
        return payload;
    }

    public String[] getSubject(int id) {
        return databaseOutput.getSubject(id);
    }
    public String[] getTask(int task_id) { return databaseOutput.getTask(task_id); }
}
