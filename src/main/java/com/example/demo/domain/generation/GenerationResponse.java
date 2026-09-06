package com.example.demo.domain.generation;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@Builder
public class GenerationResponse {

    private Long id;
    private Integer number;
    private LocalDate startDate;
    private LocalDate endDate;

    public static GenerationResponse from(Generation generation) {
        return GenerationResponse.builder()
                .id(generation.getId())
                .number(generation.getNumber())
                .startDate(generation.getStartDate())
                .endDate(generation.getEndDate())
                .build();
    }
}