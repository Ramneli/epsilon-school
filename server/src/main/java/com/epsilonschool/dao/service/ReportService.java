package com.epsilonschool.dao.service;

import com.epsilonschool.dao.repository.ReportRepository;
import com.epsilonschool.dao.repository.TaskRepository;
import com.epsilonschool.entity.Report;
import com.epsilonschool.entity.Task;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReportService {
    private ReportRepository reportRepository;
    private TaskRepository taskRepository;

    public ReportService(ReportRepository reportRepository, TaskRepository taskRepository) {
        this.reportRepository = reportRepository;
        this.taskRepository = taskRepository;
    }

    public ResponseEntity addReport(Report report) {
        try {
            reportRepository.save(report);
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
}
