package com.property.propertybooking.service;

import java.util.Collections;
import java.util.List;

import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.property.propertybooking.dto.PropertyRequest;
import com.property.propertybooking.dto.PropertyResponse;
import com.property.propertybooking.dto.PropertyWithImageDto;
import com.property.propertybooking.entity.Property;
import com.property.propertybooking.entity.PropertyImage;
import com.property.propertybooking.entity.PropertyStatus;
import com.property.propertybooking.entity.User;
import com.property.propertybooking.repository.PropertyImageRepository;
import com.property.propertybooking.repository.PropertyRepository;
import com.property.propertybooking.repository.UserRepository;

@Service
public class PropertyServiceImpl implements PropertyService {

    private final PropertyRepository propertyRepository;
    private final UserRepository userRepository;
    private final PropertyImageRepository propertyImageRepository;

    public PropertyServiceImpl(PropertyRepository propertyRepository,
                               UserRepository userRepository,
                               PropertyImageRepository propertyImageRepository) {
        this.propertyRepository = propertyRepository;
        this.userRepository = userRepository;
        this.propertyImageRepository = propertyImageRepository;
    }

    // ================= CREATE PROPERTY =================
    @Override
    public Property createProperty(PropertyRequest request) {

        Property property = new Property();
        property.setTitle(request.getTitle());
        property.setDescription(request.getDescription());
        property.setPrice(request.getPrice());
        property.setCity(request.getCity());
        property.setState(request.getState());
        property.setPincode(request.getPincode());
        property.setPropertyType(request.getPropertyType());

        User seller = userRepository.findById(request.getSellerId())
                .orElseThrow(() -> new RuntimeException("Seller not found"));

        property.setSeller(seller);

        property.setStatus(
                request.getStatus() != null
                        ? request.getStatus()
                        : PropertyStatus.AVAILABLE
        );

        return propertyRepository.save(property);
    }

    // ================= GET PROPERTY BY ID =================
    @Override
    public PropertyResponse getPropertyById(Long propertyId) {

        Property property = propertyRepository.findById(propertyId)
                .orElseThrow(() -> new RuntimeException("Property not found"));

        PropertyResponse response = new PropertyResponse();
        response.setPropertyId(property.getPropertyId());
        response.setTitle(property.getTitle());
        response.setDescription(property.getDescription());
        response.setPrice(property.getPrice());
        response.setCity(property.getCity());
        response.setState(property.getState());
        response.setPincode(property.getPincode());
        response.setPropertyType(property.getPropertyType());
        response.setStatus(property.getStatus());
        response.setCreatedAt(property.getCreatedAt());

        response.setSellerId(property.getSeller().getUserId());
        response.setSellerName(property.getSeller().getName());

        response.setImages(
                propertyImageRepository.findByPropertyPropertyId(propertyId)
                        .stream()
                        .map(PropertyImage::getImageUrl)
                        .toList()
        );

        return response;
    }
    
    
    public List<PropertyResponse> getAllProperties() {
        return propertyRepository.findAll()
                .stream()
                .map(this::mapToPropertyResponse)
                .toList();
    }
    
    private PropertyResponse mapToPropertyResponse(Property property) {

        PropertyResponse response = new PropertyResponse();

        response.setPropertyId(property.getPropertyId());
        response.setTitle(property.getTitle());
        response.setDescription(property.getDescription());
        response.setPrice(property.getPrice());
        response.setCity(property.getCity());
        response.setState(property.getState());
        response.setPincode(property.getPincode());
        response.setPropertyType(property.getPropertyType());
        response.setStatus(property.getStatus());
        response.setCreatedAt(property.getCreatedAt());

        // seller info
        response.setSellerId(property.getSeller().getUserId());
        response.setSellerName(property.getSeller().getName());

        // images
        response.setImages(
            property.getImages()
                    .stream()
                    .map(PropertyImage::getImageUrl)
                    .toList()
        );

        return response;
    }

    // ================= UPDATE PROPERTY =================
    @Override
    public Property updateProperty(Long id, Property updatedData) {

        Property existingProperty = propertyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Property not found"));

        if (updatedData.getTitle() != null)
            existingProperty.setTitle(updatedData.getTitle());
        if (updatedData.getDescription() != null)
            existingProperty.setDescription(updatedData.getDescription());
        if (updatedData.getPrice() != null)
            existingProperty.setPrice(updatedData.getPrice());
        if (updatedData.getCity() != null)
            existingProperty.setCity(updatedData.getCity());
        if (updatedData.getState() != null)
            existingProperty.setState(updatedData.getState());
        if (updatedData.getPincode() != null)
            existingProperty.setPincode(updatedData.getPincode());
        if (updatedData.getPropertyType() != null)
            existingProperty.setPropertyType(updatedData.getPropertyType());
        if (updatedData.getStatus() != null)
            existingProperty.setStatus(updatedData.getStatus());

        return propertyRepository.save(existingProperty);
    }

