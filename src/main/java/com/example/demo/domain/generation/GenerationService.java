package com.example.demo.domain.generation;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class GenerationService {

    private final GenerationRepository generationRepository;

    public List<GenerationResponse> getAllGenerations() {
        return generationRepository.findAll()
                .stream()
                .map(GenerationResponse::from)
                .toList();
    }

    @Transactional
    public GenerationResponse createGeneration(GenerationCreateRequest request) {
        Generation generation = Generation.builder()
                .number(request.getNumber())
                .startDate(request.getStartDate())
                .endDate(request.getEndDate())
                .build();

        Generation saved = generationRepository.save(generation);
        return GenerationResponse.from(saved);
    }
}