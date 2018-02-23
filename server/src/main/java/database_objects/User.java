package database_objects;

public class User {
    private int userId;
    private String username;


    public User(String username) {
        this.username = username;
    }

    public int getUserId() {
        return userId;
    }
}
