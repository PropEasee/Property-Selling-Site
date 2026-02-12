package com.property.propertybooking.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.property.propertybooking.entity.Property;
import com.property.propertybooking.entity.PropertyImage;
import com.property.propertybooking.repository.PropertyImageRepository;
import com.property.propertybooking.repository.PropertyRepository;

@Service
public class PropertyImageService {

    private final PropertyImageRepository repository;
    private final PropertyRepository propertyRepository;
    private final CloudinaryService cloudinaryService;

    public PropertyImageService(PropertyImageRepository repository,
                                CloudinaryService cloudinaryService,
                                PropertyRepository propertyRepository) {
        this.repository = repository;
        this.cloudinaryService = cloudinaryService;
        this.propertyRepository =  propertyRepository;
    }

    public List<String> uploadAndSaveImages(
            Long propertyId,
            MultipartFile[] files) {

        List<String> urls = new ArrayList<>();
        
        Property property = propertyRepository.findById(propertyId)
                .orElseThrow(() -> new RuntimeException("Property not found"));
        for (MultipartFile file : files) {
            // 1. Upload to Cloudinary
            String url = cloudinaryService.uploadImage(file);

            // 2. Save to DB
            PropertyImage image = new PropertyImage();
            image.setProperty(property);
            image.setImageUrl(url);
            repository.save(image);

            urls.add(url);
        }

        return urls;
    }
}
