package com.epsilonschool.dao.service;

import com.epsilonschool.dao.repository.*;
import com.epsilonschool.entity.Subject;
import com.epsilonschool.entity.Task;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TaskService {
    private TaskRepository taskRepository;
    private SubjectRepository subjectRepository;
    private ReportRepository reportRepository;
    private SettingsRepository settingsRepository;

    public TaskService(TaskRepository taskRepository, SubjectRepository subjectRepository,
                       ReportRepository reportRepository, SettingsRepository settingsRepository) {
        this.taskRepository = taskRepository;
        this.subjectRepository = subjectRepository;
        this.reportRepository = reportRepository;
        this.settingsRepository = settingsRepository;
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

    public JSONObject getSubjectWithAllTasks(String subjectId, String uid) {
        Subject subject = subjectRepository.findOne(subjectId);
        List<Task> tasksOfSubject;

        char limitOldTasks = settingsRepository.findByUid(uid).getOldTasks();

        if (limitOldTasks == '0') {
            tasksOfSubject = this.getAllTasksOfSubject(subjectId).stream()
                    .filter(t -> t.getDeadline().after(Date.valueOf(LocalDate.now())))
                    .collect(Collectors.toList());
        } else {
            tasksOfSubject = this.getAllTasksOfSubject(subjectId);
        }

        tasksOfSubject = filterReportedTasks(tasksOfSubject);

        JSONObject subjectWithTasks = new JSONObject();
        addSubjectDetails(subject, subjectWithTasks);

        JSONArray tasks = new JSONArray();
        addTasksForSubject(tasksOfSubject, tasks);

        subjectWithTasks.put("tasks", tasks);
        return subjectWithTasks;
    }

    private List<Task> filterReportedTasks(List<Task> tasksOfSubject) {
        List<Task> tempTasks = new ArrayList<>();
        for (Task task : tasksOfSubject) {
            if (reportRepository.countReportsForTask(task.getTaskId()) < 3) {
                tempTasks.add(task);
            }
        }
        return tempTasks;
    }

    private void addTasksForSubject(List<Task> tasksOfSubject, JSONArray tasks) {

        JSONArray harjutus = new JSONArray();
        JSONArray loeng = new JSONArray();
        JSONArray praktikum = new JSONArray();
        JSONArray loengHarjutus = new JSONArray();
        JSONArray harjutusPraktikum = new JSONArray();
        JSONArray loengHarjutusPraktikum = new JSONArray();

        for (Task task : tasksOfSubject) {
            JSONObject currentTask = new JSONObject();
            currentTask.put("task_id", task.getTaskId());
            currentTask.put("task_description", task.getDescription());
            currentTask.put("task_deadline", task.getDeadline());
            currentTask.put("task_type", task.getType());
            currentTask.put("task_author", task.getAuthor());

            switch (task.getTaskClass().toLowerCase()) {
                case "harjutus":
                    harjutus.put(currentTask);
                    break;
                case "loeng":
                    loeng.put(currentTask);
                    break;
                case "praktikum":
                    praktikum.put(currentTask);
                    break;
                case "loeng + harjutus":
                    loengHarjutus.put(currentTask);
                    break;
                case "harjutus + praktikum":
                    harjutusPraktikum.put(currentTask);
                    break;
                case "loeng + harjutus + praktikum":
                    loengHarjutusPraktikum.put(currentTask);
                    break;
                default:
                    harjutus.put(currentTask);
                    break;
            }
        }

        JSONObject tasksByClass = new JSONObject();

        tasksByClass.put("Harjutus",harjutus);
        tasksByClass.put("Loeng", loeng);
        tasksByClass.put("Praktikum", praktikum);
        tasksByClass.put("LoengHarjutus", loengHarjutus);
        tasksByClass.put("HarjutusPraktikum", harjutusPraktikum);
        tasksByClass.put("LoengHarjutusPraktikum", loengHarjutusPraktikum);

        tasks.put(tasksByClass);
    }

    private void addSubjectDetails(Subject subject, JSONObject subjectWithTasks) {
        subjectWithTasks.put("subject_name", subject.getName());
        subjectWithTasks.put("lecturer_name", subject.getLecturerName());
        subjectWithTasks.put("subject_code", subject.getCode());
        subjectWithTasks.put("subject_id", subject.getId());
    }

    public boolean updateTask(Task task) {
        taskRepository.updateTask(task.getDescription(), task.getTaskId(), task.getAuthor(), task.getDeadline());
        return true;
    }

    public boolean deleteTask(Task task) {
        taskRepository.deleteTask(task.getTaskId(), task.getAuthor());
        return true;
    }
}
