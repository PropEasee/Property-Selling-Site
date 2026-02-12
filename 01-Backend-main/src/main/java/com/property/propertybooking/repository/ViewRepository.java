package com.property.propertybooking.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.property.propertybooking.dto.PropertyViewsCountDto;
import com.property.propertybooking.entity.PropertyViews;

public interface ViewRepository extends JpaRepository<PropertyViews, Long>{

	boolean existsByProperty_PropertyIdAndBuyer_UserId(Long propertyId, Long userId);

	Optional<PropertyViews> findFirstByProperty_PropertyIdAndBuyer_UserId(Long propertyId, Long userId);
	
	List<PropertyViews> findByProperty_PropertyId(Long propertyId);
	
	@Query("SELECT new com.property.propertybooking.dto.PropertyViewsCountDto(" +
			           "p.propertyId, p.title, COUNT(v)) " +
			           "FROM PropertyViews v JOIN v.property p " +
			           "WHERE p.seller.userId = :sellerId " +
			           "GROUP BY p.propertyId, p.title")
			    List<PropertyViewsCountDto> countViewsBySellerProperties(@Param("sellerId") Long sellerId);

}
