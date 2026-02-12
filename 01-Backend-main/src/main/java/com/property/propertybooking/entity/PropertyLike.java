package com.property.propertybooking.entity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Getter
@Setter
@Table(name = "property_likes", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"buyer_id", "property_id"})
})
public class PropertyLike {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "like_id")
    private Long likeId;

    @ManyToOne
    @JoinColumn(name = "buyer_id", nullable = false)
    private User buyer;

    @ManyToOne
    @JoinColumn(name = "property_id", nullable = false)
    private Property property;

    @Column(name = "liked_at", updatable = false)
    private LocalDateTime likedAt = LocalDateTime.now();
}
