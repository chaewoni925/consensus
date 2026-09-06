package com.example.demo.domain.activity;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ActivityService {

    private final ActivityRepository activityRepository;

    public List<ActivityResponse> getAllActivities() {
        return activityRepository.findAllByOrderByActivityDateDesc()
                .stream()
                .map(ActivityResponse::from)
                .toList();
    }

    @Transactional
    public ActivityResponse createActivity(ActivityCreateRequest request) {
        Activity activity = Activity.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .activityDate(request.getActivityDate())
                .imageUrl(request.getImageUrl())
                .build();

        Activity saved = activityRepository.save(activity);
        return ActivityResponse.from(saved);
    }

    @Transactional
    public void deleteActivity(Long id) {
        activityRepository.deleteById(id);
    }
}