package com.example.demo.domain.history;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class HistoryService {

    private final HistoryRepository historyRepository;

    public List<HistoryResponse> getAllHistories() {
        return historyRepository.findAllByOrderByYearDescDisplayOrderAsc()
                .stream()
                .map(HistoryResponse::from)
                .toList();
    }

    @Transactional
    public HistoryResponse createHistory(HistoryCreateRequest request) {
        History history = History.builder()
                .year(request.getYear())
                .content(request.getContent())
                .displayOrder(request.getDisplayOrder())
                .build();

        History saved = historyRepository.save(history);
        return HistoryResponse.from(saved);
    }

    @Transactional
    public void deleteHistory(Long id) {
        historyRepository.deleteById(id);
    }
}