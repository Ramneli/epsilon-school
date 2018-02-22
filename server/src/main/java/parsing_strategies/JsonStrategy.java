package parsing_strategies;

import org.json.JSONObject;

public class JsonStrategy {
    public String[] convertTask(String json) {
        JSONObject task = new JSONObject(json);
        return new String[]{task.getString("nimi"), task.getString("ainekood"), task.getString("oppejoud")};
    }
}
