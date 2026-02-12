package com.property.propertybooking.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.property.propertybooking.entity.PropertyImage;

@Repository
public interface PropertyImageRepository extends JpaRepository<PropertyImage, Long> {

    // Get all images for a given property
    List<PropertyImage> findByPropertyPropertyId(Long propertyId);
}

