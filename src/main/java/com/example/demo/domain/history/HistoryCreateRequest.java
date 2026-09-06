package com.example.demo.domain.history;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class HistoryCreateRequest {

    @NotNull
    private Integer year;

    @NotBlank
    private String content;

    private Integer displayOrder;
}