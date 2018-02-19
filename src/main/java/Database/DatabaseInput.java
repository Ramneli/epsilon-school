package Database;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

@Service("insertService")
public class DatabaseInput {
    @Autowired
    private JdbcTemplate database;

    public void insertSubject(String name, String subjectCode, String lecturer) {
        String sqlQuery = "INSERT INTO aine(nimi, ainekood, oppejoud) VALUES (?,?,?)";
        database.update(sqlQuery,name, subjectCode, lecturer);
    }

    @Autowired
    public void setDatabase(JdbcTemplate database) {
        this.database = database;
    }
}
