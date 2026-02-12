package com.property.propertybooking.dto;


import com.property.propertybooking.entity.Role;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterRequest {
	  private String name;
	    private String email;
	    private String password;
	    private String phone;
	    private Role role;
	    
		public String getEmail() {
			// TODO Auto-generated method stub
			return email;
		}
}
