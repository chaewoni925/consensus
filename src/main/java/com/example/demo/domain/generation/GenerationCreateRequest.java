package com.example.demo.domain.generation;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@NoArgsConstructor
public class GenerationCreateRequest {

    @NotNull
    private Integer number;

    @NotNull
    private LocalDate startDate;

    private LocalDate endDate;
}