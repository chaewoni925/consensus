package com.example.demo.domain.activity;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@Builder
public class ActivityResponse {

    private Long id;
    private String title;
    private String description;
    private LocalDate activityDate;
    private String imageUrl;

    public static ActivityResponse from(Activity activity) {
        return ActivityResponse.builder()
                .id(activity.getId())
                .title(activity.getTitle())
                .description(activity.getDescription())
                .activityDate(activity.getActivityDate())
                .imageUrl(activity.getImageUrl())
                .build();
    }
}