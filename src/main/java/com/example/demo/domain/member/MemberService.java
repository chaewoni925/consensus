package com.example.demo.domain.member;

import com.example.demo.domain.generation.Generation;
import com.example.demo.domain.generation.GenerationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MemberService {

    private final MemberRepository memberRepository;
    private final GenerationRepository generationRepository;

    public List<MemberResponse> getAllMembers() {
        return memberRepository.findAll()
                .stream()
                .map(MemberResponse::from)
                .toList();
    }

    public List<MemberResponse> getMembersByGeneration(Long generationId) {
        return memberRepository.findAllByGenerationId(generationId)
                .stream()
                .map(MemberResponse::from)
                .toList();
    }

    @Transactional
    public MemberResponse createMember(MemberCreateRequest request) {
        Generation generation = generationRepository.findById(request.getGenerationId())
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 기수입니다."));

        Member member = Member.builder()
                .generation(generation)
                .name(request.getName())
                .position(request.getPosition())
                .photoUrl(request.getPhotoUrl())
                .instagram(request.getInstagram())
                .kakaoId(request.getKakaoId())
                .intro(request.getIntro())
                .build();

        Member saved = memberRepository.save(member);
        return MemberResponse.from(saved);
    }

    @Transactional
    public void deleteMember(Long id) {
        memberRepository.deleteById(id);
    }
}