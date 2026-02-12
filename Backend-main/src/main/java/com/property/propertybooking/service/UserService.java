package com.property.propertybooking.service;

import com.property.propertybooking.dto.RegisterRequest;
import com.property.propertybooking.dto.UpdateuserRequest;
import com.property.propertybooking.entity.Role;
import com.property.propertybooking.entity.User;
import com.property.propertybooking.repository.UserRepository;

import org.springframework.boot.data.autoconfigure.web.DataWebProperties.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User register(RegisterRequest request) {

        userRepository.findByEmail(request.getEmail())
                .ifPresent(u -> {
                    throw new RuntimeException("Email already registered");
                });

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPhone(request.getPhone());
        user.setRole(request.getRole());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        return userRepository.save(user);
    }

    // find user by email (used by authentication flows)
    public User findByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
    
    
    
 // 1 GET user by ID
    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
    
 //  UPDATE user
    public User updateUser(Long id, UpdateuserRequest request) {
        User user = getUserById(id);

        user.setName(request.getName());
        user.setPhone(request.getPhone());

        if (request.getPassword() != null && !request.getPassword().isEmpty()) {
            user.setPassword(passwordEncoder.encode(request.getPassword()));
        }

        return userRepository.save(user);
    }

    //  GET all users with pagination (ADMIN)
    public Page<User> getAllUsers(
            int page,
            int size,
            String search,
            Role role) {

        PageRequest pageable = PageRequest.of(page, size);

        if (search != null && !search.isEmpty()) {
            return userRepository.findByNameContainingIgnoreCase(search, pageable);
        }

        if (role != null) {
            return userRepository.findByRole(role, pageable);
        }

        return userRepository.findAll(pageable);
    }

    //  DELETE user (ADMIN)
    public void deleteUser(Long id) {
        User user = getUserById(id);
        userRepository.delete(user);
    }
}
