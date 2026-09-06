package com.example.demo.domain.activity;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@NoArgsConstructor
public class ActivityCreateRequest {

    @NotBlank
    private String title;

    private String description;

    @NotNull
    private LocalDate activityDate;

    private String imageUrl;
}