package com.property.propertybooking.dto;

import com.property.propertybooking.entity.Role;

public class LoginResponse {

    private Long userId;
    private String name;
    private String email;
    private Role role;

    public LoginResponse(Long userId, String name, String email, Role role) {
        this.userId = userId;
        this.name = name;
        this.email = email;
        this.role = role;
    }

    // getters
    public Long getUserId() {
        return userId;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public Role getRole() {
        return role;
    }
}
