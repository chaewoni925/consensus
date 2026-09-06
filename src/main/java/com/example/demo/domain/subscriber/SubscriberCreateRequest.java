package com.example.demo.domain.subscriber;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class SubscriberCreateRequest {

    @NotBlank
    @Email
    private String email;
}