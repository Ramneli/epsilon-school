package controller;

import database_io.DatabaseInput;
import database_io.DatabaseOutput;
import database_objects.Subject;
import database_objects.Task;
import database_objects.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;
import parsing_strategies.JsonStrategy;

@RestController("databaseController")
public class DatabaseController {

    @Autowired
    private JdbcTemplate database;
    @Autowired
    private DatabaseInput databaseInput;
    @Autowired
    private DatabaseOutput databaseOutput;
    private JsonStrategy strategy = new JsonStrategy();

    public DatabaseController() {
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

    @CrossOrigin(origins = "http://localhost:9000")
    @RequestMapping(value = "/subject/add", method = RequestMethod.POST)
    public String addSubject(@RequestBody String subjectData) {
        Subject subject  = strategy.convertSubject(subjectData);
        this.insertSubject(subject);
        return subjectData;
    }

    @CrossOrigin(origins = "http://localhost:9000")
    @RequestMapping(value = "/task/add", method = RequestMethod.POST)
    public String addTask(@RequestBody String taskData) {
        Task task = strategy.convertTask(taskData);
        this.insertTask(task);
        return taskData;
    }

    @CrossOrigin(origins = "http://localhost:9000")
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

    @CrossOrigin(origins = "http://localhost:9000")
    @RequestMapping(value = "/notification/add", method = RequestMethod.POST)
    public String addNotification(@RequestBody String notificaitonData) {
        //TODO: Implement notification adding and creation.
        //System.out.println(Arrays.toString(new JsonStrategy().convertNotification(notificaitonData)));
        return notificaitonData;
    }

    @CrossOrigin(origins = "http://localhost:9000")
    @RequestMapping(value = "/subject/get/{subjectName}", method = RequestMethod.POST)
    public String getSubject(@PathVariable String subjectName) {
        return strategy.convertSubject(databaseOutput.getSubject(subjectName));
    }



    @Bean
    public DatabaseInput databaseInput() {
        return new DatabaseInput(database);
    }

    @Bean
    public DatabaseOutput databaseOutput() {
        return new DatabaseOutput(database);
    }
}
