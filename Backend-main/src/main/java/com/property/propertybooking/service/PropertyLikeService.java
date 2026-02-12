package com.property.propertybooking.service;

import com.property.propertybooking.entity.PropertyLike;
import com.property.propertybooking.entity.Property;
import com.property.propertybooking.entity.User;
import com.property.propertybooking.repository.PropertyLikeRepository;
import com.property.propertybooking.repository.PropertyRepository;
import com.property.propertybooking.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class PropertyLikeService {
	
	@Autowired
    private PropertyLikeRepository propertyLikeRepository;

    @Autowired
    private PropertyRepository propertyRepository;

    @Autowired
    private UserRepository userRepository;
    
    // Check if buyer has liked a property
    public boolean isPropertyLiked(Long buyerId, Long propertyId) {
        return propertyLikeRepository.findByBuyer_UserIdAndProperty_PropertyId(buyerId, propertyId).isPresent();
    }
    
 // Like a property
    public PropertyLike likeProperty(Long buyerId, Long propertyId) {
        Optional<PropertyLike> existingLike = propertyLikeRepository.findByBuyer_UserIdAndProperty_PropertyId(buyerId, propertyId);
        
        if (existingLike.isPresent()) {
            throw new RuntimeException("Property already liked by this buyer");
        }

        User buyer = userRepository.findById(buyerId)
                .orElseThrow(() -> new RuntimeException("Buyer not found"));
        
        Property property = propertyRepository.findById(propertyId)
                .orElseThrow(() -> new RuntimeException("Property not found"));

        PropertyLike propertyLike = new PropertyLike();
        propertyLike.setBuyer(buyer);
        propertyLike.setProperty(property);
        
        return propertyLikeRepository.save(propertyLike);
    }
    
 // Unlike a property
    public void unlikeProperty(Long buyerId, Long propertyId) {
        Optional<PropertyLike> like = propertyLikeRepository.findByBuyer_UserIdAndProperty_PropertyId(buyerId, propertyId);
        
        if (like.isEmpty()) {
            throw new RuntimeException("Like not found");
        }
        
        propertyLikeRepository.delete(like.get());
    }
    
    // Get all liked properties by a buyer
    public List<PropertyLike> getBuyerLikedProperties(Long buyerId) {
        return propertyLikeRepository.findByBuyer_UserId(buyerId);
    }

}
