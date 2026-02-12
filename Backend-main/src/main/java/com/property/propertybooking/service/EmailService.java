package com.property.propertybooking.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendEnquiryNotificationToSeller(String sellerEmail, String buyerName, String buyerEmail,
            String propertyTitle, String enquiryMessage) {
        try {
        	// Validate email is not null or empty
            if (sellerEmail == null || sellerEmail.trim().isEmpty()) {
                log.error("Seller email is null or empty");
                return;
            }
        	
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(sellerEmail);
            message.setSubject("New Enquiry for Property: " + propertyTitle);
            message.setText(buildEmailBody(buyerName,buyerEmail, propertyTitle, enquiryMessage));
            message.setFrom("propease7@gmail.com");

            mailSender.send(message);
            log.info("Email sent successfully to: " + sellerEmail);
        } catch (Exception e) {
            log.error("Failed to send email to: " + sellerEmail + " - " + e.getMessage());
        }
    }

    private String buildEmailBody(String buyerName, String buyerEmail, String propertyTitle, String enquiryMessage) {
        return "Hello,\n\n" +
                "You have received a new enquiry for your property.\n\n" +
                "Property: " + propertyTitle + "\n" +
                "Buyer Name: " + buyerName + "\n" +
                "Buyer Email: " + buyerEmail + "\n" +
                "Message: " + enquiryMessage + "\n\n" +
                "Please log in to your dashboard to view full details and respond.\n\n" +
                "Best regards,\n" +
                "Property Booking Team";
    }
}