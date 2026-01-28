import React, { useState } from 'react';
import {
  Search, Filter, Download, Plus, Eye, Edit2, Trash2, Mail,
  ChevronLeft, ChevronRight, AlertCircle, MoreVertical, 
  User, Users, Phone, Calendar, MapPin, CheckCircle, XCircle
} from 'lucide-react';

export default function AdminUsersList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [viewType, setViewType] = useState('table');
  const [selectedUsers, setSelectedUsers] = useState([]);

  const itemsPerPage = 10;

  // Sample user data
  const allUsers = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+91 98765 43210',
      role: 'Seller',
      joinDate: '2023-06-15',
      location: 'New York, NY',
      properties: 5,
      avatar: 'https://via.placeholder.com/40x40?text=JD'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      phone: '+91 98765 54321',
      role: 'Buyer',
      joinDate: '2023-07-20',
      location: 'Los Angeles, CA',
      properties: 0,
      avatar: 'https://via.placeholder.com/40x40?text=JS'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike.johnson@example.com',
      phone: '+91 98765 65432',
      role: 'Seller',
      joinDate: '2023-08-10',
      location: 'Chicago, IL',
      properties: 3,
      avatar: 'https://via.placeholder.com/40x40?text=MJ'
    },
    {
      id: 4,
      name: 'Sarah Wilson',
      email: 'sarah.wilson@example.com',
      phone: '+91 98765 76543',
      role: 'Buyer',
      joinDate: '2023-09-05',
      location: 'Houston, TX',
      properties: 0,
      avatar: 'https://via.placeholder.com/40x40?text=SW'
    },
    {
      id: 5,
      name: 'Robert Brown',
      email: 'robert.brown@example.com',
      phone: '+91 98765 87654',
      role: 'Seller',
      joinDate: '2023-10-12',
      location: 'Miami, FL',
      properties: 8,
      avatar: 'https://via.placeholder.com/40x40?text=RB'
    },
    {
      id: 6,
      name: 'Emily Davis',
      email: 'emily.davis@example.com',
      phone: '+91 98765 98765',
      role: 'Buyer',
      joinDate: '2023-11-08',
      location: 'Dallas, TX',
      properties: 0,
      avatar: 'https://via.placeholder.com/40x40?text=ED'
    },
    {
      id: 7,
      name: 'David Martinez',
      email: 'david.martinez@example.com',
      phone: '+91 98766 10101',
      role: 'Seller',
      joinDate: '2023-12-01',
      location: 'Denver, CO',
      properties: 2,
      avatar: 'https://via.placeholder.com/40x40?text=DM'
    },
    {
      id: 8,
      name: 'Lisa Anderson',
      email: 'lisa.anderson@example.com',
      phone: '+91 98766 21212',
      role: 'Buyer',
      joinDate: '2024-01-15',
      location: 'San Francisco, CA',
      properties: 0,
      avatar: 'https://via.placeholder.com/40x40?text=LA'
    },
    {
      id: 9,
      name: 'James Wilson',
      email: 'james.wilson@example.com',
      phone: '+91 98766 32323',
      role: 'Seller',
      joinDate: '2024-01-20',
      location: 'Boston, MA',
      properties: 6,
      avatar: 'https://via.placeholder.com/40x40?text=JW'
    },
    {
      id: 10,
      name: 'Patricia Lee',
      email: 'patricia.lee@example.com',
      phone: '+91 98766 43434',
      role: 'Buyer',
      joinDate: '2024-02-01',
      location: 'Seattle, WA',
      properties: 0,
      avatar: 'https://via.placeholder.com/40x40?text=PL'
    },
    {
      id: 11,
      name: 'Mark Thompson',
      email: 'mark.thompson@example.com',
      phone: '+91 98766 54545',
      role: 'Seller',
      joinDate: '2024-02-10',
      location: 'Phoenix, AZ',
      properties: 4,
      avatar: 'https://via.placeholder.com/40x40?text=MT'
    },
    {
      id: 12,
      name: 'Jennifer White',
      email: 'jennifer.white@example.com',
      phone: '+91 98766 65656',
      role: 'Buyer',
      joinDate: '2024-02-20',
      location: 'Portland, OR',
      properties: 0,
      avatar: 'https://via.placeholder.com/40x40?text=JW'
    }
  ];

  // Filter users
  const filteredUsers = allUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedUsers(paginatedUsers.map(u => u.id));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleSelectUser = (id) => {
    setSelectedUsers(prev =>
      prev.includes(id) ? prev.filter(u => u !== id) : [...prev, id]
    );
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

        .users-list-container {
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

        /* Stats Bar */
        .stats-bar {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .stat-item {
          background: white;
          border-radius: 0.75rem;
          padding: 1rem;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .stat-icon {
          width: 50px;
          height: 50px;
          border-radius: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 1.5rem;
        }

        .stat-content h3 {
          margin: 0;
          font-size: 1.5rem;
          font-weight: 700;
          color: #212529;
        }

        .stat-content p {
          margin: 0;
          font-size: 0.85rem;
          color: #6c757d;
        }

        /* Controls Card */
        .controls-card {
          background: white;
          border-radius: 1rem;
          padding: 1.5rem;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
          margin-bottom: 2rem;
        }

        .controls-grid {
          display: grid;
          grid-template-columns: 1fr auto;
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

        /* Table View */
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

        .user-info {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .user-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #e9ecef;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 600;
          font-size: 0.85rem;
        }

        .user-details h4 {
          margin: 0;
          font-weight: 600;
          color: #212529;
          font-size: 0.95rem;
        }

        .user-email {
          margin: 0.25rem 0 0 0;
          font-size: 0.8rem;
          color: #6c757d;
        }

        .badge-custom {
          display: inline-flex;
          align-items: center;
          gap: 0.375rem;
          padding: 0.375rem 0.75rem;
          border-radius: 50px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
        }

        .badge-seller {
          background-color: #e7f3ff;
          color: #0056b3;
        }

        .badge-buyer {
          background-color: #e8f5e9;
          color: #2e7d32;
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

        /* Grid View */
        .users-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .user-card {
          background: white;
          border-radius: 1rem;
          padding: 1.5rem;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
          transition: transform 0.3s, box-shadow 0.3s;
        }

        .user-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 16px rgba(0,0,0,0.12);
        }

        .card-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #e9ecef;
        }

        .card-avatar {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: #007bff;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 600;
          font-size: 1.25rem;
        }

        .card-user-info h3 {
          margin: 0;
          font-size: 1rem;
          font-weight: 600;
          color: #212529;
        }

        .card-user-info p {
          margin: 0.25rem 0 0 0;
          font-size: 0.85rem;
          color: #6c757d;
        }

        .card-body {
          margin-bottom: 1rem;
        }

        .info-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.75rem;
          font-size: 0.9rem;
          color: #495057;
        }

        .info-row svg {
          color: #6c757d;
          flex-shrink: 0;
        }

        .card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.75rem;
        }

        .properties-count {
          font-size: 0.85rem;
          color: #6c757d;
        }

        .properties-count strong {
          color: #212529;
          font-weight: 600;
        }

        /* Pagination */
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
          background: white;
          border-radius: 1rem;
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
            grid-template-columns: 1fr;
          }

          .users-grid {
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          }
        }

        @media (max-width: 768px) {
          .page-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .controls-grid {
            grid-template-columns: 1fr;
          }

          .search-input {
            width: 100%;
          }

          .stats-bar {
            grid-template-columns: repeat(2, 1fr);
          }

          .users-grid {
            grid-template-columns: 1fr;
          }

          .table-custom th,
          .table-custom td {
            padding: 0.75rem 0.5rem;
            font-size: 0.8rem;
          }

          .user-info {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>

      <div className="users-list-container">
        <div className="container-fluid">
          {/* Page Header */}
          <div className="page-header">
            <div className="header-title">
              <h1>Users Management</h1>
              <p>Manage buyers and sellers on the platform</p>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="stats-bar">
            <div className="stat-item">
              <div className="stat-icon" style={{ backgroundColor: '#007bff' }}>
                <Users size={24} />
              </div>
              <div className="stat-content">
                <h3>{filteredUsers.length}</h3>
                <p>Total Users</p>
              </div>
            </div>

            <div className="stat-item">
              <div className="stat-icon" style={{ backgroundColor: '#17a2b8' }}>
                👤
              </div>
              <div className="stat-content">
                <h3>{filteredUsers.filter(u => u.role === 'Seller').length}</h3>
                <p>Total Sellers</p>
              </div>
            </div>

            <div className="stat-item">
              <div className="stat-icon" style={{ backgroundColor: '#28a745' }}>
                👥
              </div>
              <div className="stat-content">
                <h3>{filteredUsers.filter(u => u.role === 'Buyer').length}</h3>
                <p>Total Buyers</p>
              </div>
            </div>

            <div className="stat-item">
              <div className="stat-icon" style={{ backgroundColor: '#ffc107' }}>
                ✓
              </div>
              <div className="stat-content">
                <h3>{filteredUsers.length}</h3>
                <p>Active Users</p>
              </div>
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
                  placeholder="Search by name, email, or location..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>

              <select
                className="filter-select"
                value={filterRole}
                onChange={(e) => {
                  setFilterRole(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="all">All Roles</option>
                <option value="Seller">Sellers</option>
                <option value="Buyer">Buyers</option>
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
            Showing <strong>{filteredUsers.length}</strong> users
            {selectedUsers.length > 0 && ` | ${selectedUsers.length} selected`}
          </div>

          {/* Table View */}
          {viewType === 'table' && (
            <div className="table-card">
              {filteredUsers.length > 0 ? (
                <div className="table-responsive">
                  <table className="table-custom">
                    <thead>
                      <tr>
                        <th style={{ width: '40px' }}>
                          <input
                            type="checkbox"
                            className="checkbox-custom"
                            checked={selectedUsers.length === paginatedUsers.length && paginatedUsers.length > 0}
                            onChange={handleSelectAll}
                          />
                        </th>
                        <th>User</th>
                        <th>Contact</th>
                        <th>Location</th>
                        <th>Role</th>
                        <th>Join Date</th>
                        <th>Properties</th>
                        <th style={{ width: '120px' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedUsers.map((user) => (
                        <tr key={user.id}>
                          <td>
                            <input
                              type="checkbox"
                              className="checkbox-custom"
                              checked={selectedUsers.includes(user.id)}
                              onChange={() => handleSelectUser(user.id)}
                            />
                          </td>
                          <td>
                            <div className="user-info">
                              <div className="user-avatar" style={{ backgroundColor: user.role === 'Seller' ? '#007bff' : '#28a745' }}>
                                {user.name.split(' ').map(n => n[0]).join('')}
                              </div>
                              <div className="user-details">
                                <h4>{user.name}</h4>
                                <p className="user-email">{user.email}</p>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Phone size={14} style={{ color: '#6c757d' }} />
                                {user.phone}
                              </div>
                              <a href={`mailto:${user.email}`} style={{ color: '#007bff', textDecoration: 'none', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Mail size={14} />
                                Email
                              </a>
                            </div>
                          </td>
                          <td>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                              <MapPin size={14} style={{ color: '#6c757d' }} />
                              {user.location}
                            </div>
                          </td>
                          <td>
                            <span className={`badge-custom badge-${user.role.toLowerCase()}`}>
                              {user.role}
                            </span>
                          </td>
                          <td>{user.joinDate}</td>
                          <td style={{ fontWeight: '600', color: '#212529' }}>
                            {user.properties > 0 ? `${user.properties} listed` : 'N/A'}
                          </td>
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
                  <div className="empty-state-icon">👥</div>
                  <div className="empty-state-title">No Users Found</div>
                  <p>Try adjusting your search filters</p>
                </div>
              )}
            </div>
          )}

          {/* Grid View */}
          {viewType === 'grid' && (
            <>
              {filteredUsers.length > 0 ? (
                <div className="users-grid">
                  {paginatedUsers.map((user) => (
                    <div key={user.id} className="user-card">
                      <div className="card-header">
                        <div className="card-avatar" style={{ backgroundColor: user.role === 'Seller' ? '#007bff' : '#28a745' }}>
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="card-user-info">
                          <h3>{user.name}</h3>
                          <p>{user.email}</p>
                        </div>
                      </div>

                      <div className="card-body">
                        <div className="info-row">
                          <Phone size={16} />
                          <span>{user.phone}</span>
                        </div>

                        <div className="info-row">
                          <MapPin size={16} />
                          <span>{user.location}</span>
                        </div>

                        <div className="info-row">
                          <Calendar size={16} />
                          <span>Joined {user.joinDate}</span>
                        </div>

                        <div style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid #e9ecef' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                            <span className={`badge-custom badge-${user.role.toLowerCase()}`}>
                              {user.role}
                            </span>
                          </div>

                          {user.properties > 0 && (
                            <div className="properties-count">
                              <strong>{user.properties}</strong> properties listed
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="card-footer">
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
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <div className="empty-state-icon">👥</div>
                  <div className="empty-state-title">No Users Found</div>
                  <p>Try adjusting your search filters</p>
                </div>
              )}
            </>
          )}

          {/* Pagination */}
          {filteredUsers.length > 0 && (
            <div className="pagination-container">
              <button
                className="pagination-btn"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft size={18} />
              </button>

              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                let page;
                if (totalPages <= 5) {
                  page = i + 1;
                } else if (currentPage <= 3) {
                  page = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  page = totalPages - 4 + i;
                } else {
                  page = currentPage - 2 + i;
                }
                return page;
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