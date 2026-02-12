package com.property.propertybooking.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.property.propertybooking.entity.Enquiry;

public interface EnquiryRepository extends JpaRepository<Enquiry, Long> {
	
	 // 1️⃣ Count enquiries for a specific property
    long countByProperty_PropertyId(Long propertyId);

    // 2️⃣ Count all enquiries for all properties of a seller
    @Query("""
        SELECT COUNT(e)
        FROM Enquiry e
        WHERE e.property.seller.userId = :sellerId
    """)
    long countAllEnquiriesBySellerId(Long sellerId);}
