package custom_rowmappers;

import database_objects.Task;
import database_objects.User;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class UserRowMapper implements RowMapper {
    public Object mapRow(ResultSet rs, int rowNum) throws SQLException {
        User user = new User();
        user.setUserId(rs.getInt("kasutaja_id"));
        user.setUsername(rs.getString("nimi"));
        return user;
    }
}
