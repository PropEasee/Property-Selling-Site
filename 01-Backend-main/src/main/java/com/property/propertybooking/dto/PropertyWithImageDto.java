package com.property.propertybooking.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.property.propertybooking.entity.PropertyStatus;
import com.property.propertybooking.entity.PropertyType;

public class PropertyWithImageDto {
    private Long propertyId;
    private String title;
    private String description;
    private BigDecimal price;
    private String city;
    private String state;
    private String pincode;
    private PropertyType propertyType;
    private PropertyStatus status;
    private String sellerName;
    private LocalDateTime createdAt;
    private String imageUrl;

    public PropertyWithImageDto(Long propertyId, String title, String description, BigDecimal price,
                                String city, String state, String pincode, PropertyType propertyType,
                                PropertyStatus status, String sellerName, LocalDateTime createdAt,
                                String imageUrl) {
        this.propertyId = propertyId;
        this.title = title;
        this.description = description;
        this.price = price;
        this.city = city;
        this.state = state;
        this.pincode = pincode;
        this.propertyType = propertyType;
        this.status = status;
        this.sellerName = sellerName;
        this.createdAt = createdAt;
        this.imageUrl = imageUrl;
    }

    // getters
    public Long getPropertyId() { return propertyId; }
    public String getTitle() { return title; }
    public String getDescription() { return description; }
    public BigDecimal getPrice() { return price; }
    public String getCity() { return city; }
    public String getState() { return state; }
    public String getPincode() { return pincode; }
    public PropertyType getPropertyType() { return propertyType; }
    public PropertyStatus getStatus() { return status; }
    public String getSellerName() { return sellerName; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public String getImageUrl() { return imageUrl; }
}