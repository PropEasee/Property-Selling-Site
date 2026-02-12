package com.property.propertybooking.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.property.propertybooking.dto.PropertyRequest;
import com.property.propertybooking.dto.PropertyResponse;
import com.property.propertybooking.dto.PropertyWithImageDto;
import com.property.propertybooking.entity.Property;

public interface PropertyService {

    Property createProperty(PropertyRequest request);

    PropertyResponse getPropertyById(Long propertyId);

    Property updateProperty(Long id, Property updatedData);

    void deleteProperty(Long id);
//    
//    void uploadPropertyImages(Long propertyId, MultipartFile[] files);
    
    public List<PropertyResponse> getAllProperties();
    
 // Get all properties of a specific seller
    List<PropertyWithImageDto> getPropertiesBySeller(Long sellerId);

    
}
