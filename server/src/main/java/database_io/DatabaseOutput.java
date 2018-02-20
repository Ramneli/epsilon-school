package database_io;

import custom_rowmappers.SubjectRowMapper;
import custom_rowmappers.TaskRowMapper;
import database_objects.Task;
import org.springframework.jdbc.core.JdbcTemplate;
import database_objects.Subject;

public class DatabaseOutput {

    private JdbcTemplate database;

    public DatabaseOutput(JdbcTemplate database) {
        this.database = database;
    }

    public String[] getSubject(int id) {
        Subject subject =  (Subject) database.queryForObject("SELECT * FROM aine where id=?", new Object[] { id },
                new SubjectRowMapper());
        return new String[]{subject.getName(), subject.getCode(), subject.getLecturer()};
}

    public String[] getTask(int task_id) {
        Task task =  (Task) database.queryForObject("SELECT * FROM ylesanne where ylesanne_id=?",
                new Object[] { task_id }, new TaskRowMapper());
        return new String[]{Integer.toString(task.getTask_ID()), Integer.toString(task.getSubject_ID()),
                task.getTaskDescription(), task.getTaskDeadline().toString()};
    }

}
