package com.example.demo.domain.application;

import com.example.demo.domain.recruitperiod.RecruitPeriod;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "application")
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "recruit_period_id", nullable = false)
    private RecruitPeriod recruitPeriod;

    @Column(nullable = false, length = 50)
    private String name;

    @Column(nullable = false, length = 100)
    private String email;

    @Column(length = 20)
    private String phone;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String motivation;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private ApplicationStatus status;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime appliedAt;

    @Builder
    public Application(RecruitPeriod recruitPeriod, String name, String email,
                       String phone, String motivation) {
        this.recruitPeriod = recruitPeriod;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.motivation = motivation;
        this.status = ApplicationStatus.PENDING;
    }
}
