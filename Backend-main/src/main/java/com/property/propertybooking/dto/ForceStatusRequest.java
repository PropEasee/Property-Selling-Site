package com.property.propertybooking.dto;

import com.property.propertybooking.entity.PropertyStatus;

import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class ForceStatusRequest {

    // New status to be applied by admin
    private PropertyStatus status;

    // getter and setter
}
