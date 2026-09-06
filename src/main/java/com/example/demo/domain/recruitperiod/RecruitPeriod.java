package com.example.demo.domain.recruitperiod;


import com.example.demo.domain.application.Application;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "recruit_period")
public class RecruitPeriod {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDate startDate;

    @Column(nullable = false)
    private LocalDate endDate;

    @Column(nullable = false)
    private Boolean isActive = true;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "recruitPeriod", cascade = CascadeType.ALL)
    private List<Application> applications = new ArrayList<>();

    @Builder
    public RecruitPeriod(LocalDate startDate, LocalDate endDate, Boolean isActive) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.isActive = isActive != null ? isActive : true;
    }
}