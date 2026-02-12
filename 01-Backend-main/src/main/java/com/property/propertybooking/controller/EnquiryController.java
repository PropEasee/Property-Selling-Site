package com.property.propertybooking.controller;

import java.util.List;
import java.util.Map;
import com.property.propertybooking.service.LoggingClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.property.propertybooking.dto.EnquiryCreateRequestDto;
import com.property.propertybooking.dto.EnquiryStatusUpdateDto;
import com.property.propertybooking.dto.EnquiryUpdateRequestDto;
import com.property.propertybooking.entity.Enquiry;
import com.property.propertybooking.service.EmailService;
import com.property.propertybooking.service.EnquiryService;

@RestController
@RequestMapping("/api/enquiries")
public class EnquiryController {

    private final LoggingClientService loggingClientService;

    private final EmailService emailService;

    @Autowired
    private EnquiryService enquiryService;

    EnquiryController(EmailService emailService, LoggingClientService loggingClientService) {
        this.emailService = emailService;
        this.loggingClientService = loggingClientService;
    }

    // API 1: Create Enquiry
    
    @PostMapping
    public ResponseEntity<String> createEnquiry(
            @RequestBody EnquiryCreateRequestDto dto) {

        // TEMPORARY buyerId 
        Long buyerId = dto.getUserId();
        Enquiry enquiry = enquiryService.createEnquiry(buyerId, dto);

     // Send email to seller
        try {
            String sellerEmail = enquiry.getProperty().getSeller().getEmail();
            String buyerName = enquiry.getBuyer().getName();
            String buyerEmail = enquiry.getBuyer().getEmail();
            String propertyTitle = enquiry.getProperty().getTitle();
            String message = enquiry.getMessage();

            emailService.sendEnquiryNotificationToSeller(
                sellerEmail, 
                buyerName,
                buyerEmail,
                propertyTitle, 
                message
            );
            

        } catch (Exception e) {
            loggingClientService.sendLog("ERROR", 
                "Enquiry created but email failed: " + e.getMessage());
        }
        
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body("Enquiry created");
    }
    
      // API 2: Get All Enquiries
       @GetMapping
       public ResponseEntity<List<Enquiry>> getAllEnquiries() {

        List<Enquiry> enquiries = enquiryService.getAllEnquiries();

        return ResponseEntity.ok(enquiries);
    }
    
     //API 3: Get enquiry by ID
     // GET /api/enquiries/{id}
    @GetMapping("/{id}")
    public ResponseEntity<Enquiry> getEnquiryById(@PathVariable Long id) {

        Enquiry enquiry = enquiryService.getEnquiryById(id);

        return ResponseEntity.ok(enquiry);
    }
    
    
     // API 4: Update enquiry
     // PUT /api/enquiries/{id}
     @PutMapping("/{id}")
     public ResponseEntity<Enquiry> updateEnquiry(@PathVariable Long id,@RequestBody EnquiryUpdateRequestDto dto) {

     Enquiry updatedEnquiry = enquiryService.updateEnquiry(id, dto);

     return ResponseEntity.ok(updatedEnquiry);
    }
     
     // API 5: Update enquiry status only
    // PATCH /api/enquiries/{id}/status
    @PatchMapping("/{id}/status")
    public ResponseEntity<Enquiry> updateEnquiryStatus(
          @PathVariable Long id,
          @RequestBody EnquiryStatusUpdateDto dto) {

      Enquiry updatedEnquiry = enquiryService.updateEnquiryStatus(id, dto);

      return ResponseEntity.ok(updatedEnquiry);
  }

   //API 6: Delete enquiry
   //DELETE /api/enquiries/{id}
   @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteEnquiry(@PathVariable Long id) {

   enquiryService.deleteEnquiry(id);

   return ResponseEntity.noContent().build(); 
 }
   


   // 1️⃣ Enquiry count for a specific property
   @GetMapping("/property/{propertyId}/count")
   public ResponseEntity<Map<String, Long>> getEnquiryCountByProperty(
           @PathVariable Long propertyId) {

       long count = enquiryService.getEnquiryCountByPropertyId(propertyId);
       return ResponseEntity.ok(Map.of("count", count));
   }

   // 2️⃣ Total enquiry count for seller's all properties
   @GetMapping("/seller/{sellerId}/total-count")
   public ResponseEntity<Map<String, Long>> getTotalEnquiryCountBySeller(
           @PathVariable Long sellerId) {

       long totalCount = enquiryService.getTotalEnquiryCountBySeller(sellerId);
       return ResponseEntity.ok(Map.of("totalCount", totalCount));
   }
}

