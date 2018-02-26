package database_objects;

public class User {
    private int userId;
    private String username;

    public User() {}

    public void setUsername(String username) {
        this.username = username;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public int getUserId() {
        return userId;
    }
}
