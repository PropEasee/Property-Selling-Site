package com.property.propertybooking.service;

import org.springframework.stereotype.Service;

import com.property.propertybooking.repository.PropertyViewRepository;

@Service
public class BuyerService {

    private final PropertyViewRepository propertyViewRepository;

    public BuyerService(PropertyViewRepository propertyViewRepository) {
        this.propertyViewRepository = propertyViewRepository;
    }

    // ✅ Total views done by buyer
    public long getTotalViewsByBuyer(Long buyerId) {
        return propertyViewRepository.countByBuyer_UserId(buyerId);
    }
}
