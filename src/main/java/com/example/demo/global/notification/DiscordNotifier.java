package com.example.demo.global.notification;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Component
@RequiredArgsConstructor
public class DiscordNotifier {

    private final RestTemplate restTemplate = new RestTemplate();

    @Value("${discord.webhook.url:}")
    private String webhookUrl;

    public void sendError(String title, String detail) {
        try {
            if (webhookUrl == null || webhookUrl.isBlank()) return;
            String content = "🚨 **" + title + "**\n```\n" + detail + "\n```";
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<Map<String, String>> request =
                    new HttpEntity<>(Map.of("content", content), headers);

            restTemplate.postForEntity(webhookUrl, request, String.class);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
