package controller;

import com.fasterxml.jackson.databind.util.JSONPObject;
import database_io.DatabaseInput;
import database_io.DatabaseOutput;
import database_objects.Subject;
import database_objects.Task;
import database_objects.User;
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
    @Autowired
    private JsonStrategy strategy;

    public DatabaseController() {
    }


    public void setDatabases() {
        databaseInput = new DatabaseInput(database);
        databaseOutput = new DatabaseOutput(database);
    }

    public void insertSubject(Subject subjectData) {
        databaseInput.insertSubject(subjectData.getName(), subjectData.getCode(), subjectData.getLecturer());
    }
    public void insertTask(Task taskData) {
        databaseInput.insertTask(taskData.getSubject_id(), taskData.getTaskDescription(), taskData.getTaskDeadline());
    }
    public void insertSubjectToTimeTable(User user, Subject subject){
        databaseInput.insertSubjectToTimeTable(user.getUserId(), subject.getSubjectId());
    }

    @RequestMapping(value = "/subject/add", method = RequestMethod.POST)
    public String addSubject(@RequestBody String subjectData) {
        Subject subject  = strategy.convertSubject(subjectData);
        this.insertSubject(subject);
        return subjectData;
    }

    @RequestMapping(value = "/task/add", method = RequestMethod.POST)
    public String addTask(@RequestBody String taskData) {
        Task task = strategy.convertTask(taskData);
        this.insertTask(task);
        return taskData;
    }

    @RequestMapping(value = "/timetable/addTo", method = RequestMethod.POST)
    public String addToTimetable(@RequestBody String timetableData) {
        //TODO: Implement timetable creation.
        //System.out.println(Arrays.toString(new JsonStrategy().convertTimetable(timetableData)));
        return timetableData;
    }

    @RequestMapping(value = "/user/add", method = RequestMethod.POST)
    public String addUser(@RequestBody String userData) {
        //TODO: Implement user adding.
        //System.out.println(Arrays.toString(new JsonStrategy().convertUser(userData)));
        return userData;
    }

    @RequestMapping(value = "/notification/add", method = RequestMethod.POST)
    public String addNotification(@RequestBody String notificaitonData) {
        //TODO: Implement notification adding and creation.
        //System.out.println(Arrays.toString(new JsonStrategy().convertNotification(notificaitonData)));
        return notificaitonData;
    }

    public String[] getSubject(int id) {
        return databaseOutput.getSubject(id);
    }
    public String[] getTask(int task_id) { return databaseOutput.getTask(task_id); }
}
