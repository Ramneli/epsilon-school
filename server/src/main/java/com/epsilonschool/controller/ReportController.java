package com.epsilonschool.controller;

import com.epsilonschool.dao.service.ReportService;
import com.epsilonschool.entity.Report;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ReportController {
    private ReportService reportService;

    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    @PostMapping("/report/add")
    public void addReport(@RequestBody Report report) {
        this.reportService.addReport(report);
    }

    @GetMapping("/report/get")
    public List<Report> getReportCount(@RequestParam("reportee") String reportee) {
        return this.reportService.getReports(reportee);
    }
}
