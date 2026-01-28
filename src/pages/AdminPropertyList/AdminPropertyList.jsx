/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {
  Search, Filter, Download, Plus, Eye, Edit2, Trash2,
  ChevronLeft, ChevronRight, AlertCircle, MoreVertical,
  Home, MapPin, DollarSign, Calendar, User
} from 'lucide-react';

export default function AdminPropertyList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [viewType, setViewType] = useState('table');
  const [selectedProperties, setSelectedProperties] = useState([]);

  const itemsPerPage = 10;

  // Sample property data
  const allProperties = [
    {
      id: 1,
      title: 'Luxury Apartment in Downtown',
      seller: 'John Doe',
      price: '₹450,000',
      category: 'APARTMENT',
      status: 'Available',
      location: 'New York, NY',
      bedrooms: 3,
      bathrooms: 2,
      sqft: '2,500',
      date: '2024-01-15',
      image: 'https://via.placeholder.com/300x200?text=Luxury+Apartment'
    },
    {
      id: 2,
      title: 'Modern Villa with Garden',
      seller: 'Jane Smith',
      price: '₹750,000',
      category: 'VILLA',
      status: 'Pending',
      location: 'Los Angeles, CA',
      bedrooms: 5,
      bathrooms: 3,
      sqft: '4,500',
      date: '2024-01-14',
      image: 'https://via.placeholder.com/300x200?text=Modern+Villa'
    },
    {
      id: 3,
      title: 'Commercial Space Downtown',
      seller: 'Mike Johnson',
      price: '₹320,000',
      category: 'APARTMENT',
      status: 'Available',
      location: 'Chicago, IL',
      bedrooms: 0,
      bathrooms: 2,
      sqft: '3,000',
      date: '2024-01-13',
      image: 'https://via.placeholder.com/300x200?text=Commercial+Space'
    },
    {
      id: 4,
      title: 'Residential Complex',
      seller: 'Sarah Wilson',
      price: '₹1,200,000',
      category: 'HOUSE',
      status: 'Sold',
      location: 'Houston, TX',
      bedrooms: 8,
      bathrooms: 4,
      sqft: '8,000',
      date: '2024-01-12',
      image: 'https://via.placeholder.com/300x200?text=Residential+Complex'
    },
    {
      id: 5,
      title: 'Beachfront Property',
      seller: 'Robert Brown',
      price: '₹890,000',
      category: 'LAND',
      status: 'Available',
      location: 'Miami, FL',
      bedrooms: 4,
      bathrooms: 3,
      sqft: '3,500',
      date: '2024-01-11',
      image: 'https://via.placeholder.com/300x200?text=Beachfront+Property'
    }
  ];

  // Filter properties
  const filteredProperties = allProperties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.seller.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || property.status === filterStatus;
    const matchesCategory = filterCategory === 'all' || property.category === filterCategory;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  // Pagination
  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProperties = filteredProperties.slice(startIndex, startIndex + itemsPerPage);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedProperties(paginatedProperties.map(p => p.id));
    } else {
      setSelectedProperties([]);
    }
  };

  const handleSelectProperty = (id) => {
    setSelectedProperties(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Available':
        return '#28a745';
      case 'Pending':
        return '#ffc107';
      case 'Sold':
        return '#dc3545';
      default:
        return '#6c757d';
    }
  };

  return (
    <>
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
        rel="stylesheet"
      />

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

        .header-actions {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
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
          flex-wrap: wrap;
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
        }

        .view-btn.active {
          background: #007bff;
          color: white;
          border-color: #007bff;
        }

        .view-btn:hover {
          border-color: #007bff;
        }

        .btn-custom {
          padding: 0.75rem 1.5rem;
          border-radius: 0.5rem;
          border: none;
          font-size: 0.95rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }

        .btn-primary-custom {
          background: #007bff;
          color: white;
        }

        .btn-primary-custom:hover {
          background: #0056b3;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,123,255,0.3);
        }

        .btn-secondary-custom {
          background: #e9ecef;
          color: #495057;
        }

        .btn-secondary-custom:hover {
          background: #dee2e6;
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

        .checkbox-custom {
          width: 18px;
          height: 18px;
          cursor: pointer;
          accent-color: #007bff;
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

        .badge-custom {
          display: inline-block;
          padding: 0.375rem 0.75rem;
          border-radius: 50px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
        }

        .badge-available {
          background-color: #d4edda;
          color: #155724;
        }

        .badge-pending {
          background-color: #fff3cd;
          color: #856404;
        }

        .badge-sold {
          background-color: #f8d7da;
          color: #721c24;
        }

        .action-buttons {
          display: flex;
          gap: 0.5rem;
        }

        .btn-action {
          width: 36px;
          height: 36px;
          border: none;
          border-radius: 0.375rem;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s;
          font-size: 0;
        }

        .btn-view {
          background: #e3f2fd;
          color: #1976d2;
        }

        .btn-view:hover {
          background: #bbdefb;
        }

        .btn-edit {
          background: #fff3e0;
          color: #f57c00;
        }

        .btn-edit:hover {
          background: #ffe0b2;
        }

        .btn-delete {
          background: #ffebee;
          color: #c62828;
        }

        .btn-delete:hover {
          background: #ffcdd2;
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

        .property-header {
          margin-bottom: 1rem;
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
        }

        .property-price {
          font-size: 1.25rem;
          font-weight: 700;
          color: #28a745;
        }

        .property-status {
          font-size: 0.75rem;
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

        @media (max-width: 1024px) {
          .controls-grid {
            grid-template-columns: 1fr 1fr;
          }

          .property-grid {
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          }
        }

        @media (max-width: 768px) {
          .page-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .header-actions {
            width: 100%;
          }

          .controls-grid {
            grid-template-columns: 1fr;
          }

          .search-input {
            width: 100%;
          }

          .property-grid {
            grid-template-columns: 1fr;
          }

          .table-custom th,
          .table-custom td {
            padding: 0.75rem 0.5rem;
            font-size: 0.8rem;
          }

          .btn-custom {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>

      <div className="property-list-container">
        <div className="container-fluid">
          {/* Page Header */}
          <div className="page-header">
            <div className="header-title">
              <h1>All Properties</h1>
              <p>Manage and monitor all listed properties on the platform</p>
            </div>
            <div className="header-actions">
              <button className="btn-custom btn-secondary-custom">
                <Download size={18} />
                Export
              </button>
              <button className="btn-custom btn-primary-custom">
                <Plus size={18} />
                Add Property
              </button>
            </div>
          </div>

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
                <option value="Available">Available</option>
                <option value="Pending">Pending</option>
                <option value="Sold">Sold</option>
              </select>

              <select
                className="filter-select"
                value={filterCategory}
                onChange={(e) => {
                  setFilterCategory(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="all">All Categories</option>
                <option value="APARTMENT">APARTMENT</option>
                <option value="HOUSE">HOUSE</option>
                <option value="LAND">LAND</option>
                <option value="VILLA">VILLA</option>
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
            {selectedProperties.length > 0 && ` | ${selectedProperties.length} selected`}
          </div>

          {/* Table View */}
          {viewType === 'table' && (
            <div className="table-card">
              {filteredProperties.length > 0 ? (
                <div className="table-responsive">
                  <table className="table-custom">
                    <thead>
                      <tr>
                        <th style={{ width: '40px' }}>
                          <input
                            type="checkbox"
                            className="checkbox-custom"
                            checked={selectedProperties.length === paginatedProperties.length && paginatedProperties.length > 0}
                            onChange={handleSelectAll}
                          />
                        </th>
                        <th>Property</th>
                        <th>Seller</th>
                        <th>Location</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th style={{ width: '120px' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedProperties.map((property) => (
                        <tr key={property.id}>
                          <td>
                            <input
                              type="checkbox"
                              className="checkbox-custom"
                              checked={selectedProperties.includes(property.id)}
                              onChange={() => handleSelectProperty(property.id)}
                            />
                          </td>
                          <td>
                            <div className="property-title">{property.title}</div>
                          </td>
                          <td>
                            <div className="property-seller">{property.seller}</div>
                          </td>
                          <td>
                            <div className="location-text">
                              <MapPin size={14} style={{ flexShrink: 0 }} />
                              {property.location}
                            </div>
                          </td>
                          <td>
                            <div className="price-text">{property.price}</div>
                          </td>
                          <td>{property.category}</td>
                          <td>
                            <span className={`badge-custom badge-${property.status.toLowerCase()}`}>
                              {property.status}
                            </span>
                          </td>
                          <td>{property.date}</td>
                          <td>
                            <div className="action-buttons">
                              <button className="btn-action btn-view" title="View">
                                <Eye size={16} />
                              </button>
                              <button className="btn-action btn-edit" title="Edit">
                                <Edit2 size={16} />
                              </button>
                              <button className="btn-action btn-delete" title="Delete">
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="empty-state">
                  <div className="empty-state-icon">📭</div>
                  <div className="empty-state-title">No Properties Found</div>
                  <p>Try adjusting your search filters or add new properties</p>
                </div>
              )}
            </div>
          )}

          {/* Grid View */}
          {viewType === 'grid' && (
            <>
              {filteredProperties.length > 0 ? (
                <div className="property-grid">
                  {paginatedProperties.map((property) => (
                    <div key={property.id} className="property-card">
                      <img src={property.image} alt={property.title} className="property-image" />
                      <div className="property-content">
                        <div className="property-header">
                          <div className="property-name">{property.title}</div>
                          <div className="property-seller-info">by {property.seller}</div>
                        </div>

                        <div className="property-details">
                          <div className="detail-item">
                            <div className="detail-label">Bedrooms</div>
                            <div className="detail-value">{property.bedrooms || 'N/A'}</div>
                          </div>
                          <div className="detail-item">
                            <div className="detail-label">Bathrooms</div>
                            <div className="detail-value">{property.bathrooms}</div>
                          </div>
                          <div className="detail-item">
                            <div className="detail-label">Size</div>
                            <div className="detail-value">{property.sqft} sqft</div>
                          </div>
                          <div className="detail-item">
                            <div className="detail-label">Category</div>
                            <div className="detail-value">{property.category}</div>
                          </div>
                        </div>

                        <div style={{ marginBottom: '1rem', fontSize: '0.85rem', color: '#6c757d', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <MapPin size={14} />
                          {property.location}
                        </div>

                        <div className="property-footer">
                          <div className="property-price">{property.price}</div>
                          <span className={`badge-custom badge-${property.status.toLowerCase()}`}>
                            {property.status}
                          </span>
                        </div>

                        <div className="action-buttons" style={{ marginTop: '1rem', justifyContent: 'space-around' }}>
                          <button className="btn-action btn-view" title="View">
                            <Eye size={16} />
                          </button>
                          <button className="btn-action btn-edit" title="Edit">
                            <Edit2 size={16} />
                          </button>
                          <button className="btn-action btn-delete" title="Delete">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state" style={{ background: 'white', borderRadius: '1rem', marginBottom: '2rem' }}>
                  <div className="empty-state-icon">📭</div>
                  <div className="empty-state-title">No Properties Found</div>
                  <p>Try adjusting your search filters or add new properties</p>
                </div>
              )}
            </>
          )}

          {/* Pagination */}
          {filteredProperties.length > 0 && (
            <div className="pagination-container">
              <button
                className="pagination-btn"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft size={18} />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
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