    // ================= DELETE PROPERTY =================
    @Override
    public void deleteProperty(Long id) {

        Property property = propertyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Property not found"));
        propertyRepository.delete(property);
    }

	
    
	// Get all properties of a seller
    public List<PropertyWithImageDto> getPropertiesBySeller(Long sellerId) {
    	

    	return propertyRepository.findBySeller_WithSingleImageDto(sellerId);

    }


    
}



//package com.property.propertybooking.service;
//
//import java.util.Collections;
//
//import org.springframework.stereotype.Service;
//
//import com.property.propertybooking.dto.PropertyRequest;
//import com.property.propertybooking.dto.PropertyResponse;
//import com.property.propertybooking.entity.Property;
//import com.property.propertybooking.entity.PropertyStatus;
//import com.property.propertybooking.entity.Role;
//import com.property.propertybooking.entity.User;
//import com.property.propertybooking.repository.PropertyRepository;
//
//@Service
//public class PropertyServiceImpl implements PropertyService {
//
//    private final PropertyRepository propertyRepository;
//
//    public PropertyServiceImpl(PropertyRepository propertyRepository) {
//        this.propertyRepository = propertyRepository;
//    }
//
//    @Override
//    public Property createProperty(PropertyRequest request, User seller) {
//
//        Property property = new Property();
//        property.setTitle(request.getTitle());
//        property.setDescription(request.getDescription());
//        property.setPrice(request.getPrice());
//        property.setCity(request.getCity());
//        property.setState(request.getState());
//        property.setPincode(request.getPincode());
//        property.setPropertyType(request.getPropertyType());
//
//        // default status if not provided
//        property.setStatus(
//                request.getStatus() != null
//                        ? request.getStatus()
//                        : PropertyStatus.AVAILABLE
//        );
//
//        property.setSeller(seller);
//
//        return propertyRepository.save(property);
//    }
//
//	@Override
//	public PropertyResponse getPropertyById(Long propertyId) {
//		Property property = propertyRepository.findById(propertyId)
//                .orElseThrow(() -> new RuntimeException("Property not found"));
//		
//		PropertyResponse response = new PropertyResponse();
//        response.setPropertyId(property.getPropertyId());
//        response.setTitle(property.getTitle());
//        response.setDescription(property.getDescription());
//        response.setPrice(property.getPrice());
//        response.setCity(property.getCity());
//        response.setState(property.getState());
//        response.setPincode(property.getPincode());
//        response.setPropertyType(property.getPropertyType());
//        response.setStatus(property.getStatus());
//        response.setCreatedAt(property.getCreatedAt());
//        
//        response.setSellerId(property.getSeller().getUserId());
//        response.setSellerName(property.getSeller().getName());
//        
//        response.setImages(Collections.emptyList());
//        
//        return response;
//		
//	}
//
//	@Override
//	public Property updateProperty(Long id, Property updatedData, User currentUser) {
//		
//		Property existingProperty = propertyRepository.findById(id)
//                .orElseThrow(() -> new RuntimeException("Property not found"));
//		
//		boolean isAdmin = currentUser.getRole().equals(Role.ADMIN);
//        boolean isOwner = existingProperty.getSeller().getUserId()
//                .equals(currentUser.getUserId());
//        
//        if (!isAdmin && !isOwner) {
//            throw new RuntimeException("You are not allowed to update this property");
//        }
//        
//        if (updatedData.getTitle() != null)
//            existingProperty.setTitle(updatedData.getTitle());
//
//        if (updatedData.getDescription() != null)
//            existingProperty.setDescription(updatedData.getDescription());
//
//        if (updatedData.getPrice() != null)
//            existingProperty.setPrice(updatedData.getPrice());
//
//        if (updatedData.getCity() != null)
//            existingProperty.setCity(updatedData.getCity());
//        
//        if (updatedData.getState() != null)
//            existingProperty.setState(updatedData.getState());
//
//        if (updatedData.getPincode() != null)
//            existingProperty.setPincode(updatedData.getPincode());
//
//        if (updatedData.getPropertyType() != null)
//            existingProperty.setPropertyType(updatedData.getPropertyType());
//
//        if (updatedData.getStatus() != null)
//            existingProperty.setStatus(updatedData.getStatus());
//
//        return propertyRepository.save(existingProperty);
//		
//	}
//
//	@Override
//	public void deleteProperty(Long id, User currentUser) {
//		Property property = propertyRepository.findById(id)
//                .orElseThrow(() -> new RuntimeException("Property not found"));
//		
//		boolean isAdmin = currentUser.getRole().equals(Role.ADMIN);
//        boolean isOwner = property.getSeller().getUserId()
//                .equals(currentUser.getUserId());
//        
//        if (!isAdmin && !isOwner) {
//            throw new RuntimeException("You are not allowed to delete this property");
//        }
//        
//        propertyRepository.delete(property);
//	}
//}
