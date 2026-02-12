package com.property.propertybooking.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.property.propertybooking.dto.EnquiryCreateRequestDto;
import com.property.propertybooking.dto.EnquiryStatusUpdateDto;
import com.property.propertybooking.dto.EnquiryUpdateRequestDto;
import com.property.propertybooking.entity.Enquiry;
import com.property.propertybooking.entity.EnquiryStatus;
import com.property.propertybooking.entity.Property;
import com.property.propertybooking.entity.User;
import com.property.propertybooking.repository.EnquiryRepository;
import com.property.propertybooking.repository.PropertyRepository;
import com.property.propertybooking.repository.UserRepository;

@Service
public class EnquiryService {

    @Autowired
    private EnquiryRepository enquiryRepository;

    @Autowired
    private PropertyRepository propertyRepository;

    @Autowired
    private UserRepository userRepository;

    // API 1: Create Enquiry
    public Enquiry createEnquiry(Long buyerId, EnquiryCreateRequestDto dto) {

    	// Fetch property
        Property property = propertyRepository.findById(dto.getPropertyId())
                .orElseThrow(() -> new RuntimeException("Property not found"));

        // Fetch buyer
        User buyer = userRepository.findById(buyerId)
                .orElseThrow(() -> new RuntimeException("Buyer not found"));
     // Create enquiry
        Enquiry enquiry = new Enquiry();
        enquiry.setProperty(property);
        enquiry.setBuyer(buyer);
        enquiry.setMessage(dto.getMessage());
        enquiry.setStatus(EnquiryStatus.OPEN);

     // Save enquiry
        return enquiryRepository.save(enquiry);
    }

    // API 2: Get all enquiries
    public List<Enquiry> getAllEnquiries() {
        return enquiryRepository.findAll();
    }
    
    
    // API 3: Get enquiry by ID
    public Enquiry getEnquiryById(Long enquiryId) {
        return enquiryRepository.findById(enquiryId)
                .orElseThrow(() -> new RuntimeException("Enquiry not found"));
    }

    // API 4: Update enquiry
    public Enquiry updateEnquiry(Long enquiryId, EnquiryUpdateRequestDto dto) {

        //Fetch enquiry
        Enquiry enquiry = enquiryRepository.findById(enquiryId)
                .orElseThrow(() -> new RuntimeException("Enquiry not found"));

        //Update message 
        if (dto.getMessage() != null) {
            enquiry.setMessage(dto.getMessage());
        }

        // Update status 
        if (dto.getStatus() != null) {
            enquiry.setStatus(dto.getStatus());
        }

        // Save
        return enquiryRepository.save(enquiry);
    }
    
    // API 5: Update enquiry status only
     public Enquiry updateEnquiryStatus(Long enquiryId, EnquiryStatusUpdateDto dto) {

        // Find enquiry
        Enquiry enquiry = enquiryRepository.findById(enquiryId)
                .orElseThrow(() -> new RuntimeException("Enquiry not found"));

        // Update status
        enquiry.setStatus(dto.getStatus());

        // Save updated enquiry
        return enquiryRepository.save(enquiry);
    }
     
    // API 6: Delete enquiry
     public void deleteEnquiry(Long enquiryId) {

         // Check if enquiry exists
         Enquiry enquiry = enquiryRepository.findById(enquiryId)
                 .orElseThrow(() -> new RuntimeException("Enquiry not found"));

         // Delete enquiry
         enquiryRepository.delete(enquiry);
     }
     
     // Count enquiries for one property
     public long getEnquiryCountByPropertyId(Long propertyId) {
         return enquiryRepository.countByProperty_PropertyId(propertyId);
     }

     // Count enquiries for all properties of seller
     public long getTotalEnquiryCountBySeller(Long sellerId) {
         return enquiryRepository.countAllEnquiriesBySellerId(sellerId);
     }

}
