package parsing_strategies;

import database_objects.Subject;
import database_objects.Task;
import org.json.JSONObject;

public class JsonStrategy {
    public Task convertTask(String json_task) {
        JSONObject task = new JSONObject(json_task);
        return new Task(
                task.getInt("ylesanne_id"),
                task.getInt("aine_id"),
                task.getString("ylesanne_tekst"),
                java.sql.Date.valueOf(task.getString("tahtaeg")));
    }
    public Subject convertSubject(String json_subject) {
        JSONObject subject = new JSONObject(json_subject);
        return new Subject(
                subject.getString("nimi"),
                subject.getString("ainekood"),
                subject.getString("oppejoud")
        );
    }
}
