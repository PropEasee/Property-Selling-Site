/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';

export default function SellerPropertiesList() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
 
   const [filter, setFilter] = useState("All");
 
   const filteredProperties = filter === "All" 
     ? properties 
     : properties.filter(prop => prop.status === filter);
 
   const getSellerIdFromStorage = () => {
     try {
       const st = localStorage.getItem('user');
       if (!st) return null;
       const u = JSON.parse(st);
       return u?.id ?? u?.userId ?? u?.sellerId ?? null;
     } catch {
       return null;
     }
   };

   const handleView = (id) => {
    window.location.href = `/PropertyDetailsPage/${id}`;
  };

  const handleEdit = (id) => {
    window.location.href = `/AddProperty?edit=${id}`;
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this property?')) return;
    try {
      const res = await fetch(`http://localhost:8080/api/properties/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error(`Delete failed: ${res.status}`);
      setProperties(prev => prev.filter(p => p.id !== id));
    } catch (e) {
      // simple error feedback
      alert(e.message || 'Failed to delete');
    }
  };
 
   useEffect(() => {
     const load = async () => {
       setLoading(true);
       setError('');
       const sellerId = getSellerIdFromStorage();
       if (!sellerId) {
         setError('Seller ID not found. Please login as a seller.');
         setLoading(false);
         return;
       }
 
       try {
         const res = await fetch(`http://localhost:8080/api/properties/seller/${sellerId}`);
         if (!res.ok) throw new Error(`Failed to load properties: ${res.status}`);
         const data = await res.json();
 
         const mapped = (Array.isArray(data) ? data : []).map(item => ({
           id: item.propertyId,
           title: item.title,
           address: `${item.city ?? ''}${item.city && item.state ? ', ' : ''}${item.state ?? ''}${item.pincode ? ' - ' + item.pincode : ''}`,
           price: `₹${Number(item.price ?? 0).toLocaleString('en-IN')}`,
           bedrooms: item.bedrooms ?? '-',
           bathrooms: item.bathrooms ?? '-',
           sqft: item.sqft ?? '-',
           status: item.status === 'AVAILABLE' ? 'Active' : item.status === 'SOLD' ? 'Sold' : 'Pending',
           views: item.views ?? 0,
           inquiries: item.inquiries ?? 0,
           image: item.imageUrl || 'https://via.placeholder.com/800x600?text=No+Image'
         }));
 
         setProperties(mapped);
       } catch (err) {
         setError(err?.message || 'Error loading properties');
       } finally {
         setLoading(false);
       }
     };
     load();
   }, []);
 
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
                <a href="AddProperty"><button className="btn-add-property">
                  <i className="fas fa-plus me-2"></i>
                  Add New Property
                </button>
                </a>
              </div>
            </div>

            {/* Properties Grid */}
            <div className="row">
              {loading && <div className="col-12" style={{ padding: 20 }}>Loading properties...</div>}
              {error && <div className="col-12" style={{ padding: 20, color: 'red' }}>{error}</div>}
              {!loading && !error && filteredProperties.map(property => (
                 <div key={property.id} className="col-lg-6">
                   <div className="property-card">
                     <img src={property.image} alt={property.title} className="property-image" />
                     <div className="property-content">
                      {/* <span className={`status-badge ₹{property.status.toLowerCase()}`}> */}
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

                       {/* Action buttons */}
                       <div className="property-actions" style={{ marginTop: 10 }}>
                         <button className="btn-action btn-view" onClick={() => handleView(property.id)}>View</button>
                         <button className="btn-action btn-edit" onClick={() => handleEdit(property.id)}>Edit</button>
                         <button className="btn-action btn-delete" onClick={() => handleDelete(property.id)}>Delete</button>
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