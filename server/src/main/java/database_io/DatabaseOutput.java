package database_io;

import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;
import java.util.Map;

public class DatabaseOutput {

    private JdbcTemplate database;

    public DatabaseOutput(JdbcTemplate database) {
        this.database = database;
    }

    public List<Map<String, Object>> getSubject(String subjectName) {
        return database.queryForList("SELECT * FROM aine where nimi LIKE CONCAT('%',?,'%')", subjectName);
}

    public List<Map<String, Object>> getTask(int task_id) {
        return database.queryForList("SELECT * FROM ylesanne where aine_id=?", task_id);
    }
}
