package com.property.propertybooking.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.property.propertybooking.entity.PropertyLike;

public interface PropertyLikeRepository extends JpaRepository<PropertyLike, Long>{
	
	// Check if a buyer has liked a property
    Optional<PropertyLike> findByBuyer_UserIdAndProperty_PropertyId(Long buyerId, Long propertyId);
    
 // Delete a like
    void deleteByBuyer_UserIdAndProperty_PropertyId(Long buyerId, Long propertyId);
    
 // Get all properties liked by a buyer
    List<PropertyLike> findByBuyer_UserId(Long buyerId);

}
