package com.property.propertybooking.controller;

import com.property.propertybooking.entity.PropertyLike;
import com.property.propertybooking.service.PropertyLikeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/property-likes")
@CrossOrigin(origins = "*")
public class PropertyLikeController {
	
	@Autowired
    private PropertyLikeService propertyLikeService;
	
	// Check if property is liked by buyer
    @GetMapping("/{buyerId}/{propertyId}/is-liked")
    public ResponseEntity<Boolean> isPropertyLiked(@PathVariable Long buyerId, @PathVariable Long propertyId) {
        boolean isLiked = propertyLikeService.isPropertyLiked(buyerId, propertyId);
        return ResponseEntity.ok(isLiked);
    }
    
 // Like a property
    @PostMapping("/{buyerId}/{propertyId}")
    public ResponseEntity<?> likeProperty(@PathVariable Long buyerId, @PathVariable Long propertyId) {
        try {
            PropertyLike like = propertyLikeService.likeProperty(buyerId, propertyId);
            return ResponseEntity.status(HttpStatus.CREATED).body(like);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
    
    // Unlike a property
    @DeleteMapping("/{buyerId}/{propertyId}")
    public ResponseEntity<?> unlikeProperty(@PathVariable Long buyerId, @PathVariable Long propertyId) {
        try {
            propertyLikeService.unlikeProperty(buyerId, propertyId);
            return ResponseEntity.ok("Property unliked successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
    
 // Get all liked properties by a buyer
    @GetMapping("/buyer/{buyerId}")
    public ResponseEntity<List<PropertyLike>> getBuyerLikedProperties(@PathVariable Long buyerId) {
        List<PropertyLike> likedProperties = propertyLikeService.getBuyerLikedProperties(buyerId);
        return ResponseEntity.ok(likedProperties);
    }

}
