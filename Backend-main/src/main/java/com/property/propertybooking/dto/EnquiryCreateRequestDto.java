package com.property.propertybooking.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EnquiryCreateRequestDto {
    private Long propertyId;
    private Long userId;
    private String message;
}
