package database_io;

import database_objects.SubjectRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.SingleColumnRowMapper;
import database_objects.Subject;
import java.util.List;
import java.util.Map;

public class DatabaseOutput {

    private JdbcTemplate database;

    public DatabaseOutput(JdbcTemplate database) {
        this.database = database;
    }

    public String[] getSubject(int id) {
        Subject subject =  (Subject) database.queryForObject("SELECT * FROM aine where id=?", new Object[] { id }, new SubjectRowMapper());

        return new String[]{subject.getName(), subject.getCode(), subject.getLecturer()};
}

    public void getTask(int aine_id, String ylesanne_tekst, String tahtaeg) {
        String sqlQuery = "INSERT INTO ylesanne(aine_id, ylesanne_tekst, tahtaeg) VALUES (?,?,?)";
        database.update(sqlQuery, aine_id, ylesanne_tekst, tahtaeg);
    }
}
