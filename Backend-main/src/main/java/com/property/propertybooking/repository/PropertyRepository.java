package com.property.propertybooking.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.property.propertybooking.dto.PropertyNoImageDto;
import com.property.propertybooking.dto.PropertyViewsCountDto;
import com.property.propertybooking.dto.PropertyWithImageDto;
import com.property.propertybooking.entity.Property;
import com.property.propertybooking.entity.PropertyStatus;

public interface PropertyRepository extends JpaRepository<Property, Long>{
	
// Count properties by status (APPROVED / PENDING / REJECTED)
    // Used in Admin Dashboard stats
    long countByStatus(PropertyStatus status);

    // Search properties by title (Admin can search all properties)
    List<Property> findByTitleContainingIgnoreCase(String title);

  
 // ✅ Seller personal properties (CORRECT)
    List<Property> findBySeller_UserId(Long sellerId);


    
 // Custom query returning DTO without images (uses seller.userId)
    @Query("SELECT new com.property.propertybooking.dto.PropertyNoImageDto(" +
           "p.propertyId, p.title, p.description, p.price, p.city, p.state, p.pincode, " +
           "p.propertyType, p.status, p.seller.name, p.createdAt) " +
           "FROM Property p")
    List<PropertyNoImageDto> findAllWithoutImages();

    @Query("SELECT p FROM Property p LEFT JOIN p.images img " +
           "WHERE p.seller.userId = :sellerId AND " +
           "(img.imageId IS NULL OR img.imageId = (" +
           "SELECT MIN(pi.imageId) FROM PropertyImage pi WHERE pi.property.propertyId = p.propertyId))")
    List<Property> findBySeller_UserId_WithSingleImage(@Param("sellerId") Long sellerId);
    

    // New: return a DTO with exactly one image url (the image with MIN(image_id)) per property
    @Query("SELECT new com.property.propertybooking.dto.PropertyWithImageDto(" +
            "p.propertyId, p.title, p.description, p.price, p.city, p.state, p.pincode, " +
            "p.propertyType, p.status, p.seller.name, p.createdAt, " +
            "(SELECT pi.imageUrl FROM PropertyImage pi WHERE pi.property = p AND pi.imageId = (" +
            "SELECT MIN(pii.imageId) FROM PropertyImage pii WHERE pii.property = p))" +
            ") " +
            "FROM Property p " +
            "WHERE p.seller.userId = :sellerId")
     List<PropertyWithImageDto> findBySeller_WithSingleImageDto(@Param("sellerId") Long sellerId);

   }
