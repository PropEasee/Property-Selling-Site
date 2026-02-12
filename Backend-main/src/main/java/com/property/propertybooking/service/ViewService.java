package com.property.propertybooking.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.property.propertybooking.dto.PropertyViewRequest;
import com.property.propertybooking.dto.PropertyViewsCountDto;
import com.property.propertybooking.entity.Property;
import com.property.propertybooking.entity.PropertyViews;
import com.property.propertybooking.entity.User;
import com.property.propertybooking.repository.PropertyRepository;
import com.property.propertybooking.repository.UserRepository;
import com.property.propertybooking.repository.ViewRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ViewService {

        private final ViewRepository viewRepository;
        private final PropertyRepository propertyRepository;
        private final UserRepository userRepository;

        @Transactional
        public PropertyViews addView(PropertyViewRequest request) {
                Long propertyId = request.getPropertyId();
                Long userId = request.getUserId();

                if (viewRepository.existsByProperty_PropertyIdAndBuyer_UserId(propertyId, userId)) {
                        return viewRepository.findFirstByProperty_PropertyIdAndBuyer_UserId(propertyId, userId)
                                        .orElseThrow(() -> new RuntimeException("Existing view not found"));
                }

                Property property = propertyRepository.findById(propertyId)
                                .orElseThrow(() -> new RuntimeException("Property not found"));

                User buyer = userRepository.findById(userId)
                                .orElseThrow(() -> new RuntimeException("User not found"));

                PropertyViews view = new PropertyViews();
                view.setProperty(property);
                view.setBuyer(buyer);

                return viewRepository.save(view);

        }
        
     // Return all views for a given property id
               public List<PropertyViews> getViewsByPropertyId(Long propertyId) {
                      return viewRepository.findByProperty_PropertyId(propertyId);
              }
               
            // Return views count for all properties of a seller
                   public List<PropertyViewsCountDto> getViewsCountForSeller(Long sellerId) {
                       return viewRepository.countViewsBySellerProperties(sellerId);
                   }

}
