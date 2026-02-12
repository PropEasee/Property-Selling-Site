package com.property.propertybooking.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.property.propertybooking.service.BuyerService;

@RestController
@RequestMapping("/api/buyer")
public class BuyerController {

    private final BuyerService buyerService;

    public BuyerController(BuyerService buyerService) {
        this.buyerService = buyerService;
    }

    // ✅ API: total views by buyer
    @GetMapping("/{buyerId}/views/count")
    public ResponseEntity<Map<String, Long>> getTotalViewsByBuyer(
            @PathVariable Long buyerId) {

        long count = buyerService.getTotalViewsByBuyer(buyerId);
        return ResponseEntity.ok(Map.of("totalViews", count));
    }
}
