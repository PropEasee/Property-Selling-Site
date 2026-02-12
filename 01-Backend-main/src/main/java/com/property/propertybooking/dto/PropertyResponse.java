package com.property.propertybooking.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import com.property.propertybooking.entity.PropertyStatus;
import com.property.propertybooking.entity.PropertyType;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PropertyResponse {
	private Long propertyId;
    private String title;
    private String description;
    private BigDecimal price;
    private String city;
    private String state;
    private String pincode;
    private PropertyType propertyType;
    private PropertyStatus status;
    private LocalDateTime createdAt;

    // seller info
    private Long sellerId;
    private String sellerName;
    
    private List<String> images;
}
