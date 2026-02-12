package com.property.propertybooking.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Getter
@Setter
@Entity
@Table(name = "properties")
public class Property {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "property_id")
    private Long propertyId;

    @Column(nullable = false, length = 150)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal price;

    @Column(nullable = false, length = 100)
    private String city;

    @Column(nullable = false, length = 100)
    private String state;

    @Column(length = 10)
    private String pincode;

    @Enumerated(EnumType.STRING)
    @Column(name = "property_type", nullable = false)
    private PropertyType propertyType;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PropertyStatus status = PropertyStatus.AVAILABLE;

    @ManyToOne
    @JoinColumn(name = "seller_id", nullable = false)
    private User seller;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @OneToMany(mappedBy = "property", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties("property")
    private List<PropertyImage> images;

    @OneToMany(mappedBy = "property", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties("property")
    private List<Enquiry> enquiries;

    @OneToMany(mappedBy = "property", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties("property")
    private List<PropertyViews> propertyViews;
}
