package com.example.demo.domain.report;

import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;

@RestController
@RequestMapping("/api/reports")
@RequiredArgsConstructor
public class ReportController {

    private final ReportService reportService;

    @Value("${executive.secret-key}")
    private String executiveSecretKey;

    @GetMapping
    public ResponseEntity<List<ReportResponse>> getReports(
            @RequestParam(required = false) ReportCategory category,
            @RequestParam(required = false, defaultValue = "latest") String sort
    ) {
        return ResponseEntity.ok(reportService.getAllReports(category, sort));
    }

    @PostMapping("/{id}/view")
    public ResponseEntity<ReportResponse> increaseViews(@PathVariable Long id) {
        return ResponseEntity.ok(reportService.increaseViews(id));
    }

    @PostMapping
    public ResponseEntity<?> createReport(
            @RequestHeader(value = "X-Executive-Key", required = false) String executiveKey,
            @RequestParam("title") String title,
            @RequestParam("department") String department,
            @RequestParam("category") ReportCategory category,
            @RequestParam("reportType") String reportType,
            @RequestParam(value = "publishDate", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate publishDate,
            @RequestParam(value = "awardRank", required = false) Integer awardRank,
            @RequestParam(value = "file", required = false) MultipartFile file
    ) {
        if (!executiveSecretKey.equals(executiveKey)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("운영진 인증 키가 올바르지 않습니다.");
        }

        try {
            ReportResponse response = reportService.createReport(title, department, category, reportType, publishDate, awardRank, file);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("파일 저장 중 오류가 발생했습니다.");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteReport(
            @RequestHeader(value = "X-Executive-Key", required = false) String executiveKey,
            @PathVariable Long id
    ) {
        if (!executiveSecretKey.equals(executiveKey)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("운영진 인증 키가 올바르지 않습니다.");
        }
        reportService.deleteReport(id);
        return ResponseEntity.noContent().build();
    }
}
