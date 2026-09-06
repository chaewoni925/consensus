package com.example.demo.domain.research;

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
@Table(name = "research")
public class Research {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 200)
    private String title;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private ResearchType type;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(length = 255)
    private String imageUrl;

    @Column(length = 255)
    private String fileUrl;

    @Column(nullable = false)
    private Integer year;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @Builder
    public Research(String title, ResearchType type, String description,
                    String imageUrl, String fileUrl, Integer year) {
        this.title = title;
        this.type = type;
        this.description = description;
        this.imageUrl = imageUrl;
        this.fileUrl = fileUrl;
        this.year = year;
    }
}

