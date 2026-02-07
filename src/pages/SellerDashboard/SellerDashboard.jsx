import React, { useState, useEffect } from 'react';
import { Home, Plus, Eye, MessageSquare, TrendingUp, DollarSign, Bell, User, Search, Settings, LogOut, Menu, X, Edit, Trash2, MapPin, BarChart3 } from 'lucide-react';
import { fetchWithAuth } from '../../utils/api/fetchWithAuth';
import styles from './SellerDashboard.module.css';

export default function SellerDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showAddPropertyModal, setShowAddPropertyModal] = useState(false);
  const [showEditPropertyModal, setShowEditPropertyModal] = useState(false);
  const [editingPropertyId, setEditingPropertyId] = useState(null);
  const [addPropertyLoading, setAddPropertyLoading] = useState(false);
  const [addPropertyError, setAddPropertyError] = useState('');
  const [addFormData, setAddFormData] = useState({
    title: '',
    description: '',
    price: '',
    city: '',
    state: '',
    pincode: '',
    propertyType: '',
    bedrooms: '',
    bathrooms: '',
    sqft: ''
  });
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
  const [totalViews, setTotalViews] = useState(0);
  const [totalInquiries, setTotalInquiries] = useState(0);
  const [listedProperties, setListedProperties] = useState([]);
  const [totalProperties, setTotalProperties] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [recentInquiries, setRecentInquiries] = useState([]);
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState('');

  const formatCurrency = (amount) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(1)} Cr`;
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)} Lac`;
    } else {
      return `₹${amount.toLocaleString('en-IN')}`;
    }
  };

  const stats = [
    { label: 'Total Properties', value: totalProperties, icon: Home, color: '#3b82f6' },
    { label: 'Total Views', value: totalViews?.toLocaleString ? totalViews.toLocaleString('en-IN') : String(totalViews), icon: Eye, color: '#10b981' },
    { label: 'Total Inquiries', value: totalInquiries, icon: MessageSquare, color: '#f59e0b' },
    { label: 'Total Sales', value: formatCurrency(totalSales), icon: DollarSign, color: '#8b5cf6' }
  ];

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

  const getSellernameFromStorage = () => {
    try {
      const st = localStorage.getItem('user');
      if (!st) return null;
      const u = JSON.parse(st);
      return u?.name ?? null;
    } catch {
      return null;
    }
  };

  const sellername = getSellernameFromStorage();

  // Handle Add Property Form Change
  const handleAddFormChange = (e) => {
    const { name, value } = e.target;
    setAddFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle Add Property Form Submit
  const handleAddPropertySubmit = async (e) => {
    e.preventDefault();
    setAddPropertyLoading(true);
    setAddPropertyError('');

    const sellerId = getSellerIdFromStorage();
    if (!sellerId) {
      setAddPropertyError('Seller ID not found. Please login again.');
      setAddPropertyLoading(false);
      return;
    }

    try {
      const response = await fetchWithAuth('http://localhost:8080/api/properties', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...addFormData,
          price: Number(addFormData.price),
          bedrooms: Number(addFormData.bedrooms),
          bathrooms: Number(addFormData.bathrooms),
          sqft: Number(addFormData.sqft),
          sellerId: sellerId
        })
      });

      if (!response.ok) {
        throw new Error('Failed to add property');
      }

      // Reset form and close modal
      setAddFormData({
        title: '',
        description: '',
        price: '',
        city: '',
        state: '',
        pincode: '',
        propertyType: '',
        bedrooms: '',
        bathrooms: '',
        sqft: ''
      });
      setShowAddPropertyModal(false);
      alert('Property listed successfully!');
      
      // Refresh dashboard data
      await loadDashboardData();
    } catch (error) {
      setAddPropertyError(error.message || 'Error adding property');
      console.error('Error adding property:', error);
    } finally {
      setAddPropertyLoading(false);
    }
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
      await loadDashboardData();
      setShowEditPropertyModal(false);
      alert('Property updated successfully!');
    } catch (error) {
      setEditError(error.message || 'Error updating property');
      console.error('Error updating property:', error);
    } finally {
      setEditLoading(false);
    }
  };

  // Load Dashboard Data
  const loadDashboardData = async () => {
    const sellerId = getSellerIdFromStorage();
    if (!sellerId) return;

    try {
      // Fetch total views
      const viewsRes = await fetchWithAuth(`http://localhost:8080/api/properties/sellers/${sellerId}/viewsCount`);
      if (viewsRes.ok) {
        const viewsData = await viewsRes.json();
        const viewsSum = Array.isArray(viewsData) ? viewsData.reduce((acc, item) => acc + (Number(item.viewsCount) || 0), 0) : 0;
        setTotalViews(viewsSum);
      }

      // Fetch total inquiries
      const inquiriesRes = await fetchWithAuth(`http://localhost:8080/api/enquiries/seller/${sellerId}/total-count`);
      if (inquiriesRes.ok) {
        const inquiriesData = await inquiriesRes.json();
        setTotalInquiries(inquiriesData.totalCount || 0);
      }

      // Fetch properties
      const propertiesRes = await fetchWithAuth(`http://localhost:8080/api/properties/seller/${sellerId}`);
      if (propertiesRes.ok) {
        const propertiesData = await propertiesRes.json();
        setTotalProperties(propertiesData.length);

        const totalSalesSum = propertiesData
          .filter((property) => property.status === 'SOLD')
          .reduce((acc, property) => acc + (Number(property.price) || 0), 0);
        setTotalSales(totalSalesSum);

        const filteredProperties = propertiesData
          .filter((property) => property.status === 'AVAILABLE')
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 4);
        setListedProperties(filteredProperties);
      }

      // Fetch recent inquiries
      const inquiriesResponse = await fetchWithAuth(`http://localhost:8080/api/enquiries`);
      if (inquiriesResponse.ok) {
        const inquiriesData = await inquiriesResponse.json();
        const filteredInquiries = inquiriesData
          .filter((inquiry) => inquiry.property.seller.userId === sellerId)
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 3);
        setRecentInquiries(filteredInquiries);
      }
    } catch (e) {
      console.error('Error fetching data:', e);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  return (
    <div className={styles.dashboard}>
      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${sidebarOpen ? styles.mobileOpen : styles.mobileHidden}`}>
        <div className={styles.logoSection}>
          <div className={styles.logoCircle}>
            <div className={styles.logoCircleInner}></div>
          </div>
          <span className={styles.logoText}>propEase</span>
        </div>

        <nav className={styles.navMenu}>
          <button 
            className={`${styles.navItem} ${activeTab === 'overview' ? styles.active : ''}`} 
            onClick={() => setActiveTab('overview')}
          >
            <Home className={styles.navIcon} />
            <span className={styles.navLabel}>Overview</span>
          </button>
          <a href="/SellerPropertiesList" style={{ textDecoration: 'none' }}>
            <button 
              className={`${styles.navItem} ${activeTab === 'properties' ? styles.active : ''}`} 
              onClick={() => setActiveTab('properties')}
            >
              <Home className={styles.navIcon} />
              <span className={styles.navLabel}>My Properties</span>
            </button>
          </a>
          <button 
            className={`${styles.navItem} ${activeTab === 'inquiries' ? styles.active : ''}`} 
            onClick={() => setActiveTab('inquiries')}
          >
            <MessageSquare className={styles.navIcon} />
            <span className={styles.navLabel}>All Enquiries</span>
          </button>
          <button 
            className={`${styles.navItem} ${activeTab === 'analytics' ? styles.active : ''}`} 
            onClick={() => setActiveTab('analytics')}
          >
            <BarChart3 className={styles.navIcon} />
            <span className={styles.navLabel}>Analytics</span>
          </button>

          <div className={styles.navDivider}></div>

          <button className={styles.navItem}>
            <LogOut className={styles.navIcon} />
            <span className={styles.navLabel}>Logout</span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <div className={`${styles.mainContent} ${sidebarOpen ? '' : styles.fullWidth}`}>
        {/* Top Bar */}
        <div className={styles.topBar}>
          <div className={styles.topBarLeft}>
            <button className={styles.menuToggle} onClick={() => setSidebarOpen(!sidebarOpen)}>
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <div className={styles.searchBar}>
              <Search size={18} className={styles.searchIcon} />
              <input 
                type="text" 
                placeholder="Search properties..."
                className={styles.searchInput}
              />
            </div>
          </div>

          <div className={styles.topBarActions}>
            <a href="/SellerEnquiries" style={{ textDecoration: 'none' }}>
              <button className={styles.addPropertyButton}>
                <span>All Inquiries</span>
              </button>
            </a>
            <button 
              className={styles.addPropertyButton}
              onClick={() => setShowAddPropertyModal(true)}
            >
              <Plus size={18} />
              <span>List Property</span>
            </button>
            <button className={styles.iconButton}>
              <Bell size={20} />
              <span className={styles.notificationBadge}>5</span>
            </button>
            <a href="/AdminProfile" style={{ textDecoration: 'none' }}>
              <div className={styles.userAvatar}>SE</div>
            </a>
          </div>
        </div>

        {/* Content Area */}
        <div className={styles.contentArea}>
          <div className={styles.pageHeader}>
            <h1 className={styles.pageTitle}>Welcome back, {sellername}</h1>
            <p className={styles.pageSubtitle}>Manage your properties and track inquiries</p>
          </div>

          {/* Stats Grid */}
          <div className={styles.statsGrid}>
            {stats.map((stat, index) => (
              <div key={index} className={styles.statCard}>
                <div className={styles.statIcon} style={{ background: `${stat.color}15` }}>
                  <stat.icon size={24} style={{ color: stat.color }} />
                </div>
                <div className={styles.statContent}>
                  <div className={styles.statValue}>{stat.value}</div>
                  <div className={styles.statLabel}>{stat.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Dashboard Grid */}
          <div className={styles.dashboardGrid}>
            {/* Listed Properties */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h2 className={styles.cardTitle}>My Properties</h2>
                <a href="/SellerPropertiesList" className={styles.viewAllLink}>View All</a>
              </div>
              <div className={styles.propertyList}>
                {listedProperties.map((property) => (
                  <div key={property.propertyId} className={styles.propertyItem}>
                    <img src={property.imageUrl || 'https://via.placeholder.com/80'} alt={property.title} className={styles.propertyImageSmall} />
                    <div className={styles.propertyInfo}>
                      <div className={styles.propertyHeaderRow}>
                        <div className={styles.propertyName}>{property.title || 'N/A'}</div>
                        <span className={`${styles.statusBadge} ${styles[`status${property.status?.charAt(0).toUpperCase() + property.status?.slice(1).toLowerCase() || 'Unknown'}`]}`}>
                          {property.status || 'Unknown'}
                        </span>
                      </div>
                      <div className={styles.propertyStats}>
                        <div className={styles.statItem}>
                          <MapPin size={14} />
                          <span>{property.city || 'N/A'}, {property.state || 'N/A'}</span>
                        </div>
                        <div className={styles.statItem}>
                          <span>₹{property.price?.toLocaleString('en-IN') || 'N/A'}</span>
                        </div>
                      </div>
                      <div className={styles.propertyLocationSmall}>
                        <MapPin size={14} />
                        <span>{property.pincode || 'N/A'}</span>
                      </div>
                    </div>
                    <div className={styles.propertyActions}>
                      <button 
                        className={styles.actionButton} 
                        title="Edit Property"
                        onClick={() => handleEditClick(property.propertyId)}
                      >
                        <Edit size={18} />
                      </button>
                      <button className={`${styles.actionButton} ${styles.delete}`} title="Delete Property">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column */}
            <div>
              {/* Recent Inquiries */}
              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <h2 className={styles.cardTitle}>Recent Inquiries</h2>
                </div>
                {recentInquiries.length > 0 ? (
                  recentInquiries.map((inquiry) => (
                    <div key={inquiry.enquiryId} className={styles.inquiryItem}>
                      <div className={styles.inquiryInfo}>
                        <div className={styles.inquiryBuyer}>
                          <strong>Buyer:</strong> {inquiry.buyer.name} ({inquiry.buyer.email})
                        </div>
                        <div className={styles.inquiryProperty}>
                          <strong>Property:</strong> {inquiry.property.title} ({inquiry.property.city}, {inquiry.property.state})
                        </div>
                        <div className={styles.inquiryMessage}>
                          <strong>Message:</strong> "{inquiry.message}"
                        </div>
                        <div className={styles.inquiryDate}>
                          <strong>Date:</strong> {new Date(inquiry.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div>No recent inquiries found.</div>
                )}
              </div>
            </div>
          </div>
        </div>
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

      {/* Add Property Modal */}
      <div className={`${styles.modalOverlay} ${showAddPropertyModal ? styles.active : ''}`}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <h2 className={styles.modalTitle}>List New Property</h2>
            <button className={styles.modalClose} onClick={() => setShowAddPropertyModal(false)}>×</button>
          </div>

          {addPropertyError && (
            <div style={{ color: '#dc2626', padding: '1rem', background: '#fee2e2', borderRadius: '8px', marginBottom: '1rem' }}>
              {addPropertyError}
            </div>
          )}

          <form onSubmit={handleAddPropertySubmit}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Property Title</label>
              <input 
                type="text" 
                name="title"
                className={styles.formInput} 
                placeholder="Enter property title"
                value={addFormData.title}
                onChange={handleAddFormChange}
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
                value={addFormData.description}
                onChange={handleAddFormChange}
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
                value={addFormData.price}
                onChange={handleAddFormChange}
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
                  value={addFormData.city}
                  onChange={handleAddFormChange}
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
                  value={addFormData.state}
                  onChange={handleAddFormChange}
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
                  value={addFormData.pincode}
                  onChange={handleAddFormChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Property Type</label>
                <select 
                  name="propertyType"
                  className={styles.formInput}
                  value={addFormData.propertyType}
                  onChange={handleAddFormChange}
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

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Bedrooms</label>
                <input 
                  type="number" 
                  name="bedrooms"
                  className={styles.formInput} 
                  placeholder="Number of bedrooms"
                  value={addFormData.bedrooms}
                  onChange={handleAddFormChange}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Bathrooms</label>
                <input 
                  type="number" 
                  name="bathrooms"
                  className={styles.formInput} 
                  placeholder="Number of bathrooms"
                  value={addFormData.bathrooms}
                  onChange={handleAddFormChange}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Area (Sq. Ft)</label>
                <input 
                  type="number" 
                  name="sqft"
                  className={styles.formInput} 
                  placeholder="Property area"
                  value={addFormData.sqft}
                  onChange={handleAddFormChange}
                />
              </div>
            </div>

            <div className={styles.modalButtons}>
              <button type="submit" className={styles.buttonPrimary} disabled={addPropertyLoading}>
                {addPropertyLoading ? 'Listing...' : 'List Property'}
              </button>
              <button type="button" className={styles.buttonSecondary} onClick={() => setShowAddPropertyModal(false)}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}