package com.property.propertybooking.controller;

import com.property.propertybooking.dto.LoginRequest;
import com.property.propertybooking.dto.LoginResponse;
import com.property.propertybooking.dto.RegisterRequest;
import com.property.propertybooking.entity.User;
import com.property.propertybooking.security.JwtUtil;
import com.property.propertybooking.service.AuthService;
import com.property.propertybooking.service.UserService;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.*;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import lombok.Data;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

	 private final UserService userService;
	    private final AuthService authService;

	    public AuthController(UserService userService, AuthService authService) {
	        this.userService = userService;
	        this.authService = authService;
	    }
	    
	    @Autowired
	    private AuthenticationManager authenticationManager;

	    @Autowired
	    private JwtUtil jwtUtil;

	    @PostMapping("/register")
	    public User register(@Valid @RequestBody RegisterRequest request) {
	        return userService.register(request);
	    }

	    @PostMapping("/login")
	    public TokenResponse login(@RequestBody LoginRequest req) {
	        Authentication auth = authenticationManager.authenticate(
	                new UsernamePasswordAuthenticationToken(req.email, req.password));
	        String token = jwtUtil.generateToken(req.email);
			User user = userService.findByEmail(req.email);
	        return new TokenResponse(token, user);
	    }
	    
	    @Data static class LoginRequest { private String email ; private String password; }
	    @Data static class TokenResponse { private final String token; private final User user; }
}
