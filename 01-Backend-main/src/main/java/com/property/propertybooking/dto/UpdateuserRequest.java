package com.property.propertybooking.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateuserRequest {

    private String name;
    private String phone;
    private String password; // optional

    // getters & setters
}
