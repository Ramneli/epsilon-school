package custom_rowmappers;

import database_objects.Task;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class TaskRowMapper implements RowMapper {
    public Object mapRow(ResultSet rs, int rowNum) throws SQLException {
            Task task = new Task();
            task.setSubject_id(rs.getInt("ylesanne_id"));
            task.setTask_id(rs.getInt("aine_id"));
            task.setTaskDescription(rs.getString("ylesanne_tekst"));
            task.setTaskDeadline(rs.getDate("tahtaeg"));
            return task;
        }
    }

