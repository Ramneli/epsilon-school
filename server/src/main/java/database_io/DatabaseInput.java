package database_io;

import org.springframework.jdbc.core.JdbcTemplate;

public class DatabaseInput {
    private JdbcTemplate database;

    public DatabaseInput(JdbcTemplate database) {
        this.database = database;
    }

    public void insertSubject(String name, String subjectCode, String lecturer) {
        String sqlQuery = "INSERT INTO aine(nimi, ainekood, oppejoud) VALUES (?,?,?)";
        database.update(sqlQuery, name, subjectCode, lecturer);
    }

    public void insertTask(int subject_id, String subject_text, String tahtaeg) {
        String sqlQuery = "INSERT INTO ylesanne(aine_id, ylesanne_tekst, tahtaeg) VALUES (?,?,?)";
        database.update(sqlQuery, subject_id, subject_text, tahtaeg);
    }

    public void insertSubjectTable(int user_id, int subject_id){
        String sqlQuery = "INSERT INTO tunniplaan(kasutaja_id, aine_id) VALUES (?,?)";
        database.update(sqlQuery, user_id, subject_id);
    }

    public void insertUser(String name) {
        String sqlQuery = "INSERT INTO kasutaja(nimi) VALUES (?)";
        database.update(sqlQuery, name);
    }
}
