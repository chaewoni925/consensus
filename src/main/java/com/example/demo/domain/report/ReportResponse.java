package com.example.demo.domain.report;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@Builder
public class ReportResponse {
    private Long id;
    private String title;
    private String department;
    private ReportCategory category;
    private String reportType;
    private LocalDate publishDate;
    private String fileUrl;
    private String fileName;
    private Long views;
    private Integer awardRank;

    public ReportResponse(Long id, String title, String department, ReportCategory category, String reportType, LocalDate publishDate, String fileUrl, String fileName, Long views, Integer awardRank) {
        this.id = id;
        this.title = title;
        this.department = department;
        this.category = category;
        this.reportType = reportType;
        this.publishDate = publishDate;
        this.fileUrl = fileUrl;
        this.fileName = fileName;
        this.views = views;
        this.awardRank = awardRank;
    }

    public static ReportResponse from(Report report) {
        return new ReportResponse(
                report.getId(),
                report.getTitle(),
                report.getDepartment(),
                report.getCategory(),
                report.getReportType(),
                report.getPublishDate(),
                report.getFileUrl(),
                report.getFileName(),
                report.getViews(),
                report.getAwardRank()
        );
    }

    public Long getId() { return id; }
    public String getTitle() { return title; }
    public String getDepartment() { return department; }
    public ReportCategory getCategory() { return category; }
    public String getReportType() { return reportType; }
    public LocalDate getPublishDate() { return publishDate; }
    public String getFileUrl() { return fileUrl; }
    public String getFileName() { return fileName; }
    public Long getViews() { return views; }
    public Integer getAwardRank() { return awardRank; }
}
