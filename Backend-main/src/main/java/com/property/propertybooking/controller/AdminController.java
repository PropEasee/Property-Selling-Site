package com.property.propertybooking.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.property.propertybooking.dto.AdminStatsResponse;
import com.property.propertybooking.dto.ForceStatusRequest;
import com.property.propertybooking.dto.PropertyNoImageDto;
import com.property.propertybooking.entity.Property;
import com.property.propertybooking.service.AdminService;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    // 1️ Dashboard stats API
    @GetMapping("/stats")
    public ResponseEntity<AdminStatsResponse> getStats() {
        return ResponseEntity.ok(adminService.getStats());
    }

    // 2️ Get all properties (with optional search)
    @GetMapping("/properties")
    public ResponseEntity<List<Property>> getAllProperties(
            @RequestParam(required = false) String search) {

        return ResponseEntity.ok(adminService.getAllProperties(search));
    }
    

    @GetMapping("/properties/no-images")
    public ResponseEntity<List<PropertyNoImageDto>> getAllPropertiesNoImages() {
        return ResponseEntity.ok(adminService.getAllPropertiesWithoutImages());
    }

    // 3️ Force update property status
    @PutMapping("/properties/{id}/force-status")
    public ResponseEntity<Property> forceStatus(
            @PathVariable Long id,
            @RequestBody ForceStatusRequest request) {

        return ResponseEntity.ok(
                adminService.forceUpdateStatus(id, request.getStatus())
        );
    }
}

