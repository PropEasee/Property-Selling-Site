package com.property.propertybooking.dto;

import java.time.LocalDateTime;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LogRequest {
    @JsonProperty("Service")
    private String service;
    
    @JsonProperty("Level")
    private String level;
    
    @JsonProperty("Message")
    private String message;
    
    @JsonProperty("Timestamp")
    private LocalDateTime timestamp;
}