package com.epsilonschool.controller;

import com.epsilonschool.dao.service.ReportService;
import com.epsilonschool.entity.Report;
import com.epsilonschool.entity.Task;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/report")
public class ReportController {

    @Autowired
    private ReportService reportService;

    @GetMapping
    public ResponseEntity<List<Report>> getAllReports() {
        return ResponseEntity.ok().body(reportService.getAll());
    }

    @GetMapping("/count")
    public ResponseEntity<List<Report>> getReportCount(@RequestParam String reportee) {
        return ResponseEntity.ok().body(reportService.getReports(reportee));
    }

    @GetMapping("/reported")
    public ResponseEntity<List<Task>> getReportedTasks(@RequestParam("uid") String reportee) {
        return ResponseEntity.ok().body(reportService.getReportedTasks(reportee));
    }

    @PostMapping
    public void addReport(@RequestBody Report report) {
        reportService.addReport(report);
    }
}
