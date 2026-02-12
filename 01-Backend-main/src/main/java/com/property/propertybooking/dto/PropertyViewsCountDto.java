package com.property.propertybooking.dto;

public class PropertyViewsCountDto {
    private Long propertyId;
    private String title;
    private Long viewsCount;

    public PropertyViewsCountDto(Long propertyId, String title, Long viewsCount) {
        this.propertyId = propertyId;
        this.title = title;
        this.viewsCount = viewsCount;
    }

    public Long getPropertyId() { return propertyId; }
    public String getTitle() { return title; }
    public Long getViewsCount() { return viewsCount; }
}