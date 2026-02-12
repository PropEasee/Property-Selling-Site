package com.property.propertybooking.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.Data;

@Data
@Entity
@Table(name = "property_views", uniqueConstraints = @UniqueConstraint(columnNames = {"property_id", "user_id"}))
public class PropertyViews {
	
	 @Id
	 @GeneratedValue(strategy = GenerationType.IDENTITY)
	 @Column(name = "view_id")
	 private Long id;
	 
	 @ManyToOne
	 @JoinColumn(name = "property_id", nullable = false)
	 private Property property;
	 
	 @ManyToOne
	 @JoinColumn(name = "user_id", nullable = false)
	 private User buyer;
	 
	 @Column(name = "viewed_at", updatable = false)
	 private LocalDateTime createdAt = LocalDateTime.now();
}
