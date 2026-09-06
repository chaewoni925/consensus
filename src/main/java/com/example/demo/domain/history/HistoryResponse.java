package com.example.demo.domain.history;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class HistoryResponse {

    private Long id;
    private Integer year;
    private String content;
    private Integer displayOrder;

    public static HistoryResponse from(History history) {
        return HistoryResponse.builder()
                .id(history.getId())
                .year(history.getYear())
                .content(history.getContent())
                .displayOrder(history.getDisplayOrder())
                .build();
    }
}