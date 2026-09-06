package com.example.demo.domain.subscriber;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class SubscriberService {

    private final SubscriberRepository subscriberRepository;

    @Transactional
    public void subscribe(SubscriberCreateRequest request) {
        if (subscriberRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new IllegalArgumentException("이미 구독 중인 이메일입니다.");
        }

        Subscriber subscriber = Subscriber.builder()
                .email(request.getEmail())
                .build();

        subscriberRepository.save(subscriber);
    }
}