package com.example.demo.domain.generation;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/generations")
@RequiredArgsConstructor
public class GenerationController {

    private final GenerationService generationService;

    @GetMapping
    public ResponseEntity<List<GenerationResponse>> getAllGenerations() {
        return ResponseEntity.ok(generationService.getAllGenerations());
    }

    @PostMapping
    public ResponseEntity<GenerationResponse> createGeneration(@Valid @RequestBody GenerationCreateRequest request) {
        GenerationResponse response = generationService.createGeneration(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}