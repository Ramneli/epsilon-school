package database_io;

import custom_rowmappers.TaskRowMapper;
import database_objects.Task;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;
import java.util.Map;

public class DatabaseOutput {

    private JdbcTemplate database;

    public DatabaseOutput(JdbcTemplate database) {
        this.database = database;
    }

    public List<Map<String, Object>> getSubject(String subjectName) {
        //Subject subject =  (Subject) database.queryForObject("SELECT * FROM aine where nimi LIKE '%?%'", new Object[] { subjectName },
                //new SubjectRowMapper());
        return database.queryForList("SELECT * FROM aine where nimi LIKE CONCAT('%',?,'%')", subjectName);
}

    public String[] getTask(int task_id) {
        Task task =  (Task) database.queryForObject("SELECT * FROM ylesanne where ylesanne_id=?",
                new Object[] { task_id }, new TaskRowMapper());
        return new String[]{Integer.toString(task.getTask_id()), Integer.toString(task.getSubject_id()),
                task.getTaskDescription(), task.getTaskDeadline().toString()};
    }

}
