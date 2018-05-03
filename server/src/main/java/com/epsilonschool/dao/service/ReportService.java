package com.epsilonschool.dao.service;

import com.epsilonschool.dao.repository.ReportRepository;
import com.epsilonschool.entity.Report;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReportService {
    private ReportRepository reportRepository;

    public ReportService(ReportRepository reportRepository) {
        this.reportRepository = reportRepository;
    }

    public void addReport(Report report) {
        reportRepository.save(report);
    }

    public List<Report> getReports(String reportee) {
        System.out.println(reportee);
        return this.reportRepository.findAllByReportee(reportee);
    }

    public void clearReportsOfUser(String uid) {
        reportRepository.clearReportsOfUser(uid);
    }
}
