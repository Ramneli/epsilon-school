package com.epsilonschool.dao.service;

import com.epsilonschool.dao.repository.SubjectRepository;
import com.epsilonschool.dao.repository.TaskRepository;
import com.epsilonschool.entity.Subject;
import com.epsilonschool.entity.Task;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TaskService {
    private TaskRepository taskRepository;
    private SubjectRepository subjectRepository;

    public TaskService(TaskRepository taskRepository, SubjectRepository subjectRepository) {
        this.taskRepository = taskRepository;
        this.subjectRepository = subjectRepository;
    }

    public List<Task> getTask(String subjectId) {
        return getAllTasksOfSubject(subjectId);
    }

    private List<Task> getAllTasksOfSubject(String subjectId) {
        return taskRepository.findAll().stream()
                .filter(task -> task.getSubjectId().equals(subjectId)).collect(Collectors.toList());
    }

    public boolean addTask(Task task) {
        try {
            taskRepository.save(task);
        } catch (Exception e) {
            return false;
        }
        return true;
    }

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public JSONObject getSubjectWithAllTasks(String subjectId, boolean limitOldTasks) {
        Subject subject = subjectRepository.findOne(subjectId);
        List<Task> tasksOfSubject;

        if (limitOldTasks) {
            tasksOfSubject = this.getAllTasksOfSubject(subjectId).stream()
                    .filter(t -> t.getDeadline().after(Date.valueOf(LocalDate.now())))
                    .collect(Collectors.toList());
        } else {
            tasksOfSubject = this.getAllTasksOfSubject(subjectId);
        }

        JSONObject subjectWithTasks = new JSONObject();
        addSubjectDetails(subject, subjectWithTasks);

        JSONArray tasks = new JSONArray();
        addTasksForSubject(tasksOfSubject, tasks);

        subjectWithTasks.put("tasks", tasks);
        return subjectWithTasks;
    }

    private void addTasksForSubject(List<Task> tasksOfSubject, JSONArray tasks) {
        for (Task task : tasksOfSubject) {
            JSONObject currentTask = new JSONObject();
            currentTask.put("task_description", task.getDescription());
            currentTask.put("task_deadline", task.getDeadline());
            currentTask.put("task_type", task.getType());
            tasks.put(currentTask);
        }
    }

    private void addSubjectDetails(Subject subject, JSONObject subjectWithTasks) {
        subjectWithTasks.put("subject_name", subject.getName());
        subjectWithTasks.put("lecturer_name", subject.getLecturerName());
        subjectWithTasks.put("subject_code", subject.getCode());
        subjectWithTasks.put("subject_id", subject.getId());
        subjectWithTasks.put("subject_type", subject.getType());
    }

    public boolean updateTask(Task task) {
        taskRepository.updateTask(task.getDescription(), task.getTaskId(), task.getAuthor());
        return true;
    }
}
