package parsing_strategies;

import database_objects.Subject;
import database_objects.Task;
import org.json.JSONArray;
import org.json.JSONObject;

import java.util.List;
import java.util.Map;

public class JsonStrategy {
    public Task convertTask(String json_task) {
        JSONObject task = new JSONObject(json_task);
        return new Task(
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
    public String convertSubject(List<Map<String, Object>> data) {
        JSONArray jsonArray = new JSONArray();
        for (Map<String, Object> row : data) {
            JSONObject oneRow = new JSONObject();
            for (Map.Entry<String, Object> entry : row.entrySet()) {
                switch (entry.getKey()) {
                    case "id":
                        oneRow.put("id", entry.getValue());
                        break;
                    case "nimi":
                        oneRow.put("nimi", entry.getValue());
                        break;
                    case "ainekood":
                        oneRow.put("ainekood", entry.getValue());
                        break;
                    case "oppejoud":
                        oneRow.put("oppejoud", entry.getValue());
                        break;
                }
            }
            jsonArray.put(oneRow);
        }
        return jsonArray.toString();
    }
    public String convertTask(List<Map<String, Object>> data) {
        JSONArray jsonArray = new JSONArray();
        for (Map<String, Object> row : data) {
            JSONObject oneRow = new JSONObject();
            for (Map.Entry<String, Object> entry : row.entrySet()) {
                switch (entry.getKey()) {
                    case "ylesanne_id":
                        oneRow.put("ylesanne_id", entry.getValue());
                        break;
                    case "aine_id":
                        oneRow.put("aine_id", entry.getValue());
                        break;
                    case "ylesanne_tekst":
                        oneRow.put("ylesanne_tekst", entry.getValue());
                        break;
                    case "tahtaeg":
                        oneRow.put("tahtaeg", entry.getValue());
                        break;
                }
            }
            jsonArray.put(oneRow);
        }
        return jsonArray.toString();
    }
    public static class TimeTable {
        public static String getUsername(String data) {
            return new JSONObject(data).getString("username");
        }
        public static int getSubjectId(String data) {
            return new JSONObject(data).getInt("id");
        }
    }
}
