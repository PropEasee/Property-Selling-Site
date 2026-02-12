package com.property.propertybooking.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.property.propertybooking.entity.PropertyStatus;
import com.property.propertybooking.entity.PropertyType;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class PropertyNoImageDto {
    private Long propertyId;
    private String title;
    private String description;
    private BigDecimal price;
    private String city;
    private String state;
    private String pincode;
    private PropertyType propertyType;
    private PropertyStatus status;
    private String name;
    private LocalDateTime createdAt;
}