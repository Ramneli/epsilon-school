package database_objects;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class SubjectRowMapper implements RowMapper {

    public Object mapRow(ResultSet rs, int rowNum) throws SQLException {
        Subject subject = new Subject();
        subject.setName(rs.getString("nimi"));
        subject.setCode(rs.getString("ainekood"));
        subject.setLecturer(rs.getString("oppejoud"));
        return subject;
    }
}
