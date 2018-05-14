package com.epsilonschool.dao.service;

import com.epsilonschool.dao.repository.ReportRepository;
import com.epsilonschool.entity.Report;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReportService {
    private ReportRepository reportRepository;

    public ReportService(ReportRepository reportRepository) {
        this.reportRepository = reportRepository;
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
        System.out.println(reportee);
        return this.reportRepository.findAllByReportee(reportee);
    }

    public void clearReportsOfUser(String uid) {
        reportRepository.clearReportsOfUser(uid);
    }
}
