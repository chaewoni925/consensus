package com.example.demo.domain.report;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReportRepository extends JpaRepository<Report, Long> {
    List<Report> findAllByOrderByPublishDateDescIdDesc();
    List<Report> findByCategoryOrderByPublishDateDescIdDesc(ReportCategory category);
    
    List<Report> findAllByOrderByPublishDateAscIdAsc();
    List<Report> findByCategoryOrderByPublishDateAscIdAsc(ReportCategory category);

    List<Report> findAllByOrderByViewsDescPublishDateDescIdDesc();
    List<Report> findByCategoryOrderByViewsDescPublishDateDescIdDesc(ReportCategory category);

    List<Report> findAllByOrderByAwardRankAscPublishDateDescIdDesc();
    List<Report> findByCategoryOrderByAwardRankAscPublishDateDescIdDesc(ReportCategory category);
}
