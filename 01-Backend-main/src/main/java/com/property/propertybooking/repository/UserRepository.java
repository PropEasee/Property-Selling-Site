package com.property.propertybooking.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import com.property.propertybooking.entity.Role;
import com.property.propertybooking.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    
    
    
    

    // Filter users by role (pagination)
    Page<User> findByRole(Role role, PageRequest pageable);

    
    
	// Search users by name (pagination)
	Page<User> findByNameContainingIgnoreCase(String search, PageRequest pageable);


// Count users by role (ADMIN / OWNER / USER)
    // Used in Admin Dashboard stats
    long countByRole(Role role);


}
