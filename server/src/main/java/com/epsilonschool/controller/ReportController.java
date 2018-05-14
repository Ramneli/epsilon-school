package com.epsilonschool.controller;

import com.epsilonschool.dao.service.ReportService;
import com.epsilonschool.entity.Report;
import com.epsilonschool.entity.Task;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ReportController {
    private ReportService reportService;

    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    @PostMapping("/report/add")
    public ResponseEntity addReport(@RequestBody Report report) {
        return this.reportService.addReport(report);
    }

    @GetMapping("/report/get")
    public List<Report> getReportCount(@RequestParam("reportee") String reportee) {
        return this.reportService.getReports(reportee);
    }
    @GetMapping("/report/getAll")
    public List<Report> getAllReports() {
        return this.reportService.getAll();
    }

    @GetMapping("/report/reportedTasks")
    public List<Task> getReportedTasks(@RequestParam("uid") String reportee) {
        return this.reportService.getReportedTasks(reportee);
    }
}
