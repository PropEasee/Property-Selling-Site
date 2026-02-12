package com.property.propertybooking.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdminStatsResponse {
	
	// This DTO is used to send dashboard statistics to frontend


	    // User counts
	    private long adminUsers;
	    private long ownerUsers;
	    private long normalUsers;

	    // Property counts
	    private long approvedProperties;
	    private long pendingProperties;
	    private long rejectedProperties;

	    // Enquiry count
	    private long totalEnquiries;

	    // getters and setters
	


}
