package com.example.demo.domain.member;

import com.example.demo.domain.generation.Generation;
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
@Table(name = "member")
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "generation_id", nullable = false)
    private Generation generation;

    @Column(nullable = false, length = 50)
    private String name;

    @Column(nullable = false, length = 30)
    private String position;

    @Column(length = 255)
    private String photoUrl;

    @Column(length = 100)
    private String instagram;

    @Column(length = 100)
    private String kakaoId;

    @Column(length = 500)
    private String intro;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;


    @Builder
    public Member(Generation generation, String name, String position,
                  String photoUrl, String instagram, String kakaoId, String intro) {
        this.generation = generation;
        this.name = name;
        this.position = position;
        this.photoUrl = photoUrl;
        this.instagram = instagram;
        this.kakaoId = kakaoId;
        this.intro = intro;
    }
}