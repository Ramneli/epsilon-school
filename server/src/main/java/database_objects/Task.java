package database_objects;

import java.sql.Date;

public class Task {
    private int task_id;
    private int subject_id;
    private String taskDescription;
    private Date taskDeadline;


    public void setSubject_id(int subject_id) {
        this.subject_id = subject_id;
    }

    public void setTask_id(int task_id) {
        this.task_id = task_id;
    }

    public void setTaskDeadline(Date taskDeadline) {
        this.taskDeadline = taskDeadline;
    }

    public void setTaskDescription(String taskDescription) {
        this.taskDescription = taskDescription;
    }

    public int getSubject_id() {
        return subject_id;
    }

    public int getTask_id() {
        return task_id;
    }

    public Date getTaskDeadline() {
        return taskDeadline;
    }

    public String getTaskDescription() {
        return taskDescription;
    }
}
