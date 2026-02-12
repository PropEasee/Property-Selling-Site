package com.property.propertybooking.dto;

import com.property.propertybooking.entity.EnquiryStatus;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class EnquiryUpdateRequestDto {
	private String message;
    private EnquiryStatus status;
}
