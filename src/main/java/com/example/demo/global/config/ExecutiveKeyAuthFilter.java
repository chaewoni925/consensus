package com.example.demo.global.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Set;

import org.springframework.beans.factory.annotation.Value;

@Component
public class ExecutiveKeyAuthFilter extends OncePerRequestFilter {

    @Value("${executive.secret-key}")
    private String executiveSecretKey;

    private static final String HEADER_NAME = "X-Executive-Key";

    private static final Set<String> PUBLIC_POST_ENDPOINTS = Set.of(
            "/api/subscribers"
    );

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String method = request.getMethod();
        String uri = request.getRequestURI();

        if ("POST".equalsIgnoreCase(method) || "PUT".equalsIgnoreCase(method) || 
            "DELETE".equalsIgnoreCase(method) || "PATCH".equalsIgnoreCase(method)) {

            if (isPublicMutatingRequest(uri)) {
                filterChain.doFilter(request, response);
                return;
            }

            String keyHeader = request.getHeader(HEADER_NAME);
            if (keyHeader == null || !executiveSecretKey.equals(keyHeader)) {
                response.setStatus(HttpStatus.FORBIDDEN.value());
                response.setContentType(MediaType.APPLICATION_JSON_VALUE);
                response.setCharacterEncoding(StandardCharsets.UTF_8.name());
                response.getWriter().write("{\"error\": \"Forbidden\", \"message\": \"운영진 인증 키가 올바르지 않거나 권한이 없습니다.\"}");
                return;
            }
        }

        filterChain.doFilter(request, response);
    }

    private boolean isPublicMutatingRequest(String uri) {
        if (PUBLIC_POST_ENDPOINTS.contains(uri)) {
            return true;
        }
        if (uri.matches("^/api/reports/\\d+/view$")) {
            return true;
        }
        return false;
    }
}
