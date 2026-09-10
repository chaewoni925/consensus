package com.example.demo.domain.report;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ReportService {

    private final ReportRepository reportRepository;
    private final String UPLOAD_DIR = "uploads/reports/";

    public List<ReportResponse> getAllReports(ReportCategory category) {
        return getAllReports(category, "latest");
    }

    public List<ReportResponse> getAllReports(ReportCategory category, String sort) {
        List<Report> reports;
        String s = sort != null ? sort.toLowerCase() : "latest";

        if (category != null) {
            switch (s) {
                case "oldest":
                    reports = reportRepository.findByCategoryOrderByPublishDateAscIdAsc(category);
                    break;
                case "views":
                    reports = reportRepository.findByCategoryOrderByViewsDescPublishDateDescIdDesc(category);
                    break;
                case "award":
                case "rank":
                    reports = reportRepository.findByCategoryOrderByAwardRankAscPublishDateDescIdDesc(category);
                    break;
                case "latest":
                default:
                    reports = reportRepository.findByCategoryOrderByPublishDateDescIdDesc(category);
                    break;
            }
        } else {
            switch (s) {
                case "oldest":
                    reports = reportRepository.findAllByOrderByPublishDateAscIdAsc();
                    break;
                case "views":
                    reports = reportRepository.findAllByOrderByViewsDescPublishDateDescIdDesc();
                    break;
                case "award":
                case "rank":
                    reports = reportRepository.findAllByOrderByAwardRankAscPublishDateDescIdDesc();
                    break;
                case "latest":
                default:
                    reports = reportRepository.findAllByOrderByPublishDateDescIdDesc();
                    break;
            }
        }
        return reports.stream().map(ReportResponse::from).collect(Collectors.toList());
    }

    @Transactional
    public ReportResponse increaseViews(Long id) {
        Report report = reportRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("리포트를 찾을 수 없습니다. id=" + id));
        report.increaseViews();
        return ReportResponse.from(report);
    }

    private static final java.util.Set<String> ALLOWED_EXTENSIONS = java.util.Set.of(
            "pdf", "doc", "docx", "ppt", "pptx", "xls", "xlsx", "zip", "png", "jpg", "jpeg", "gif", "webp", "hwp", "hwpx"
    );
    private static final long MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

    private void validateUploadedFile(MultipartFile file) {
        if (file.getSize() > MAX_FILE_SIZE) {
            throw new IllegalArgumentException("파일 용량은 최대 50MB까지 허용됩니다.");
        }

        String originalFilename = file.getOriginalFilename();
        if (originalFilename == null || !originalFilename.contains(".")) {
            throw new IllegalArgumentException("올바른 파일 확장자가 존재하지 않습니다.");
        }

        String ext = originalFilename.substring(originalFilename.lastIndexOf(".") + 1).toLowerCase();
        if (!ALLOWED_EXTENSIONS.contains(ext)) {
            throw new IllegalArgumentException("허용되지 않는 파일 확장자입니다. (허용: PDF, DOCX, PPTX, XLSX, ZIP, 이미지, HWP 등)");
        }
    }

    @Transactional
    public ReportResponse createReport(String title, String department, ReportCategory category, String reportType, LocalDate publishDate, Integer awardRank, MultipartFile file) throws IOException {
        String fileUrl = null;
        String fileName = null;

        if (file != null && !file.isEmpty()) {
            validateUploadedFile(file);

            File dir = new File(UPLOAD_DIR);
            if (!dir.exists()) {
                dir.mkdirs();
            }

            String rawFileName = Paths.get(file.getOriginalFilename()).getFileName().toString();
            fileName = rawFileName.replaceAll("[^a-zA-Z0-9가-힣._-]", "_");

            String savedFileName = UUID.randomUUID().toString() + "_" + fileName;
            Path path = Paths.get(UPLOAD_DIR + savedFileName).normalize();
            Files.copy(file.getInputStream(), path);

            fileUrl = "/uploads/reports/" + savedFileName;
        }

        Report report = Report.builder()
                .title(title)
                .department(department)
                .category(category)
                .reportType(reportType)
                .publishDate(publishDate != null ? publishDate : LocalDate.now())
                .awardRank(awardRank)
                .fileUrl(fileUrl)
                .fileName(fileName)
                .build();

        Report saved = reportRepository.save(report);
        return ReportResponse.from(saved);
    }

    @Transactional
    public void deleteReport(Long id) {
        reportRepository.deleteById(id);
    }
}
