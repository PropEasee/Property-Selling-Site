import React, { useState, useEffect } from 'react';
import {
  Search, ChevronLeft, ChevronRight, MapPin
} from 'lucide-react';

const API_BASE_URL = 'http://localhost:8080/api/admin';

export default function AdminPropertyList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPropertyType, setFilterPropertyType] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [viewType, setViewType] = useState('table');
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const itemsPerPage = 10;

  // Fetch properties from backend
  useEffect(() => {
    fetchProperties(searchTerm);
  }, [searchTerm]);

  const fetchProperties = async (search = '') => {
    try {
      setLoading(true);
      setError(null);
      const url = search
        ? `${API_BASE_URL}/properties?search=${encodeURIComponent(search)}`
        : `${API_BASE_URL}/properties`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch properties');
      }
      const data = await response.json();
      setProperties(data);
    } catch (err) {
      setError(err.message || 'Error fetching properties');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to safely get seller name
  const getSellerName = (seller) => {
    if (!seller) return 'N/A';
    if (typeof seller === 'string') return seller;
    if (seller.name) return seller.name;
    if (seller.email) return seller.email;
    return 'N/A';
  };

  // Format location from city, state, pincode
  const getLocation = (property) => {
    const parts = [];
    if (property.city) parts.push(property.city);
    if (property.state) parts.push(property.state);
    if (property.pincode) parts.push(property.pincode);
    return parts.length > 0 ? parts.join(', ') : 'N/A';
  };

  // Format date helper
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return 'N/A';
    }
  };

  // Format status - convert AVAILABLE to Available, etc.
  const formatStatus = (status) => {
    if (!status) return 'Pending';
    return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
  };

  // Filter properties
  const filteredProperties = properties.filter(property => {
    const sellerName = getSellerName(property.seller);
    const location = getLocation(property);
    const matchesSearch = property.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sellerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || property.status === filterStatus;
    const matchesType = filterPropertyType === 'all' || property.propertyType === filterPropertyType;
    return matchesSearch && matchesStatus && matchesType;
  });

  // Pagination
  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProperties = filteredProperties.slice(startIndex, startIndex + itemsPerPage);

  const handleForceStatus = async (propertyId, newStatus) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/properties/${propertyId}/force-status`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status: newStatus })
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update property status');
      }

      const updatedProperty = await response.json();
      setProperties(properties.map(p => p.propertyId === propertyId ? updatedProperty : p));
      alert('✅ Property status updated successfully');
    } catch (err) {
      alert(`❌ Error: ${err.message}`);
      console.error('Update error:', err);
    }
  };

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
          background-color: #f8f9fa;
        }

        .property-list-container {
          padding: 2rem 0;
          min-height: 100vh;
          background-color: #f8f9fa;
        }

        .page-header {
          margin-bottom: 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .header-title h1 {
          font-size: 2rem;
          font-weight: 700;
          color: #212529;
          margin: 0;
        }

        .header-title p {
          color: #6c757d;
          font-size: 0.95rem;
          margin: 0.5rem 0 0 0;
        }

        .controls-card {
          background: white;
          border-radius: 1rem;
          padding: 1.5rem;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
          margin-bottom: 2rem;
        }

        .controls-grid {
          display: grid;
          grid-template-columns: 1fr auto auto auto;
          gap: 1rem;
          align-items: end;
        }

        .search-wrapper {
          display: flex;
          align-items: center;
          position: relative;
        }

        .search-wrapper svg {
          position: absolute;
          left: 12px;
          color: #6c757d;
        }

        .search-input {
          width: 100%;
          padding: 0.75rem 1rem 0.75rem 2.5rem;
          border: 1px solid #ced4da;
          border-radius: 0.5rem;
          font-size: 0.95rem;
          transition: all 0.3s;
        }

        .search-input:focus {
          outline: none;
          border-color: #007bff;
          box-shadow: 0 0 0 0.2rem rgba(0,123,255,0.25);
        }

        .filter-select {
          padding: 0.75rem 1rem;
          border: 1px solid #ced4da;
          border-radius: 0.5rem;
          font-size: 0.95rem;
          background: white;
          cursor: pointer;
          transition: all 0.3s;
        }

        .filter-select:focus {
          outline: none;
          border-color: #007bff;
          box-shadow: 0 0 0 0.2rem rgba(0,123,255,0.25);
        }

        .view-toggle {
          display: flex;
          gap: 0.5rem;
        }

        .view-btn {
          width: 40px;
          height: 40px;
          border: 1px solid #ced4da;
          background: white;
          border-radius: 0.5rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s;
          color: #6c757d;
          font-weight: bold;
        }

        .view-btn.active {
          background: #007bff;
          color: white;
          border-color: #007bff;
        }

        .view-btn:hover {
          border-color: #007bff;
        }

        .table-card {
          background: white;
          border-radius: 1rem;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
          overflow: hidden;
        }

        .table-responsive {
          overflow-x: auto;
        }

        .table-custom {
          width: 100%;
          border-collapse: collapse;
          margin: 0;
        }

        .table-custom thead {
          background-color: #f8f9fa;
          border-bottom: 2px solid #e9ecef;
        }

        .table-custom th {
          padding: 1rem;
          text-align: left;
          font-size: 0.85rem;
          font-weight: 600;
          color: #6c757d;
          text-transform: uppercase;
        }

        .table-custom td {
          padding: 1rem;
          border-bottom: 1px solid #e9ecef;
          font-size: 0.9rem;
          color: #495057;
        }

        .table-custom tbody tr:hover {
          background-color: #f8f9fa;
        }

        .property-title {
          font-weight: 600;
          color: #212529;
        }

        .property-seller {
          font-size: 0.85rem;
          color: #6c757d;
        }

        .location-text {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #495057;
        }

        .price-text {
          font-weight: 600;
          color: #28a745;
          font-size: 1rem;
        }

        .badge-available {
          background-color: #d4edda;
          color: #155724;
          padding: 0.375rem 0.75rem;
          border-radius: 50px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          display: inline-block;
        }

        .badge-pending {
          background-color: #fff3cd;
          color: #856404;
          padding: 0.375rem 0.75rem;
          border-radius: 50px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          display: inline-block;
        }

        .badge-sold {
          background-color: #f8d7da;
          color: #721c24;
          padding: 0.375rem 0.75rem;
          border-radius: 50px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          display: inline-block;
        }

        .btn-status {
          padding: 0.5rem 1rem;
          font-size: 0.85rem;
          border: 1px solid #ced4da;
          border-radius: 0.375rem;
          background: white;
          color: #495057;
          cursor: pointer;
          transition: all 0.3s;
          width: 100%;
          min-width: 120px;
        }

        .btn-status:hover {
          border-color: #007bff;
          background: #f0f7ff;
        }

        .btn-status:focus {
          outline: none;
          border-color: #007bff;
          box-shadow: 0 0 0 0.2rem rgba(0,123,255,0.25);
        }

        .property-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .property-card {
          background: white;
          border-radius: 1rem;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
          transition: transform 0.3s, box-shadow 0.3s;
        }

        .property-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 16px rgba(0,0,0,0.12);
        }

        .property-image {
          width: 100%;
          height: 200px;
          object-fit: cover;
          background: #e9ecef;
        }

        .property-content {
          padding: 1.5rem;
        }

        .property-name {
          font-size: 1.1rem;
          font-weight: 600;
          color: #212529;
          margin-bottom: 0.5rem;
        }

        .property-seller-info {
          font-size: 0.85rem;
          color: #6c757d;
          margin-bottom: 1rem;
        }

        .property-details {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
          margin-bottom: 1rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #e9ecef;
        }

        .detail-item {
          font-size: 0.85rem;
        }

        .detail-label {
          color: #6c757d;
          margin-bottom: 0.25rem;
        }

        .detail-value {
          font-weight: 600;
          color: #212529;
        }

        .property-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
        }

        .property-price {
          font-size: 1.25rem;
          font-weight: 700;
          color: #28a745;
        }

        .pagination-container {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 0.5rem;
          margin-top: 2rem;
        }

        .pagination-btn {
          width: 40px;
          height: 40px;
          border: 1px solid #ced4da;
          background: white;
          border-radius: 0.375rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s;
          color: #495057;
          font-weight: 500;
        }

        .pagination-btn:hover:not(:disabled) {
          background: #007bff;
          color: white;
          border-color: #007bff;
        }

        .pagination-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .pagination-btn.active {
          background: #007bff;
          color: white;
          border-color: #007bff;
        }

        .pagination-info {
          color: #6c757d;
          font-size: 0.9rem;
          margin: 0 1rem;
        }

        .empty-state {
          text-align: center;
          padding: 3rem;
          color: #6c757d;
        }

        .empty-state-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
          color: #dee2e6;
        }

        .empty-state-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: #212529;
          margin-bottom: 0.5rem;
        }

        .loading-spinner {
          text-align: center;
          padding: 3rem;
          color: #6c757d;
        }

        .error-message {
          background: #f8d7da;
          color: #721c24;
          padding: 1rem;
          border-radius: 0.5rem;
          margin-bottom: 1rem;
          border: 1px solid #f5c6cb;
        }

        @media (max-width: 768px) {
          .page-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .controls-grid {
            grid-template-columns: 1fr;
          }

          .property-grid {
            grid-template-columns: 1fr;
          }

          .table-custom th,
          .table-custom td {
            padding: 0.75rem 0.5rem;
            font-size: 0.8rem;
          }
        }
      `}</style>

      <div className="property-list-container">
        <div style={{ maxWidth: '1400px', margin: '0 auto', paddingLeft: '1rem', paddingRight: '1rem' }}>
          {/* Page Header */}
          <div className="page-header">
            <div className="header-title">
              <h1>All Properties</h1>
              <p>Manage and monitor all listed properties on the platform</p>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="error-message">
              <strong>Error:</strong> {error}
            </div>
          )}

          {/* Controls */}
          <div className="controls-card">
            <div className="controls-grid">
              <div className="search-wrapper">
                <Search size={18} />
                <input
                  type="text"
                  className="search-input"
                  placeholder="Search by title, seller, or location..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>

              <select
                className="filter-select"
                value={filterStatus}
                onChange={(e) => {
                  setFilterStatus(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="all">All Status</option>
                <option value="AVAILABLE">Available</option>
                <option value="PENDING">Pending</option>
                <option value="SOLD">Sold</option>
              </select>

              <select
                className="filter-select"
                value={filterPropertyType}
                onChange={(e) => {
                  setFilterPropertyType(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="all">All Types</option>
                <option value="APARTMENT">Apartment</option>
                <option value="HOUSE">House</option>
                <option value="LAND">Land</option>
                <option value="VILLA">Villa</option>
              </select>

              <div className="view-toggle">
                <button
                  className={`view-btn ${viewType === 'table' ? 'active' : ''}`}
                  onClick={() => setViewType('table')}
                  title="Table View"
                >
                  ≡
                </button>
                <button
                  className={`view-btn ${viewType === 'grid' ? 'active' : ''}`}
                  onClick={() => setViewType('grid')}
                  title="Grid View"
                >
                  ⊞
                </button>
              </div>
            </div>
          </div>

          {/* Results Info */}
          <div style={{ marginBottom: '1rem', color: '#6c757d', fontSize: '0.95rem' }}>
            Showing <strong>{filteredProperties.length}</strong> properties
          </div>

          {/* Loading State */}
          {loading && (
            <div className="table-card">
              <div className="loading-spinner">
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⏳</div>
                <p>Loading properties...</p>
              </div>
            </div>
          )}

          {/* Table View */}
          {!loading && viewType === 'table' && (
            <div className="table-card">
              {filteredProperties.length > 0 ? (
                <div className="table-responsive">
                  <table className="table-custom">
                    <thead>
                      <tr>
                        <th>Property</th>
                        <th>Seller</th>
                        <th>Location</th>
                        <th>Type</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedProperties.map((property) => (
                        <tr key={property.propertyId}>
                          <td>
                            <div className="property-title">{property.title}</div>
                          </td>
                          <td>
                            <div className="property-seller">{getSellerName(property.seller)}</div>
                          </td>
                          <td>
                            <div className="location-text">
                              <MapPin size={14} style={{ flexShrink: 0 }} />
                              {getLocation(property)}
                            </div>
                          </td>
                          <td>{property.propertyType || 'N/A'}</td>
                          <td>
                            <div className="price-text">₹{property.price?.toLocaleString() || '0'}</div>
                          </td>
                          <td>
                            <select
                              className="btn-status"
                              value={property.status || 'PENDING'}
                              onChange={(e) => handleForceStatus(property.propertyId, e.target.value)}
                            >
                              <option value="AVAILABLE">Available</option>
                              <option value="PENDING">Pending</option>
                              <option value="SOLD">Sold</option>
                            </select>
                          </td>
                          <td>{formatDate(property.createdAt)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="empty-state">
                  <div className="empty-state-icon">📭</div>
                  <div className="empty-state-title">No Properties Found</div>
                  <p>Try adjusting your search filters</p>
                </div>
              )}
            </div>
          )}

          {/* Grid View */}
          {!loading && viewType === 'grid' && (
            <>
              {filteredProperties.length > 0 ? (
                <div className="property-grid">
                  {paginatedProperties.map((property) => (
                    <div key={property.propertyId} className="property-card">
                      <img src={property.image || 'https://via.placeholder.com/280x200'} alt={property.title} className="property-image" />
                      <div className="property-content">
                        <div className="property-name">{property.title}</div>
                        <div className="property-seller-info">by {getSellerName(property.seller)}</div>

                        <div className="property-details">
                          <div className="detail-item">
                            <div className="detail-label">Location</div>
                            <div className="detail-value">{getLocation(property)}</div>
                          </div>
                          <div className="detail-item">
                            <div className="detail-label">Type</div>
                            <div className="detail-value">{property.propertyType || 'N/A'}</div>
                          </div>
                        </div>

                        <div className="property-footer">
                          <div className="property-price">₹{property.price?.toLocaleString() || '0'}</div>
                          <span className={`badge-${property.status?.toLowerCase() || 'pending'}`}>
                            {formatStatus(property.status)}
                          </span>
                        </div>

                        <div style={{ marginTop: '1rem', fontSize: '0.85rem', color: '#6c757d', marginBottom: '1rem' }}>
                          📅 {formatDate(property.createdAt)}
                        </div>

                        <select
                          className="btn-status"
                          value={property.status || 'PENDING'}
                          onChange={(e) => handleForceStatus(property.propertyId, e.target.value)}
                        >
                          <option value="AVAILABLE">Available</option>
                          <option value="PENDING">Pending</option>
                          <option value="SOLD">Sold</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state" style={{ background: 'white', borderRadius: '1rem', marginBottom: '2rem' }}>
                  <div className="empty-state-icon">📭</div>
                  <div className="empty-state-title">No Properties Found</div>
                  <p>Try adjusting your search filters</p>
                </div>
              )}
            </>
          )}

          {/* Pagination */}
          {!loading && filteredProperties.length > 0 && (
            <div className="pagination-container">
              <button
                className="pagination-btn"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft size={18} />
              </button>

              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                const startPage = Math.max(1, currentPage - 2);
                return startPage + i;
              }).map(page => (
                <button
                  key={page}
                  className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ))}

              <button
                className="pagination-btn"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight size={18} />
              </button>

              <div className="pagination-info">
                Page {currentPage} of {totalPages}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}