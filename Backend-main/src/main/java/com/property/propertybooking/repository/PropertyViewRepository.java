package com.property.propertybooking.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.property.propertybooking.entity.PropertyViews;

public interface PropertyViewRepository extends JpaRepository<PropertyViews, Long> {

    // ✅ Correct: buyer -> userId
    long countByBuyer_UserId(Long buyerId);
}
