package com.example.demo.domain.member;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class MemberCreateRequest {

    @NotNull
    private Long generationId;

    @NotBlank
    private String name;

    @NotBlank
    private String position;

    private String photoUrl;
    private String instagram;
    private String kakaoId;
    private String intro;
}