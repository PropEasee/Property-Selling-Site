import React, { useState, useEffect } from 'react';
import { Home, Heart, Calendar, Bell, User, Search, TrendingUp, Eye, MapPin, MessageSquare, Settings, LogOut, Menu, X } from 'lucide-react';

export default function BuyerDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [savedPropertiesCount, setSavedPropertiesCount] = useState(0);
  const [savedProperties, setSavedProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedProperties = async () => {
      try {
        // Get user ID from localStorage
        let userId = null;
        try {
          const stored = localStorage.getItem('user');
          if (stored) {
            const u = JSON.parse(stored);
            userId = u?.id ?? u?.userId ?? u?.user_id ?? null;
          }
        } catch (e) {
          userId = null;
        }

        if (!userId) {
          setLoading(false);
          return;
        }

        const response = await fetch(`http://localhost:8080/api/property-likes/buyer/${userId}`);
        if (!response.ok) throw new Error('Failed to fetch saved properties');
        
        const data = await response.json();
        setSavedPropertiesCount(data.length);
        setSavedProperties(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching saved properties:', err);
        setLoading(false);
      }
    };

    fetchSavedProperties();
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(price);
  };

  const stats = [
    { label: 'Saved Properties', value: savedPropertiesCount, icon: Heart, color: '#3b82f6' },
    { label: 'Property Views', value: '156', icon: Eye, color: '#10b981' },
    { label: 'Scheduled Tours', value: '5', icon: Calendar, color: '#f59e0b' },
    { label: 'New Matches', value: '12', icon: TrendingUp, color: '#8b5cf6' }
  ];

  const savedPropertiesDummy = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=400&q=80",
      title: "103/143 West Street, Crows Nest",
      price: "₹45,545",
      location: "Sydney, NSW",
      bedrooms: 10,
      bathrooms: 4,
      area: "150 M",
      status: "Available"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&q=80",
      title: "245 Oak Avenue, Melbourne",
      price: "₹67,890",
      location: "Melbourne, VIC",
      bedrooms: 4,
      bathrooms: 3,
      area: "220 M",
      status: "Available"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&q=80",
      title: "78 Beach Road, Brisbane",
      price: "₹38,200",
      location: "Brisbane, QLD",
      bedrooms: 3,
      bathrooms: 2,
      area: "180 M",
      status: "Pending"
    }
  ];

  const upcomingTours = [
    {
      id: 1,
      property: "103/143 West Street",
      date: "Dec 15, 2025",
      time: "10:00 AM",
      agent: "John Smith"
    },
    {
      id: 2,
      property: "245 Oak Avenue",
      date: "Dec 18, 2025",
      time: "2:00 PM",
      agent: "Sarah Johnson"
    }
  ];

  const recentActivity = [
    { id: 1, action: "Saved property", property: "78 Beach Road", time: "2 hours ago" },
    { id: 2, action: "Scheduled tour", property: "103/143 West Street", time: "5 hours ago" },
    { id: 3, action: "Viewed property", property: "245 Oak Avenue", time: "1 day ago" }
  ];

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
        }

        .dashboard {
          display: flex;
          min-height: 100vh;
          background: #f9fafb;
        }

        .sidebar {
          width: 280px;
          background: white;
          border-right: 1px solid #e5e7eb;
          padding: 2rem 0;
          position: fixed;
          height: 100vh;
          overflow-y: auto;
          transition: transform 0.3s ease;
          z-index: 100;
        }

        .sidebar.mobile-hidden {
          transform: translateX(-100%);
        }

        .logo-section {
          display: flex;
          align-items: center;
          padding: 0 2rem;
          margin-bottom: 2rem;
        }

        .logo-circle {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #22d3ee 0%, #3b82f6 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 10px;
        }

        .logo-circle-inner {
          width: 28px;
          height: 28px;
          border: 2px solid white;
          border-radius: 50%;
        }

        .logo-text {
          font-size: 1.25rem;
          font-weight: 700;
          color: #1a1a2e;
        }

        .nav-menu {
          padding: 0 1rem;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.875rem 1rem;
          margin-bottom: 0.5rem;
          border-radius: 12px;
          color: #6b7280;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
        }

        .nav-item:hover {
          background: #f3f4f6;
          color: #1a1a2e;
        }

        .nav-item.active {
          background: #eff6ff;
          color: #3b82f6;
        }

        .nav-icon {
          width: 20px;
          height: 20px;
        }

        .nav-label {
          font-size: 0.9375rem;
          font-weight: 500;
        }

        .nav-divider {
          height: 1px;
          background: #e5e7eb;
          margin: 1rem 0;
        }

        .main-content {
          flex: 1;
          margin-left: 280px;
          transition: margin-left 0.3s ease;
        }

        .main-content.full-width {
          margin-left: 0;
        }

        .top-bar {
          background: white;
          border-bottom: 1px solid #e5e7eb;
          padding: 1.5rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: sticky;
          top: 0;
          z-index: 50;
        }

        .menu-toggle {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.5rem;
          color: #6b7280;
        }

        .search-bar {
          flex: 1;
          max-width: 400px;
          position: relative;
        }

        .search-input {
          width: 100%;
          padding: 0.75rem 1rem 0.75rem 3rem;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          font-size: 0.875rem;
          outline: none;
          transition: border-color 0.3s ease;
        }

        .search-input:focus {
          border-color: #3b82f6;
        }

        .search-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: #9ca3af;
        }

        .top-bar-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .icon-button {
          width: 40px;
          height: 40px;
          background: #f3f4f6;
          border: none;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
        }

        .icon-button:hover {
          background: #e5e7eb;
        }

        .notification-badge {
          position: absolute;
          top: -4px;
          right: -4px;
          width: 18px;
          height: 18px;
          background: #ef4444;
          color: white;
          border-radius: 50%;
          font-size: 0.625rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .user-avatar {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 600;
          cursor: pointer;
        }

        .content-area {
          padding: 2rem;
        }

        .page-header {
          margin-bottom: 2rem;
        }

        .page-title {
          font-size: 2rem;
          font-weight: 700;
          color: #1a1a2e;
          margin-bottom: 0.5rem;
        }

        .page-subtitle {
          color: #6b7280;
          font-size: 1rem;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .stat-card {
          background: white;
          padding: 1.5rem;
          border-radius: 16px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .stat-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .stat-content {
          flex: 1;
        }

        .stat-value {
          font-size: 1.75rem;
          font-weight: 700;
          color: #1a1a2e;
          margin-bottom: 0.25rem;
        }

        .stat-label {
          font-size: 0.875rem;
          color: #6b7280;
        }

        .dashboard-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 2rem;
          margin-bottom: 2rem;
        }

        .card {
          background: white;
          padding: 1.5rem;
          border-radius: 16px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .card-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #1a1a2e;
        }

        .view-all-link {
          color: #3b82f6;
          font-size: 0.875rem;
          font-weight: 600;
          text-decoration: none;
          cursor: pointer;
        }

        .view-all-link:hover {
          text-decoration: underline;
        }

        .property-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .property-item {
          display: flex;
          gap: 1rem;
          padding: 1rem;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .property-item:hover {
          border-color: #3b82f6;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.1);
        }

        .property-image-small {
          width: 80px;
          height: 80px;
          border-radius: 8px;
          object-fit: cover;
          flex-shrink: 0;
        }

        .property-info {
          flex: 1;
        }

        .property-name {
          font-size: 0.9375rem;
          font-weight: 600;
          color: #1a1a2e;
          margin-bottom: 0.25rem;
        }

        .property-location-small {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          color: #6b7280;
          font-size: 0.8125rem;
          margin-bottom: 0.5rem;
        }

        .property-price-small {
          font-size: 1rem;
          font-weight: 700;
          color: #3b82f6;
        }

        .status-badge {
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
          align-self: flex-start;
        }

        .status-available {
          background: #d1fae5;
          color: #065f46;
        }

        .status-pending {
          background: #fef3c7;
          color: #92400e;
        }

        .tour-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          margin-bottom: 1rem;
        }

        .tour-info {
          flex: 1;
        }

        .tour-property {
          font-size: 0.9375rem;
          font-weight: 600;
          color: #1a1a2e;
          margin-bottom: 0.25rem;
        }

        .tour-details {
          font-size: 0.8125rem;
          color: #6b7280;
        }

        .tour-agent {
          font-size: 0.8125rem;
          color: #6b7280;
          margin-top: 0.25rem;
        }

        .activity-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .activity-item {
          display: flex;
          gap: 1rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #e5e7eb;
        }

        .activity-item:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        .activity-icon-wrapper {
          width: 36px;
          height: 36px;
          background: #eff6ff;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .activity-content {
          flex: 1;
        }

        .activity-action {
          font-size: 0.875rem;
          font-weight: 600;
          color: #1a1a2e;
          margin-bottom: 0.25rem;
        }

        .activity-property {
          font-size: 0.8125rem;
          color: #6b7280;
        }

        .activity-time {
          font-size: 0.75rem;
          color: #9ca3af;
          margin-top: 0.25rem;
        }

        @media (max-width: 1024px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .dashboard-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .sidebar {
            transform: translateX(-100%);
          }

          .sidebar.mobile-open {
            transform: translateX(0);
          }

          .main-content {
            margin-left: 0;
          }

          .menu-toggle {
            display: block;
          }

          .search-bar {
            display: none;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }

          .content-area {
            padding: 1rem;
          }

          .page-title {
            font-size: 1.5rem;
          }
        }
      `}</style>

      <div className="dashboard">
        {/* Sidebar */}
        <aside className={`sidebar ₹{sidebarOpen ? 'mobile-open' : 'mobile-hidden'}`}>
          <div className="logo-section">
            <div className="logo-circle">
              <div className="logo-circle-inner"></div>
            </div>
            <span className="logo-text">propEase</span>
          </div>

          <nav className="nav-menu">
            <div className={`nav-item ₹{activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>
              <Home className="nav-icon" />
              <span className="nav-label">Overview</span>
            </div>
            <div className={`nav-item ₹{activeTab === 'saved' ? 'active' : ''}`} onClick={() => setActiveTab('saved')}>
              <Heart className="nav-icon" />
              <span className="nav-label">Saved Properties</span>
            </div>
            <div className={`nav-item ₹{activeTab === 'tours' ? 'active' : ''}`} onClick={() => setActiveTab('tours')}>
              <Calendar className="nav-icon" />
              <span className="nav-label">Scheduled Tours</span>
            </div>
            <div className={`nav-item ₹{activeTab === 'messages' ? 'active' : ''}`} onClick={() => setActiveTab('messages')}>
              <MessageSquare className="nav-icon" />
              <span className="nav-label">Messages</span>
            </div>

            <div className="nav-divider"></div>

            <div className={`nav-item ₹{activeTab === 'settings' ? 'active' : ''}`} onClick={() => setActiveTab('settings')}>
              <Settings className="nav-icon" />
              <span className="nav-label">Settings</span>
            </div>
            <div className="nav-item">
              <LogOut className="nav-icon" />
              <span className="nav-label">Logout</span>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <div className={`main-content ₹{sidebarOpen ? '' : 'full-width'}`}>
          {/* Top Bar */}
          <div className="top-bar">
            <button className="menu-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <div className="search-bar">
              <Search size={18} className="search-icon" />
              <input 
                type="text" 
                placeholder="Search properties..."
                className="search-input"
              />
            </div>

            <div className="top-bar-actions">
              <button className="icon-button">
                <Bell size={20} />
                <span className="notification-badge">3</span>
              </button>
              <div className="user-avatar">JD</div>
            </div>
          </div>

          {/* Content Area */}
          <div className="content-area">
            <div className="page-header">
              <h1 className="page-title">Welcome back, John!</h1>
              <p className="page-subtitle">Here's what's happening with your property search</p>
            </div>

            {/* Stats Grid */}
            <div className="stats-grid">
              {stats.map((stat, index) => (
                <div key={index} className="stat-card">
                  <div className="stat-icon" style={{ background: `₹{stat.color}15` }}>
                    <stat.icon size={24} style={{ color: stat.color }} />
                  </div>
                  <div className="stat-content">
                    <div className="stat-value">{stat.value}</div>
                    <div className="stat-label">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Dashboard Grid */}
            <div className="dashboard-grid">
              {/* Saved Properties */}
              <div className="card">
                <div className="card-header">
                  <h2 className="card-title">Saved Properties</h2>
                  <a className="view-all-link">View All</a>
                </div>
                {loading ? (
                  <p style={{ color: '#6b7280' }}>Loading saved properties...</p>
                ) : savedProperties.length > 0 ? (
                  <div className="property-list">
                    {savedProperties.map((like) => {
                      const property = like.property;
                      const image = property.images && property.images.length > 0 
                        ? property.images[0].imageUrl 
                        : 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&q=80';
                      
                      return (
                        <div key={like.likeId} className="property-item">
                          <img src={image} alt={property.title} className="property-image-small" />
                          <div className="property-info">
                            <div className="property-name">{property.title}</div>
                            <div className="property-location-small">
                              <MapPin size={14} />
                              <span>{property.city}, {property.state}</span>
                            </div>
                            <div className="property-price-small">{formatPrice(property.price)}</div>
                          </div>
                          <span className={`status-badge ${property.status === 'AVAILABLE' ? 'status-available' : 'status-pending'}`}>
                            {property.status}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p style={{ color: '#6b7280' }}>No saved properties yet.</p>
                )}
              </div>

              {/* Right Column */}
              <div>
                {/* Upcoming Tours */}
                <div className="card" style={{ marginBottom: '2rem' }}>
                  <div className="card-header">
                    <h2 className="card-title">Upcoming Tours</h2>
                  </div>
                  {upcomingTours.map((tour) => (
                    <div key={tour.id} className="tour-item">
                      <div className="tour-info">
                        <div className="tour-property">{tour.property}</div>
                        <div className="tour-details">{tour.date} at {tour.time}</div>
                        <div className="tour-agent">Agent: {tour.agent}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Recent Activity */}
                <div className="card">
                  <div className="card-header">
                    <h2 className="card-title">Recent Activity</h2>
                  </div>
                  <div className="activity-list">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="activity-item">
                        <div className="activity-icon-wrapper">
                          <Heart size={18} style={{ color: '#3b82f6' }} />
                        </div>
                        <div className="activity-content">
                          <div className="activity-action">{activity.action}</div>
                          <div className="activity-property">{activity.property}</div>
                          <div className="activity-time">{activity.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}