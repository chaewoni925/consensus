package com.example.demo.domain.member;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MemberResponse {

    private Long id;
    private Integer generationNumber;
    private String name;
    private String position;
    private String photoUrl;
    private String instagram;
    private String kakaoId;
    private String intro;

    public static MemberResponse from(Member member) {
        return MemberResponse.builder()
                .id(member.getId())
                .generationNumber(member.getGeneration().getNumber())
                .name(member.getName())
                .position(member.getPosition())
                .photoUrl(member.getPhotoUrl())
                .instagram(member.getInstagram())
                .kakaoId(member.getKakaoId())
                .intro(member.getIntro())
                .build();
    }
}