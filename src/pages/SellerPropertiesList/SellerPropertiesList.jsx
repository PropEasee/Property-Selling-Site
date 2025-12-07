/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

export default function SellerPropertiesList() {
  const [properties, setProperties] = useState([
    {
      id: 1,
      title: "Modern Family Home",
      address: "123 Oak Street, New York, NY",
      price: "$450,000",
      bedrooms: 4,
      bathrooms: 3,
      sqft: "2,500",
      status: "Active",
      views: 245,
      inquiries: 12,
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop&q=80"
    },
    {
      id: 2,
      title: "Downtown Luxury Condo",
      address: "456 Park Avenue, New York, NY",
      price: "$625,000",
      bedrooms: 2,
      bathrooms: 2,
      sqft: "1,800",
      status: "Pending",
      views: 189,
      inquiries: 8,
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop&q=80"
    },
    {
      id: 3,
      title: "Cozy Suburban House",
      address: "789 Maple Drive, Brooklyn, NY",
      price: "$380,000",
      bedrooms: 3,
      bathrooms: 2,
      sqft: "1,900",
      status: "Active",
      views: 312,
      inquiries: 15,
      image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&h=600&fit=crop&q=80"
    },
    {
      id: 4,
      title: "Elegant Victorian Estate",
      address: "321 Elm Street, Queens, NY",
      price: "$825,000",
      bedrooms: 5,
      bathrooms: 4,
      sqft: "3,400",
      status: "Sold",
      views: 567,
      inquiries: 28,
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop&q=80"
    },
    {
      id: 5,
      title: "Waterfront Villa",
      address: "555 Beach Road, Long Island, NY",
      price: "$1,250,000",
      bedrooms: 6,
      bathrooms: 5,
      sqft: "4,800",
      status: "Active",
      views: 423,
      inquiries: 22,
      image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&h=600&fit=crop&q=80"
    },
    {
      id: 6,
      title: "Urban Studio Apartment",
      address: "88 Broadway, Manhattan, NY",
      price: "$295,000",
      bedrooms: 1,
      bathrooms: 1,
      sqft: "850",
      status: "Active",
      views: 178,
      inquiries: 9,
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop&q=80"
    },
    {
      id: 7,
      title: "Contemporary Townhouse",
      address: "432 Greenwich Ave, Brooklyn, NY",
      price: "$780,000",
      bedrooms: 3,
      bathrooms: 3,
      sqft: "2,200",
      status: "Pending",
      views: 294,
      inquiries: 18,
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop&q=80"
    },
    {
      id: 8,
      title: "Mountain View Retreat",
      address: "777 Highland Drive, Upstate NY",
      price: "$520,000",
      bedrooms: 4,
      bathrooms: 3,
      sqft: "3,000",
      status: "Active",
      views: 356,
      inquiries: 16,
      image: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=800&h=600&fit=crop&q=80"
    }
  ]);

  const [filter, setFilter] = useState("All");

  const filteredProperties = filter === "All" 
    ? properties 
    : properties.filter(prop => prop.status === filter);

  return (
    <>
      <link 
        href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.2/css/bootstrap.min.css" 
        rel="stylesheet"
      />
      <link 
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" 
        rel="stylesheet"
      />
      
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          background-color: #f9fafb;
        }

        .header {
          background: white;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          padding: 1rem 0;
        }

        .logo-circle {
          width: 40px;
          height: 40px;
          background: #3b82f6;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .logo-circle-inner {
          width: 24px;
          height: 24px;
          border: 2px solid white;
          border-radius: 50%;
        }

        .nav-link {
          color: #374151;
          font-weight: 500;
          font-size: 0.875rem;
          text-decoration: none;
          margin: 0 1rem;
          transition: color 0.3s;
        }

        .nav-link:hover {
          color: #3b82f6;
        }

        .btn-login {
          border: 2px solid #3b82f6;
          color: #3b82f6;
          border-radius: 50px;
          padding: 0.5rem 1.5rem;
          font-weight: 500;
          font-size: 0.875rem;
          transition: all 0.3s;
          background: transparent;
        }

        .btn-login:hover {
          background: #3b82f6;
          color: white;
        }

        .page-header {
          background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 50%, #1e40af 100%);
          color: white;
          padding: 3rem 0;
          position: relative;
          overflow: hidden;
        }

        .page-header::before {
          content: '';
          position: absolute;
          top: 20px;
          right: 20px;
          width: 200px;
          height: 200px;
          background: rgba(255,255,255,0.1);
          border-radius: 50%;
          filter: blur(60px);
        }

        .page-header h1 {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .page-header p {
          font-size: 1rem;
          color: #bfdbfe;
        }

        .stats-cards {
          margin-top: -50px;
          position: relative;
          z-index: 10;
          margin-bottom: 2rem;
        }

        .stat-card {
          background: white;
          border-radius: 1rem;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          padding: 1.5rem;
          transition: all 0.3s;
        }

        .stat-card:hover {
          box-shadow: 0 15px 40px rgba(0,0,0,0.15);
          transform: translateY(-3px);
        }

        .stat-card .stat-icon {
          width: 48px;
          height: 48px;
          border-radius: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          margin-bottom: 1rem;
        }

        .stat-card.blue .stat-icon {
          background: #dbeafe;
          color: #3b82f6;
        }

        .stat-card.green .stat-icon {
          background: #d1fae5;
          color: #059669;
        }

        .stat-card.orange .stat-icon {
          background: #fed7aa;
          color: #ea580c;
        }

        .stat-card.purple .stat-icon {
          background: #e9d5ff;
          color: #9333ea;
        }

        .stat-card h3 {
          font-size: 2rem;
          font-weight: 700;
          color: #111827;
          margin-bottom: 0.25rem;
        }

        .stat-card p {
          color: #6b7280;
          font-size: 0.875rem;
          margin: 0;
        }

        .content-section {
          padding: 2rem 0 4rem 0;
        }

        .filter-bar {
          background: white;
          border-radius: 1rem;
          padding: 1.5rem;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
          margin-bottom: 2rem;
        }

        .filter-btn {
          border: 2px solid #e5e7eb;
          background: white;
          color: #6b7280;
          border-radius: 0.5rem;
          padding: 0.5rem 1.25rem;
          font-weight: 500;
          font-size: 0.875rem;
          margin-right: 0.75rem;
          margin-bottom: 0.5rem;
          transition: all 0.3s;
          cursor: pointer;
        }

        .filter-btn:hover {
          border-color: #3b82f6;
          color: #3b82f6;
        }

        .filter-btn.active {
          background: #3b82f6;
          color: white;
          border-color: #3b82f6;
        }

        .btn-add-property {
          background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%);
          color: white;
          border: none;
          border-radius: 0.5rem;
          padding: 0.65rem 1.5rem;
          font-weight: 600;
          font-size: 0.875rem;
          transition: all 0.3s;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
          cursor: pointer;
        }

        .btn-add-property:hover {
          box-shadow: 0 6px 16px rgba(59, 130, 246, 0.4);
          transform: translateY(-2px);
        }

        .property-card {
          background: white;
          border-radius: 1rem;
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
          overflow: hidden;
          transition: all 0.3s;
          margin-bottom: 1.5rem;
        }

        .property-card:hover {
          box-shadow: 0 8px 24px rgba(0,0,0,0.12);
          transform: translateY(-3px);
        }

        .property-image {
          width: 100%;
          height: 200px;
          object-fit: cover;
        }

        .property-content {
          padding: 1.5rem;
        }

        .status-badge {
          display: inline-block;
          padding: 0.375rem 0.875rem;
          border-radius: 50px;
          font-size: 0.75rem;
          font-weight: 600;
          margin-bottom: 0.75rem;
        }

        .status-badge.active {
          background: #d1fae5;
          color: #065f46;
        }

        .status-badge.pending {
          background: #fed7aa;
          color: #9a3412;
        }

        .status-badge.sold {
          background: #e9d5ff;
          color: #6b21a8;
        }

        .property-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #111827;
          margin-bottom: 0.5rem;
        }

        .property-address {
          color: #6b7280;
          font-size: 0.875rem;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
        }

        .property-address i {
          margin-right: 0.5rem;
          color: #3b82f6;
        }

        .property-price {
          font-size: 1.5rem;
          font-weight: 700;
          color: #3b82f6;
          margin-bottom: 1rem;
        }

        .property-details {
          display: flex;
          gap: 1.5rem;
          margin-bottom: 1rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #e5e7eb;
        }

        .detail-item {
          display: flex;
          align-items: center;
          color: #6b7280;
          font-size: 0.875rem;
        }

        .detail-item i {
          margin-right: 0.5rem;
          color: #3b82f6;
        }

        .property-stats {
          display: flex;
          justify-content: space-between;
          margin-bottom: 1rem;
        }

        .stat-item {
          text-align: center;
        }

        .stat-item .stat-number {
          font-size: 1.25rem;
          font-weight: 700;
          color: #111827;
        }

        .stat-item .stat-label {
          font-size: 0.75rem;
          color: #6b7280;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .property-actions {
          display: flex;
          gap: 0.75rem;
        }

        .btn-action {
          flex: 1;
          padding: 0.65rem;
          border-radius: 0.5rem;
          font-weight: 600;
          font-size: 0.875rem;
          transition: all 0.3s;
          cursor: pointer;
          border: none;
        }

        .btn-edit {
          background: #eff6ff;
          color: #3b82f6;
        }

        .btn-edit:hover {
          background: #dbeafe;
        }

        .btn-delete {
          background: #fef2f2;
          color: #dc2626;
        }

        .btn-delete:hover {
          background: #fee2e2;
        }

        .btn-view {
          background: #f0fdf4;
          color: #16a34a;
        }

        .btn-view:hover {
          background: #dcfce7;
        }

        @media (max-width: 768px) {
          .page-header h1 {
            font-size: 2rem;
          }
          .property-details {
            flex-wrap: wrap;
            gap: 1rem;
          }
          .filter-btn {
            margin-right: 0.5rem;
          }
        }
      `}</style>

      <div style={{ backgroundColor: '#f9fafb', minHeight: '100vh' }}>
        {/* Page Header */}
        <section className="page-header">
          <div className="container">
            <h1>My Properties</h1>
            <p>Manage and track all your property listings in one place</p>
          </div>
        </section>

        {/* Stats Cards */}
        <section className="stats-cards">
          <div className="container">
            <div className="row g-4">
              <div className="col-md-6 col-lg-3">
                <div className="stat-card blue">
                  <div className="stat-icon">
                    <i className="fas fa-home"></i>
                  </div>
                  <h3>8</h3>
                  <p>Total Properties</p>
                </div>
              </div>
              <div className="col-md-6 col-lg-3">
                <div className="stat-card green">
                  <div className="stat-icon">
                    <i className="fas fa-check-circle"></i>
                  </div>
                  <h3>5</h3>
                  <p>Active Listings</p>
                </div>
              </div>
              <div className="col-md-6 col-lg-3">
                <div className="stat-card orange">
                  <div className="stat-icon">
                    <i className="fas fa-clock"></i>
                  </div>
                  <h3>2</h3>
                  <p>Pending Sales</p>
                </div>
              </div>
              <div className="col-md-6 col-lg-3">
                <div className="stat-card purple">
                  <div className="stat-icon">
                    <i className="fas fa-dollar-sign"></i>
                  </div>
                  <h3>1</h3>
                  <p>Sold Properties</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="content-section">
          <div className="container">
            {/* Filter Bar */}
            <div className="filter-bar">
              <div className="d-flex justify-content-between align-items-center flex-wrap">
                <div>
                  <button 
                    className={`filter-btn ${filter === 'All' ? 'active' : ''}`}
                    onClick={() => setFilter('All')}
                  >
                    All Properties
                  </button>
                  <button 
                    className={`filter-btn ${filter === 'Active' ? 'active' : ''}`}
                    onClick={() => setFilter('Active')}
                  >
                    Active
                  </button>
                  <button 
                    className={`filter-btn ${filter === 'Pending' ? 'active' : ''}`}
                    onClick={() => setFilter('Pending')}
                  >
                    Pending
                  </button>
                  <button 
                    className={`filter-btn ${filter === 'Sold' ? 'active' : ''}`}
                    onClick={() => setFilter('Sold')}
                  >
                    Sold
                  </button>
                </div>
                <button className="btn-add-property">
                  <i className="fas fa-plus me-2"></i>
                  Add New Property
                </button>
              </div>
            </div>

            {/* Properties Grid */}
            <div className="row">
              {filteredProperties.map(property => (
                <div key={property.id} className="col-lg-6">
                  <div className="property-card">
                    <img src={property.image} alt={property.title} className="property-image" />
                    <div className="property-content">
                      <span className={`status-badge ${property.status.toLowerCase()}`}>
                        {property.status}
                      </span>
                      <h3 className="property-title">{property.title}</h3>
                      <p className="property-address">
                        <i className="fas fa-map-marker-alt"></i>
                        {property.address}
                      </p>
                      <div className="property-price">{property.price}</div>
                      <div className="property-details">
                        <div className="detail-item">
                          <i className="fas fa-bed"></i>
                          <span>{property.bedrooms} Beds</span>
                        </div>
                        <div className="detail-item">
                          <i className="fas fa-bath"></i>
                          <span>{property.bathrooms} Baths</span>
                        </div>
                        <div className="detail-item">
                          <i className="fas fa-ruler-combined"></i>
                          <span>{property.sqft} sqft</span>
                        </div>
                      </div>
                      <div className="property-stats">
                        <div className="stat-item">
                          <div className="stat-number">{property.views}</div>
                          <div className="stat-label">Views</div>
                        </div>
                        <div className="stat-item">
                          <div className="stat-number">{property.inquiries}</div>
                          <div className="stat-label">Inquiries</div>
                        </div>
                      </div>
                      <div className="property-actions">
                        <button className="btn-action btn-view">
                          <i className="fas fa-eye me-1"></i> View
                        </button>
                        <button className="btn-action btn-edit">
                          <i className="fas fa-edit me-1"></i> Edit
                        </button>
                        <button className="btn-action btn-delete">
                          <i className="fas fa-trash me-1"></i> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}