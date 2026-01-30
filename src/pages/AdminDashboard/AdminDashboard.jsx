import React, { useState, useEffect } from 'react';
import { 
  Users, Home, ArrowUp, ArrowDown, Eye, Edit2, Trash2, Search
} from 'lucide-react';
import { fetchWithAuth } from '../../utils/api/fetchWithAuth';

const API_BASE_URL = 'http://localhost:8080/api';

export default function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [stats, setStats] = useState(null);
  const [properties, setProperties] = useState([]);
  const [users, setUsers] = useState([]);
  const [buyerCount, setBuyerCount] = useState(0);
  const [sellerCount, setSellerCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch Dashboard Stats
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetchWithAuth(`${API_BASE_URL}/admin/stats`);
        if (!response.ok) throw new Error('Failed to fetch stats');
        const data = await response.json();
        console.log('Stats API Response:', data);
        
        setStats([
          {
            title: 'Total Properties',
            value: data.totalProperties?.toString() || properties.length.toString() || '0',
            change: '+12.5%',
            isPositive: true,
            icon: Home,
            color: '#17a2b8'
          },
          {
            title: 'Active Users',
            value: data.totalUsers?.toString() || users.length.toString() || '0',
            change: '+8.2%',
            isPositive: true,
            icon: Users,
            color: '#007bff'
          }
        ]);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching stats:', err);
        setStats([
          {
            title: 'Total Properties',
            value: properties.length.toString() || '0',
            change: '+12.5%',
            isPositive: true,
            icon: Home,
            color: '#17a2b8'
          },
          {
            title: 'Active Users',
            value: users.length.toString() || '0',
            change: '+8.2%',
            isPositive: true,
            icon: Users,
            color: '#007bff'
          }
        ]);
      }
    };
    fetchStats();
  }, [properties.length, users.length]);

  // Fetch Properties
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const url = searchTerm 
          ? `${API_BASE_URL}/admin/properties?search=${searchTerm}`
          : `${API_BASE_URL}/admin/properties/no-images`;
        
        const response = await fetchWithAuth(url);
        if (!response.ok) throw new Error('Failed to fetch properties');
        const data = await response.json();
        console.log('Properties API Response:', data);
        setProperties(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching properties:', err);
      }
    };
    fetchProperties();
  }, [searchTerm]);

  // Fetch Users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const url = searchTerm
          ? `${API_BASE_URL}/users?page=0&size=100&search=${searchTerm}`
          : `${API_BASE_URL}/users?page=0&size=100`;
        
        const response = await fetchWithAuth(url);
        if (!response.ok) throw new Error('Failed to fetch users');
        const data = await response.json();
        const userList = data.content || [];
        setUsers(userList);
        
        // Count buyers and sellers
        const buyers = userList.filter(u => u.role === 'BUYER').length;
        const sellers = userList.filter(u => u.role === 'SELLER').length;
        setBuyerCount(buyers);
        setSellerCount(sellers);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching users:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [searchTerm]);

  const handleView = (id) => {
    console.log('View item:', id);
  };

  const handleEdit = (id) => {
    console.log('Edit item:', id);
  };

  const handleDelete = async (id, type) => {
    if (window.confirm(`Are you sure you want to delete this ${type}?`)) {
      try {
        const endpoint = type === 'user' ? `/users/${id}` : `/admin/properties/${id}`;
        const response = await fetchWithAuth(`${API_BASE_URL}${endpoint}`, {
          method: 'DELETE'
        });
        if (!response.ok) throw new Error(`Failed to delete ${type}`);
        
        if (type === 'user') {
          setUsers(users.filter(u => u.id !== id));
        } else {
          setProperties(properties.filter(p => p.id !== id));
        }
        alert(`${type.charAt(0).toUpperCase() + type.slice(1)} deleted successfully`);
      } catch (err) {
        alert(`Error: ${err.message}`);
      }
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await fetchWithAuth(`${API_BASE_URL}/admin/properties/${id}/force-status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (!response.ok) throw new Error('Failed to update status');
      const updatedProperty = await response.json();
      setProperties(properties.map(p => p.id === id ? updatedProperty : p));
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  const filteredProperties = properties.filter(p => {
    if (filterType === 'all') return true;
    return p.status.toLowerCase() === filterType.toLowerCase();
  });

  if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>;
  if (error) return <div style={{ padding: '2rem', color: 'red' }}>Error: {error}</div>;

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

        .admin-dashboard {
          padding: 2rem 0;
          min-height: 100vh;
          background-color: #f8f9fa;
        }

        .dashboard-header {
          margin-bottom: 3rem;
        }

        .dashboard-title {
          font-size: 2rem;
          font-weight: 700;
          color: #212529;
          margin-bottom: 0.5rem;
        }

        .dashboard-subtitle {
          color: #6c757d;
          font-size: 1rem;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-bottom: 3rem;
        }

        .stat-card {
          background: white;
          border-radius: 1rem;
          padding: 1.5rem;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
          transition: transform 0.3s, box-shadow 0.3s;
        }

        .stat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 16px rgba(0,0,0,0.12);
        }

        .stat-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1rem;
        }

        .stat-icon {
          width: 50px;
          height: 50px;
          border-radius: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .stat-title {
          color: #6c757d;
          font-size: 0.875rem;
          font-weight: 500;
        }

        .stat-value {
          font-size: 1.75rem;
          font-weight: 700;
          color: #212529;
          margin: 0.5rem 0;
        }

        .stat-change {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          font-weight: 600;
        }

        .stat-change.positive {
          color: #28a745;
        }

        .content-card {
          background: white;
          border-radius: 1rem;
          padding: 1.5rem;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
          margin-bottom: 2rem;
        }

        .card-header-custom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #e9ecef;
        }

        .card-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: #212529;
        }

        .search-filter-bar {
          display: flex;
          gap: 1rem;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
        }

        .search-input {
          flex: 1;
          min-width: 200px;
          padding: 0.625rem 1rem;
          border: 1px solid #ced4da;
          border-radius: 0.5rem;
          font-size: 0.875rem;
        }

        .search-input:focus {
          outline: none;
          border-color: #007bff;
          box-shadow: 0 0 0 0.2rem rgba(0,123,255,0.25);
        }

        .filter-select {
          padding: 0.625rem 1rem;
          border: 1px solid #ced4da;
          border-radius: 0.5rem;
          font-size: 0.875rem;
          background: white;
          cursor: pointer;
        }

        .filter-select:focus {
          outline: none;
          border-color: #007bff;
          box-shadow: 0 0 0 0.2rem rgba(0,123,255,0.25);
        }

        .table-responsive {
          overflow-x: auto;
        }

        .table-custom {
          width: 100%;
          border-collapse: collapse;
        }

        .table-custom thead {
          background-color: #f8f9fa;
          border-bottom: 2px solid #e9ecef;
        }

        .table-custom th {
          padding: 1rem;
          text-align: left;
          font-size: 0.875rem;
          font-weight: 600;
          color: #6c757d;
          text-transform: uppercase;
        }

        .table-custom td {
          padding: 1rem;
          border-bottom: 1px solid #e9ecef;
          font-size: 0.875rem;
          color: #495057;
        }

        .table-custom tbody tr:hover {
          background-color: #f8f9fa;
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
          width: 32px;
          height: 32px;
          border: none;
          border-radius: 0.375rem;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s;
          background: none;
          padding: 0;
        }

        .btn-view {
          background: #e3f2fd !important;
          color: #1976d2;
        }

        .btn-view:hover {
          background: #bbdefb !important;
        }

        .btn-edit {
          background: #fff3e0 !important;
          color: #f57c00;
        }

        .btn-edit:hover {
          background: #ffe0b2 !important;
        }

        .btn-delete {
          background: #ffebee !important;
          color: #c62828;
        }

        .btn-delete:hover {
          background: #ffcdd2 !important;
        }

        .status-select {
          padding: 0.375rem 0.5rem;
          border: 1px solid #ced4da;
          border-radius: 0.375rem;
          font-size: 0.75rem;
          cursor: pointer;
        }

        .two-column-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          margin-top: 2rem;
        }

        @media (max-width: 1200px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .two-column-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .stats-grid {
            grid-template-columns: 1fr;
          }

          .search-filter-bar {
            flex-direction: column;
          }

          .search-input,
          .filter-select {
            width: 100%;
          }

          .two-column-grid {
            grid-template-columns: 1fr;
          }

          .dashboard-title {
            font-size: 1.5rem;
          }
        }
      `}</style>

      <div className="admin-dashboard">
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 1rem' }}>
          {/* Dashboard Header */}
          <div className="dashboard-header">
            <h1 className="dashboard-title">Admin Dashboard</h1>
            <p className="dashboard-subtitle">Welcome back, Administrator. Here's your system overview.</p>
          </div>

          {/* Stats Cards */}
          {stats && (
            <div className="stats-grid">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="stat-card">
                    <div className="stat-header">
                      <div>
                        <p className="stat-title">{stat.title}</p>
                        <p className="stat-value">{stat.value}</p>
                      </div>
                      <div className="stat-icon" style={{ backgroundColor: stat.color }}>
                        <Icon size={24} />
                      </div>
                    </div>
                    <div className={`stat-change ${stat.isPositive ? 'positive' : 'negative'}`}>
                      <ArrowUp size={16} />
                      <span>{stat.change}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Recent Properties */}
          <div className="content-card">
            <div className="card-header-custom">
              <h2 className="card-title">Recent Properties</h2>
            </div>

            <div className="search-filter-bar">
              <div style={{ flex: 1, display: 'flex', gap: '0.5rem', alignItems: 'center', minWidth: '200px' }}>
                <Search size={16} color="#6c757d" />
                <input
                  type="text"
                  className="search-input"
                  placeholder="Search properties..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ flex: 1 }}
                />
              </div>
              <select 
                className="filter-select"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="available">Available</option>
                <option value="pending">Pending</option>
                <option value="sold">Sold</option>
              </select>
            </div>

            <div className="table-responsive">
              <table className="table-custom">
                <thead>
                  <tr>
                    <th>Property Title</th>
                    <th>Seller</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProperties.length > 0 ? (
                    filteredProperties.map((property) => (
                      <tr key={property.id}>
                        <td>{property.title}</td>
                        <td>
                          {property.name}
                        </td>
                        <td>₹{property.price}</td>
                        <td>
                          <select 
                            className="status-select"
                            value={property.status}
                            onChange={(e) => handleStatusChange(property.id, e.target.value)}
                          >
                            <option value="Available">Available</option>
                            <option value="Pending">Pending</option>
                            <option value="Sold">Sold</option>
                          </select>
                        </td>
                        <td>{new Date(property.createdAt).toLocaleDateString()}</td>
                        
                      </tr>
                    ))
                  ) : (
                    <tr><td colSpan="6" style={{ textAlign: 'center' }}>No properties found</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Users and More Info Grid */}
          <div className="two-column-grid">
            {/* Active Users */}
            <div className="content-card">
              <div className="card-header-custom">
                <h2 className="card-title">Active Users</h2>
              </div>

              <div className="table-responsive">
                <table className="table-custom">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.length > 0 ? (
                      users.map((user) => (
                        <tr key={user.id}>
                          <td><strong>{user.name}</strong></td>
                          <td>{user.email}</td>
                          <td>{user.role}</td>
                          
                        </tr>
                      ))
                    ) : (
                      <tr><td colSpan="4" style={{ textAlign: 'center' }}>No users found</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="content-card">
              <h2 className="card-title">System Overview</h2>
              
              <div style={{ marginTop: '1.5rem' }}>
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.875rem', fontWeight: '500', color: '#6c757d' }}>Properties Listed</span>
                    <span style={{ fontSize: '0.875rem', fontWeight: '600', color: '#212529' }}>{properties.length}</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', backgroundColor: '#e9ecef', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: '85%', height: '100%', backgroundColor: '#007bff' }} />
                  </div>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.875rem', fontWeight: '500', color: '#6c757d' }}>Total Users</span>
                    <span style={{ fontSize: '0.875rem', fontWeight: '600', color: '#212529' }}>{users.length}</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', backgroundColor: '#e9ecef', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: '72%', height: '100%', backgroundColor: '#17a2b8' }} />
                  </div>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.875rem', fontWeight: '500', color: '#6c757d' }}>Buyers</span>
                    <span style={{ fontSize: '0.875rem', fontWeight: '600', color: '#212529' }}>{buyerCount}</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', backgroundColor: '#e9ecef', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: `${(buyerCount / Math.max(users.length, 1)) * 100}%`, height: '100%', backgroundColor: '#28a745' }} />
                  </div>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.875rem', fontWeight: '500', color: '#6c757d' }}>Sellers</span>
                    <span style={{ fontSize: '0.875rem', fontWeight: '600', color: '#212529' }}>{sellerCount}</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', backgroundColor: '#e9ecef', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: `${(sellerCount / Math.max(users.length, 1)) * 100}%`, height: '100%', backgroundColor: '#ffc107' }} />
                  </div>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.875rem', fontWeight: '500', color: '#6c757d' }}>System Health</span>
                    <span style={{ fontSize: '0.875rem', fontWeight: '600', color: '#212529' }}>98%</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', backgroundColor: '#e9ecef', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: '98%', height: '100%', backgroundColor: '#28a745' }} />
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