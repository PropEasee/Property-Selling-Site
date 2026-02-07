import React, { useState, useEffect } from 'react';
import { fetchWithAuth } from '../../utils/api/fetchWithAuth';
import styles from './SellerPropertiesList.module.css';

export default function SellerPropertiesList() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('All');
  const [showEditPropertyModal, setShowEditPropertyModal] = useState(false);
  const [editingPropertyId, setEditingPropertyId] = useState(null);
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState('');
  const [deleteLoading, setDeleteLoading] = useState(null); // Track which property is being deleted
  const [deleteError, setDeleteError] = useState('');
  const [editFormData, setEditFormData] = useState({
    title: '',
    description: '',
    price: '',
    city: '',
    state: '',
    pincode: '',
    propertyType: '',
    status: ''
  });

  const filteredProperties = filter === 'All' 
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

  // Handle Edit Property Click
  const handleEditClick = async (propertyId) => {
    setEditLoading(true);
    setEditError('');
    try {
      const response = await fetchWithAuth(`http://localhost:8080/api/properties/${propertyId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch property details');
      }
      const propertyData = await response.json();

      setEditFormData({
        title: propertyData.title || '',
        description: propertyData.description || '',
        price: propertyData.price || '',
        city: propertyData.city || '',
        state: propertyData.state || '',
        pincode: propertyData.pincode || '',
        propertyType: propertyData.propertyType || '',
        status: propertyData.status || ''
      });
      setEditingPropertyId(propertyId);
      setShowEditPropertyModal(true);
    } catch (error) {
      setEditError(error.message || 'Error fetching property details');
      console.error('Error fetching property:', error);
    } finally {
      setEditLoading(false);
    }
  };

  // Handle Edit Form Input Change
  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle Edit Form Submit
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editingPropertyId) return;

    setEditLoading(true);
    setEditError('');
    try {
      const response = await fetchWithAuth(`http://localhost:8080/api/properties/${editingPropertyId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editFormData)
      });

      if (!response.ok) {
        throw new Error('Failed to update property');
      }

      // Refresh the properties list
      await loadProperties();
      setShowEditPropertyModal(false);
      alert('Property updated successfully!');
    } catch (error) {
      setEditError(error.message || 'Error updating property');
      console.error('Error updating property:', error);
    } finally {
      setEditLoading(false);
    }
  };

  // Handle Delete Property
  const handleDelete = async (propertyId, propertyTitle) => {
    // Show confirmation dialog
    const confirmed = window.confirm(
      `Are you sure you want to delete "${propertyTitle}"? This action cannot be undone.`
    );
    
    if (!confirmed) return;

    setDeleteLoading(propertyId);
    setDeleteError('');
    
    try {
      const response = await fetchWithAuth(
        `http://localhost:8080/api/propert/${propertyId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (!response.ok) {
        throw new Error('Failed to delete property');
      }

      // Remove property from the list
      setProperties(prev => prev.filter(p => p.id !== propertyId));
      alert('Property deleted successfully!');
    } catch (error) {
      setDeleteError(error.message || 'Error deleting property');
      alert(error.message || 'Failed to delete property');
      console.error('Error deleting property:', error);
    } finally {
      setDeleteLoading(null);
    }
  };

  const loadProperties = async () => {
    setLoading(true);
    setError('');
    const sellerId = getSellerIdFromStorage();
    if (!sellerId) {
      setError('Seller ID not found. Please login as a seller.');
      setLoading(false);
      return;
    }

    try {
      const res = await fetchWithAuth(`http://localhost:8080/api/properties/seller/${sellerId}`);
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

  useEffect(() => {
    loadProperties();
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

      <div className={styles.sellerPropertiesPage}>
        {/* Page Header */}
        <section className={styles.pageHeader}>
          <div className={styles.headerContent}>
            <h1 className={styles.pageTitle}>My Properties</h1>
            <p className={styles.pageSubtitle}>Manage and track all your property listings in one place</p>
          </div>
        </section>

        {/* Content Section */}
        <section className={styles.contentSection}>
          <div className={styles.contentContainer}>
            {/* Filter Bar */}
            <div className={styles.filterBar}>
              <div className={styles.filterButtonsWrapper}>
                <button 
                  className={`${styles.filterBtn} ${filter === 'All' ? styles.active : ''}`}
                  onClick={() => setFilter('All')}
                >
                  All Properties
                </button>
                <button 
                  className={`${styles.filterBtn} ${filter === 'Active' ? styles.active : ''}`}
                  onClick={() => setFilter('Active')}
                >
                  Active
                </button>
                <button 
                  className={`${styles.filterBtn} ${filter === 'Pending' ? styles.active : ''}`}
                  onClick={() => setFilter('Pending')}
                >
                  Pending
                </button>
                <button 
                  className={`${styles.filterBtn} ${filter === 'Sold' ? styles.active : ''}`}
                  onClick={() => setFilter('Sold')}
                >
                  Sold
                </button>
              </div>
              <a href="/AddProperty">
                <button className={styles.addPropertyBtn}>
                  <i className="fas fa-plus"></i>
                  Add New Property
                </button>
              </a>
            </div>

            {/* Properties Grid */}
            {loading && (
              <div className={styles.loadingMessage}>
                <p>Loading properties...</p>
              </div>
            )}
            
            {error && (
              <div className={styles.errorMessage}>
                <p>{error}</p>
              </div>
            )}

            {!loading && !error && (
              <div className={styles.propertiesGrid}>
                {filteredProperties.length > 0 ? (
                  filteredProperties.map(property => (
                    <div key={property.id} className={styles.propertyCard}>
                      <div className={styles.propertyImageWrapper}>
                        <img src={property.image} alt={property.title} className={styles.propertyImage} />
                        <span className={`${styles.statusBadge} ${styles[property.status.toLowerCase()]}`}>
                          {property.status}
                        </span>
                      </div>
                      <div className={styles.propertyDetails}>
                        <h3 className={styles.propertyTitle}>{property.title}</h3>
                        <p className={styles.propertyAddress}>
                          <i className="fas fa-map-marker-alt"></i>
                          {property.address}
                        </p>
                        <div className={styles.propertyPrice}>{property.price}</div>
                        <div className={styles.propertyFeatures}>
                          <div className={styles.featureItem}>
                            <i className="fas fa-bed"></i>
                            <span>{property.bedrooms} Beds</span>
                          </div>
                          <div className={styles.featureItem}>
                            <i className="fas fa-bath"></i>
                            <span>{property.bathrooms} Baths</span>
                          </div>
                          <div className={styles.featureItem}>
                            <i className="fas fa-ruler-combined"></i>
                            <span>{property.sqft} sqft</span>
                          </div>
                        </div>
                        {/* <div className={styles.propertyStats}>
                          <div className={styles.statItem}>
                            <div className={styles.statNumber}>{property.views}</div>
                            <div className={styles.statLabel}>Views</div>
                          </div>
                          <div className={styles.statItem}>
                            <div className={styles.statNumber}>{property.inquiries}</div>
                            <div className={styles.statLabel}>Inquiries</div>
                          </div>
                        </div> */}

                        {/* Action buttons */}
                        <div className={styles.actionButtons}>
                          <button 
                            className={`${styles.actionBtn} ${styles.viewBtn}`} 
                            onClick={() => handleView(property.id)}
                            disabled={deleteLoading === property.id}
                          >
                            <i className="fas fa-eye"></i>
                            View
                          </button>
                          <button 
                            className={`${styles.actionBtn} ${styles.editBtn}`} 
                            onClick={() => handleEditClick(property.id)}
                            disabled={deleteLoading === property.id}
                          >
                            <i className="fas fa-edit"></i>
                            Edit
                          </button>
                          <button 
                            className={`${styles.actionBtn} ${styles.deleteBtn}`} 
                            onClick={() => handleDelete(property.id, property.title)}
                            disabled={deleteLoading === property.id}
                            title={deleteLoading === property.id ? 'Deleting...' : 'Delete Property'}
                          >
                            <i className={`fas ${deleteLoading === property.id ? 'fa-spinner fa-spin' : 'fa-trash'}`}></i>
                            {deleteLoading === property.id ? 'Deleting...' : 'Delete'}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className={styles.loadingMessage}>
                    <p>No properties found.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Edit Property Modal */}
      <div className={`${styles.modalOverlay} ${showEditPropertyModal ? styles.active : ''}`}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <h2 className={styles.modalTitle}>Edit Property</h2>
            <button className={styles.modalClose} onClick={() => setShowEditPropertyModal(false)}>×</button>
          </div>

          {editError && (
            <div style={{ color: '#dc2626', padding: '1rem', background: '#fee2e2', borderRadius: '8px', marginBottom: '1rem' }}>
              {editError}
            </div>
          )}

          <form onSubmit={handleEditSubmit}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Property Title</label>
              <input 
                type="text" 
                name="title"
                className={styles.formInput} 
                placeholder="Enter property title"
                value={editFormData.title}
                onChange={handleEditFormChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Description</label>
              <input 
                type="text" 
                name="description"
                className={styles.formInput} 
                placeholder="Enter property description"
                value={editFormData.description}
                onChange={handleEditFormChange}
                style={{ minHeight: '80px' }}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Price</label>
              <input 
                type="number" 
                name="price"
                className={styles.formInput} 
                placeholder="Enter property price"
                value={editFormData.price}
                onChange={handleEditFormChange}
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>City</label>
                <input 
                  type="text" 
                  name="city"
                  className={styles.formInput} 
                  placeholder="Enter city"
                  value={editFormData.city}
                  onChange={handleEditFormChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>State</label>
                <input 
                  type="text" 
                  name="state"
                  className={styles.formInput} 
                  placeholder="Enter state"
                  value={editFormData.state}
                  onChange={handleEditFormChange}
                  required
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Pincode</label>
                <input 
                  type="text" 
                  name="pincode"
                  className={styles.formInput} 
                  placeholder="Enter pincode"
                  value={editFormData.pincode}
                  onChange={handleEditFormChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Property Type</label>
                <select 
                  name="propertyType"
                  className={styles.formInput}
                  value={editFormData.propertyType}
                  onChange={handleEditFormChange}
                  required
                >
                  <option value="">Select property type</option>
                  <option value="APARTMENT">Apartment</option>
                  <option value="VILLA">Villa</option>
                  <option value="HOUSE">House</option>
                  <option value="COMMERCIAL">Commercial</option>
                  <option value="LAND">Land</option>
                </select>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Status</label>
              <select 
                name="status"
                className={styles.formInput}
                value={editFormData.status}
                onChange={handleEditFormChange}
                required
              >
                <option value="">Select status</option>
                <option value="AVAILABLE">Available</option>
                <option value="SOLD">Sold</option>
                <option value="PENDING">Pending</option>
              </select>
            </div>

            <div className={styles.modalButtons}>
              <button type="submit" className={styles.buttonPrimary} disabled={editLoading}>
                {editLoading ? 'Updating...' : 'Update Property'}
              </button>
              <button type="button" className={styles.buttonSecondary} onClick={() => setShowEditPropertyModal(false)}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}