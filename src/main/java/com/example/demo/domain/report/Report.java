package com.example.demo.domain.report;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "report")
public class Report {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 255)
    private String title;

    @Column(nullable = false, length = 100)
    private String department;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 50)
    private ReportCategory category;

    @Column(nullable = false, length = 100)
    private String reportType;

    @Column(nullable = false)
    private LocalDate publishDate;

    @Column(length = 500)
    private String fileUrl;

    @Column(length = 255)
    private String fileName;

    @Column(nullable = false)
    private Long views = 0L;

    @Column
    private Integer awardRank; // 수상 등급/순위 (예: 1등, 2등 등, 숫자 작을수록 높은 수상)

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @Builder
    public Report(Long id, String title, String department, ReportCategory category, String reportType, LocalDate publishDate, String fileUrl, String fileName, Long views, Integer awardRank) {
        this.id = id;
        this.title = title;
        this.department = department;
        this.category = category;
        this.reportType = reportType;
        this.publishDate = publishDate;
        this.fileUrl = fileUrl;
        this.fileName = fileName;
        this.views = views != null ? views : 0L;
        this.awardRank = awardRank;
    }

    public void increaseViews() {
        this.views = (this.views == null ? 0L : this.views) + 1;
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
    public LocalDateTime getCreatedAt() { return createdAt; }
}
