package com.property.propertybooking.controller;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.property.propertybooking.dto.UpdateuserRequest;
import com.property.propertybooking.entity.Role;
import com.property.propertybooking.entity.User;
import com.property.propertybooking.service.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // 🔹 GET user by ID (ADMIN, OWNER)
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','SELLER','BUYER')")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }
    
    
 // 🔹 UPDATE user (ADMIN, OWNER)
    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','SELLER','BUYER')")
    public ResponseEntity<User> updateUser(
            @PathVariable Long id,
            @RequestBody UpdateuserRequest request) {

        return ResponseEntity.ok(userService.updateUser(id, request));
    }

    // 🔹 GET all users with pagination (ADMIN)
    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<Page<User>> getAllUsers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) Role role) {

        return ResponseEntity.ok(
                userService.getAllUsers(page, size, search, role)
        );
    }

    // 🔹 DELETE user (ADMIN)
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.ok("User deleted successfully");
    }
}