package database_io;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

@Service("insertService")
public class DatabaseInput {
    @Autowired
    private JdbcTemplate database;

    public void insertSubject(String name, String subjectCode, String lecturer) {
        String sqlQuery = "INSERT INTO aine(nimi, ainekood, oppejoud) VALUES (?,?,?)";
        database.update(sqlQuery, name, subjectCode, lecturer);
    }

    public void insertTask(int aine_id, String ylesanne_tekst, String tahtaeg) {
        String sqlQuery = "INSERT INTO ylesanne(aine_id, ylesanne_tekst, tahtaeg) VALUES (?,?,?)";
        database.update(sqlQuery, aine_id, ylesanne_tekst, tahtaeg);
    }

    @Autowired
    public void setDatabase(JdbcTemplate database) {
        this.database = database;
    }
}
