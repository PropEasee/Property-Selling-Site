import React, { useState } from 'react';
import { Home, Plus, Eye, MessageSquare, TrendingUp, DollarSign, Bell, User, Search, Settings, LogOut, Menu, X, Edit, Trash2, MapPin, BarChart3 } from 'lucide-react';

export default function SellerDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showAddPropertyModal, setShowAddPropertyModal] = useState(false);

  const stats = [
    { label: 'Total Properties', value: '12', icon: Home, color: '#3b82f6' },
    { label: 'Total Views', value: '2,847', icon: Eye, color: '#10b981' },
    { label: 'Total Inquiries', value: '34', icon: MessageSquare, color: '#f59e0b' },
    { label: 'Total Sales', value: '$4.2M', icon: DollarSign, color: '#8b5cf6' }
  ];

  const listedProperties = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=400&q=80",
      title: "103/143 West Street, Crows Nest",
      price: "$1,250,000",
      location: "Sydney, NSW",
      bedrooms: 4,
      bathrooms: 3,
      area: "250 M",
      status: "Active",
      views: 245,
      inquiries: 8,
      listedDate: "Nov 15, 2025"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&q=80",
      title: "245 Oak Avenue, Melbourne",
      price: "$890,000",
      location: "Melbourne, VIC",
      bedrooms: 3,
      bathrooms: 2,
      area: "200 M",
      status: "Active",
      views: 189,
      inquiries: 5,
      listedDate: "Nov 28, 2025"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&q=80",
      title: "78 Beach Road, Brisbane",
      price: "$675,500",
      location: "Brisbane, QLD",
      bedrooms: 3,
      bathrooms: 2,
      area: "180 M",
      status: "Sold",
      views: 456,
      inquiries: 12,
      listedDate: "Oct 10, 2025"
    }
  ];

  const recentInquiries = [
    {
      id: 1,
      buyerName: "John Smith",
      property: "103/143 West Street",
      date: "Dec 6, 2025",
      message: "Interested in viewing the property"
    },
    {
      id: 2,
      buyerName: "Sarah Johnson",
      property: "245 Oak Avenue",
      date: "Dec 5, 2025",
      message: "Can we negotiate the price?"
    },
    {
      id: 3,
      buyerName: "Michael Brown",
      property: "103/143 West Street",
      date: "Dec 4, 2025",
      message: "Is the property still available?"
    }
  ];

  const recentActivity = [
    { id: 1, action: "New inquiry received", property: "245 Oak Avenue", time: "2 hours ago" },
    { id: 2, action: "Property viewed", property: "103/143 West Street", time: "5 hours ago" },
    { id: 3, action: "Listed new property", property: "78 Beach Road", time: "1 day ago" }
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

        .top-bar-left {
          display: flex;
          align-items: center;
          gap: 2rem;
          flex: 1;
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

        .add-property-button {
          background: #3b82f6;
          color: white;
          border: none;
          padding: 0.75rem 1.25rem;
          border-radius: 10px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .add-property-button:hover {
          background: #2563eb;
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

        .property-header-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 0.5rem;
        }

        .property-name {
          font-size: 0.9375rem;
          font-weight: 600;
          color: #1a1a2e;
        }

        .property-stats {
          display: flex;
          gap: 1.5rem;
          font-size: 0.8125rem;
          color: #6b7280;
          margin-bottom: 0.5rem;
        }

        .stat-item {
          display: flex;
          align-items: center;
          gap: 0.25rem;
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
        }

        .status-active {
          background: #d1fae5;
          color: #065f46;
        }

        .status-sold {
          background: #dbeafe;
          color: #1e40af;
        }

        .status-pending {
          background: #fef3c7;
          color: #92400e;
        }

        .property-actions {
          display: flex;
          gap: 0.5rem;
          align-items: center;
        }

        .action-button {
          width: 32px;
          height: 32px;
          background: #f3f4f6;
          border: none;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          color: #6b7280;
        }

        .action-button:hover {
          background: #e5e7eb;
          color: #3b82f6;
        }

        .action-button.delete:hover {
          background: #fee2e2;
          color: #ef4444;
        }

        .inquiry-item {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding: 1rem;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          margin-bottom: 1rem;
        }

        .inquiry-info {
          flex: 1;
        }

        .inquiry-buyer {
          font-size: 0.9375rem;
          font-weight: 600;
          color: #1a1a2e;
          margin-bottom: 0.25rem;
        }

        .inquiry-property {
          font-size: 0.8125rem;
          color: #6b7280;
          margin-bottom: 0.25rem;
        }

        .inquiry-message {
          font-size: 0.8125rem;
          color: #6b7280;
          font-style: italic;
          margin-bottom: 0.25rem;
        }

        .inquiry-date {
          font-size: 0.75rem;
          color: #9ca3af;
        }

        .inquiry-actions {
          display: flex;
          gap: 0.5rem;
        }

        .reply-button {
          padding: 0.5rem 1rem;
          background: #3b82f6;
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 0.75rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .reply-button:hover {
          background: #2563eb;
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

        .modal-overlay {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 200;
        }

        .modal-overlay.active {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .modal {
          background: white;
          border-radius: 16px;
          padding: 2rem;
          max-width: 500px;
          width: 90%;
          max-height: 80vh;
          overflow-y: auto;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .modal-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1a1a2e;
        }

        .modal-close {
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          color: #6b7280;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-label {
          display: block;
          font-size: 0.875rem;
          font-weight: 600;
          color: #1a1a2e;
          margin-bottom: 0.5rem;
        }

        .form-input {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          font-size: 0.875rem;
          outline: none;
          transition: border-color 0.3s ease;
        }

        .form-input:focus {
          border-color: #3b82f6;
        }

        .modal-buttons {
          display: flex;
          gap: 1rem;
          margin-top: 2rem;
        }

        .button-primary {
          flex: 1;
          padding: 0.75rem;
          background: #3b82f6;
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .button-primary:hover {
          background: #2563eb;
        }

        .button-secondary {
          flex: 1;
          padding: 0.75rem;
          background: #f3f4f6;
          color: #6b7280;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .button-secondary:hover {
          background: #e5e7eb;
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

          .top-bar-left {
            gap: 0;
          }

          .search-bar {
            display: none;
          }

          .add-property-button {
            padding: 0.75rem;
          }

          .add-property-button span {
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

          .property-stats {
            flex-direction: column;
            gap: 0.5rem;
          }

          .modal {
            width: 95%;
          }
        }
      `}</style>

      <div className="dashboard">
        {/* Sidebar */}
        <aside className={`sidebar ${sidebarOpen ? 'mobile-open' : 'mobile-hidden'}`}>
          <div className="logo-section">
            <div className="logo-circle">
              <div className="logo-circle-inner"></div>
            </div>
            <span className="logo-text">logoipsum</span>
          </div>

          <nav className="nav-menu">
            <div className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>
              <Home className="nav-icon" />
              <span className="nav-label">Overview</span>
            </div>
            <div className={`nav-item ${activeTab === 'properties' ? 'active' : ''}`} onClick={() => setActiveTab('properties')}>
              <Home className="nav-icon" />
              <span className="nav-label">My Properties</span>
            </div>
            <div className={`nav-item ${activeTab === 'inquiries' ? 'active' : ''}`} onClick={() => setActiveTab('inquiries')}>
              <MessageSquare className="nav-icon" />
              <span className="nav-label">Inquiries</span>
            </div>
            <div className={`nav-item ${activeTab === 'analytics' ? 'active' : ''}`} onClick={() => setActiveTab('analytics')}>
              <BarChart3 className="nav-icon" />
              <span className="nav-label">Analytics</span>
            </div>

            <div className="nav-divider"></div>

            <div className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => setActiveTab('settings')}>
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
        <div className={`main-content ${sidebarOpen ? '' : 'full-width'}`}>
          {/* Top Bar */}
          <div className="top-bar">
            <div className="top-bar-left">
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
            </div>

            <div className="top-bar-actions">
              <button className="add-property-button" onClick={() => setShowAddPropertyModal(true)}>
                <Plus size={18} />
                <span>List Property</span>
              </button>
              <button className="icon-button">
                <Bell size={20} />
                <span className="notification-badge">5</span>
              </button>
              <div className="user-avatar">SE</div>
            </div>
          </div>

          {/* Content Area */}
          <div className="content-area">
            <div className="page-header">
              <h1 className="page-title">Welcome back, Seller!</h1>
              <p className="page-subtitle">Manage your properties and track inquiries</p>
            </div>

            {/* Stats Grid */}
            <div className="stats-grid">
              {stats.map((stat, index) => (
                <div key={index} className="stat-card">
                  <div className="stat-icon" style={{ background: `${stat.color}15` }}>
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
              {/* Listed Properties */}
              <div className="card">
                <div className="card-header">
                  <h2 className="card-title">My Properties</h2>
                  <a className="view-all-link">View All</a>
                </div>
                <div className="property-list">
                  {listedProperties.map((property) => (
                    <div key={property.id} className="property-item">
                      <img src={property.image} alt={property.title} className="property-image-small" />
                      <div className="property-info">
                        <div className="property-header-row">
                          <div className="property-name">{property.title}</div>
                          <span className={`status-badge status-${property.status.toLowerCase()}`}>
                            {property.status}
                          </span>
                        </div>
                        <div className="property-stats">
                          <div className="stat-item">
                            <Eye size={14} />
                            <span>{property.views} views</span>
                          </div>
                          <div className="stat-item">
                            <MessageSquare size={14} />
                            <span>{property.inquiries} inquiries</span>
                          </div>
                        </div>
                        <div className="property-location-small">
                          <MapPin size={14} />
                          <span>{property.location}</span>
                        </div>
                        <div className="property-price-small">{property.price}</div>
                      </div>
                      <div className="property-actions">
                        <button className="action-button" title="Edit Property">
                          <Edit size={18} />
                        </button>
                        <button className="action-button delete" title="Delete Property">
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
                <div className="card" style={{ marginBottom: '2rem' }}>
                  <div className="card-header">
                    <h2 className="card-title">Recent Inquiries</h2>
                  </div>
                  {recentInquiries.map((inquiry) => (
                    <div key={inquiry.id} className="inquiry-item">
                      <div className="inquiry-info">
                        <div className="inquiry-buyer">{inquiry.buyerName}</div>
                        <div className="inquiry-property">{inquiry.property}</div>
                        <div className="inquiry-message">"{inquiry.message}"</div>
                        <div className="inquiry-date">{inquiry.date}</div>
                      </div>
                      <div className="inquiry-actions">
                        <button className="reply-button">Reply</button>
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
                          <MessageSquare size={18} style={{ color: '#3b82f6' }} />
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

      {/* Add Property Modal */}
      <div className={`modal-overlay ${showAddPropertyModal ? 'active' : ''}`}>
        <div className="modal">
          <div className="modal-header">
            <h2 className="modal-title">List New Property</h2>
            <button className="modal-close" onClick={() => setShowAddPropertyModal(false)}>×</button>
          </div>

          <form>
            <div className="form-group">
              <label className="form-label">Property Title</label>
              <input type="text" className="form-input" placeholder="Enter property title" />
            </div>

            <div className="form-group">
              <label className="form-label">Location</label>
              <input type="text" className="form-input" placeholder="Enter property location" />
            </div>

            <div className="form-group">
              <label className="form-label">Price</label>
              <input type="number" className="form-input" placeholder="Enter property price" />
            </div>

            <div className="form-group">
              <label className="form-label">Bedrooms</label>
              <input type="number" className="form-input" placeholder="Number of bedrooms" />
            </div>

            <div className="form-group">
              <label className="form-label">Bathrooms</label>
              <input type="number" className="form-input" placeholder="Number of bathrooms" />
            </div>

            <div className="form-group">
              <label className="form-label">Area (Sq. M)</label>
              <input type="number" className="form-input" placeholder="Property area" />
            </div>

            <div className="form-group">
              <label className="form-label">Description</label>
              <input type="text" className="form-input" placeholder="Property description" style={{ minHeight: '100px', padding: '0.75rem' }} />
            </div>

            <div className="modal-buttons">
              <button type="submit" className="button-primary">List Property</button>
              <button type="button" className="button-secondary" onClick={() => setShowAddPropertyModal(false)}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
