package database_objects;

public class Subject {
    private int subject_id;
    private String name;
    private String code;
    private String lecturer;

    public Subject() {}

    public Subject(String name, String code, String lecturer) {
        this.name = name;
        this.code = code;
        this.lecturer = lecturer;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public void setLecturer(String lecturer) {
        this.lecturer = lecturer;
    }

    public String getName() {
        return name;
    }

    public String getLecturer() {
        return lecturer;
    }

    public String getCode() {
        return code;
    }

    public int getSubjectId() {
        return subject_id;
    }
}
