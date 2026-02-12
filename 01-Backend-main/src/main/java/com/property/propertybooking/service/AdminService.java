package com.property.propertybooking.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.property.propertybooking.dto.AdminStatsResponse;
import com.property.propertybooking.dto.PropertyNoImageDto;
import com.property.propertybooking.entity.Property;
import com.property.propertybooking.entity.PropertyStatus;
import com.property.propertybooking.entity.Role;
import com.property.propertybooking.repository.EnquiryRepository;
import com.property.propertybooking.repository.PropertyRepository;
import com.property.propertybooking.repository.UserRepository;

@Service
public class AdminService {

    // Repository dependencies
    private final UserRepository userRepository;
    private final PropertyRepository propertyRepository;
    private final EnquiryRepository enquiryRepository;

    // Constructor injection (best practice)
    public AdminService(UserRepository userRepository,
                        PropertyRepository propertyRepository,
                        EnquiryRepository enquiryRepository) {
        this.userRepository = userRepository;
        this.propertyRepository = propertyRepository;
        this.enquiryRepository = enquiryRepository;
    }

    // 1️⃣ Admin Dashboard Statistics
    // Counts users, properties, and enquiries
    public AdminStatsResponse getStats() {

        AdminStatsResponse stats = new AdminStatsResponse();

        // Count users by role
        stats.setAdminUsers(userRepository.countByRole(Role.ADMIN));
        stats.setOwnerUsers(userRepository.countByRole(Role.SELLER));
        stats.setNormalUsers(userRepository.countByRole(Role.BUYER));

        // Count properties by status
        stats.setApprovedProperties(
                propertyRepository.countByStatus(PropertyStatus.AVAILABLE));
        stats.setPendingProperties(
                propertyRepository.countByStatus(PropertyStatus.PENDING));
        stats.setRejectedProperties(
                propertyRepository.countByStatus(PropertyStatus.SOLD));

        // Count total enquiries
        stats.setTotalEnquiries(enquiryRepository.count());

        return stats;
    }

    // 2️⃣ Admin can view / search all properties
    public List<Property> getAllProperties(String search) {

        // If search keyword is present, filter properties
        if (search != null && !search.isEmpty()) {
            return propertyRepository.findByTitleContainingIgnoreCase(search);
        }

        // Otherwise return all properties
        return propertyRepository.findAll();
    }
    

    
    public List<PropertyNoImageDto> getAllPropertiesWithoutImages() {
        return propertyRepository.findAllWithoutImages();
    }

    // 3️⃣ Admin can force update property status
    public Property forceUpdateStatus(Long propertyId, PropertyStatus status) {

        // Fetch property by id
        Property property = propertyRepository.findById(propertyId)
                .orElseThrow(() -> new RuntimeException("Property not found"));

        // Update property status
        property.setStatus(status);

        // Save and return updated property
        return propertyRepository.save(property);
    }
}
