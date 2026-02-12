package com.property.propertybooking.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import com.property.propertybooking.dto.LogRequest;
import lombok.extern.slf4j.Slf4j;
import java.time.LocalDateTime;
import reactor.core.publisher.Mono;

@Slf4j
@Service
public class LoggingClientService {
    
    private final WebClient webClient;
    
    @Value("${logging.service.url:http://localhost:5000}")
    private String loggingServiceUrl;
    
    public LoggingClientService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.build();
    }
    
    public void sendLog(String level, String message) {
        sendLog("PropertyBooking", level, message);
    }
    
    public void sendLog(String service, String level, String message) {
        LogRequest logRequest = new LogRequest(
            service,
            level,
            message,
            LocalDateTime.now()
        );
        
        webClient.post()
            .uri(loggingServiceUrl + "/logs")
            .bodyValue(logRequest)
            .retrieve()
            .toEntity(String.class)
            .subscribe(
                response -> log.debug("Log sent successfully"),
                error -> log.error("Failed to send log: {}", error.getMessage())
            );
    }
}