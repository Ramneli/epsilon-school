package com.epsilonschool.dao.service;

import com.epsilonschool.dao.repository.ReportRepository;
import com.epsilonschool.dao.repository.TaskRepository;
import com.epsilonschool.dao.repository.UserRepository;
import com.epsilonschool.entity.Report;
import com.epsilonschool.entity.Task;
import com.epsilonschool.entity.User;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReportService {
    private ReportRepository reportRepository;
    private TaskRepository taskRepository;
    private UserRepository userRepository;

    public ReportService(ReportRepository reportRepository, TaskRepository taskRepository, UserRepository userRepository) {
        this.reportRepository = reportRepository;
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
    }

    public ResponseEntity addReport(Report report) {
        try {
            reportRepository.save(report);
            userRepository.increaseReportCount(report.getReportee());
            return ResponseEntity.ok("Report accepted.");
        } catch (DataIntegrityViolationException e) {
            System.out.println("Cannot save report: " + e.getMessage());
            return ResponseEntity.badRequest().body("The user has already reported this task.");
        }
    }

    public List<Report> getReports(String reportee) {
        return this.reportRepository.findAllByReportee(reportee);
    }

    public void clearReportsOfUser(String uid) {
        reportRepository.clearReportsOfUser(uid);
    }

    public List<Task> getReportedTasks(String reportee) {
        return this.taskRepository.findAllReportedTasks(reportee);
    }

    public List<Report> getAll() {
        return this.reportRepository.findAll();
    }
}
