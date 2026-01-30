import React, { useState, useEffect } from 'react';
import {
  Search, Filter, Download, Plus, Eye, Edit2, Trash2, Mail,
  ChevronLeft, ChevronRight, AlertCircle, MoreVertical, X,
  User, Users, Phone, Calendar, MapPin, CheckCircle, XCircle
} from 'lucide-react';
import { fetchWithAuth } from '../../utils/api/fetchWithAuth';

const API_BASE_URL = 'http://localhost:8080/api';

export default function AdminUsersList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [viewType, setViewType] = useState('table');
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [pageSize] = useState(10);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch admin stats
  const fetchStats = async () => {
    try {
      const response = await fetchWithAuth(`${API_BASE_URL}/admin/stats`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error('Failed to fetch stats');
      const data = await response.json();
      setStats(data);
    } catch (err) {
      console.error('Error fetching stats:', err);
    }
  };

  // Fetch users from backend
  const fetchUsers = async (page = 0, search = '', role = '') => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        size: pageSize.toString(),
      });

      if (search) params.append('search', search);
      if (role) params.append('role', role);

      const response = await fetchWithAuth(`${API_BASE_URL}/users?${params}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error('Failed to fetch users');

      const data = await response.json();
      console.log('Users fetched:', data.content);
      setUsers(data.content || []);
      setTotalPages(data.totalPages || 0);
      setTotalElements(data.totalElements || 0);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch on component mount
  useEffect(() => {
    fetchStats();
  }, []);

  // Fetch users on component mount and when filters change
  useEffect(() => {
    setCurrentPage(0);
    fetchUsers(0, searchTerm, filterRole);
  }, [searchTerm, filterRole]);

  // Fetch when page changes
  useEffect(() => {
    fetchUsers(currentPage, searchTerm, filterRole);
  }, [currentPage]);

  // Clear success message after 3 seconds
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  // Clear error message after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  // View user details
  const handleViewUser = (user) => {
    setSelectedUser(user);
    setViewModalOpen(true);
  };

    // Open edit modal
  const handleEditUser = (user) => {
    setSelectedUser(user);
    const fullName = getFullName(user);
    setEditFormData({
      name: fullName,
      phone: user.phone || '',
      password: '',
    });
    setEditModalOpen(true);
  };

  // Save edited user
  const handleSaveEdit = async () => {
    if (!selectedUser) return;

    // Debug: Log the selectedUser to see available ID fields
    console.log('Selected user object:', selectedUser);

    // Try different possible ID field names
    const userId = selectedUser.id || selectedUser.userId || selectedUser.user_id;
    
    if (!userId) {
      setError('User ID not found. Cannot update user.');
      return;
    }

    if (!editFormData.name || !editFormData.name.trim()) {
      setError('Please enter a name');
      return;
    }

    setIsSaving(true);
    setError(null);

    try {
      const payload = {
        name: editFormData.name.trim(),
        phone: editFormData.phone.trim() || '',
        password: editFormData.password.trim() || ''
      };

      const endpoint = `${API_BASE_URL}/users/${userId}`;
      
      console.log('Updating user:', userId);
      console.log('Endpoint:', endpoint);
      console.log('Payload:', JSON.stringify(payload));

      const response = await fetchWithAuth(endpoint, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      console.log('Response status:', response.status);

      const responseText = await response.text();
      console.log('Response body:', responseText);

      if (!response.ok) {
        let errorMessage = `HTTP Error: ${response.status}`;
        try {
          const errorData = JSON.parse(responseText);
          errorMessage = errorData.message || errorData.error || errorMessage;
        } catch (e) {
          errorMessage = responseText || errorMessage;
        }
        throw new Error(errorMessage);
      }

      console.log('Update successful');
      setEditModalOpen(false);
      setEditFormData({});
      setSelectedUser(null);
      setSuccessMessage('User updated successfully');
      
      // Refetch users
      setTimeout(() => {
        fetchUsers(currentPage, searchTerm, filterRole);
      }, 500);

    } catch (err) {
      console.error('Error updating user:', err);
      setError('Error updating user: ' + err.message);
    } finally {
      setIsSaving(false);
    }
  };
// ...existing code...
  // Delete user
   const handleDeleteUser = async (userId) => {
    console.log('Delete clicked with userId:', userId);
    console.log('userId type:', typeof userId);
    
    if (!userId) {
      setError('User ID is missing. Cannot delete user.');
      return;
    }

    if (!window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      return;
    }

    setIsDeleting(true);
    setError(null);

    try {
      const endpoint = `${API_BASE_URL}/users/${userId}`;
      
      console.log('Deleting user with endpoint:', endpoint);
      
      const response = await fetchWithAuth(endpoint, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Delete response status:', response.status);

      const responseText = await response.text();
      console.log('Delete response body:', responseText);

      if (!response.ok) {
        let errorMessage = `HTTP Error: ${response.status}`;
        try {
          const errorData = JSON.parse(responseText);
          errorMessage = errorData.message || errorData.error || errorMessage;
        } catch (e) {
          errorMessage = responseText || errorMessage;
        }
        throw new Error(errorMessage);
      }

      console.log('Delete successful');
      setSuccessMessage('User deleted successfully');
      
      setTimeout(() => {
        fetchUsers(currentPage, searchTerm, filterRole);
      }, 500);

    } catch (err) {
      console.error('Error deleting user:', err);
      setError('Error deleting user: ' + err.message);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const handleFilterRole = (value) => {
    setFilterRole(value);
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  // Get user role display
  const getRoleDisplay = (role) => {
    return role ? role.charAt(0).toUpperCase() + role.slice(1).toLowerCase() : 'User';
  };

  // Get full name
  const getFullName = (user) => {
    if (!user) return 'Unknown User';
    
    if (user.name && user.name.trim()) {
      return user.name.trim();
    }
    
    const firstName = user.firstName || '';
    const lastName = user.lastName || '';
    const fullName = `${firstName} ${lastName}`.trim();
    return fullName || 'Unknown User';
  };

  // Get initials for avatar
  const getInitials = (user) => {
    if (!user) return 'U';
    
    const fullName = getFullName(user);
    const nameParts = fullName.split(' ');
    
    if (nameParts.length >= 2) {
      return (nameParts[0].charAt(0) + nameParts[1].charAt(0)).toUpperCase();
    } else if (nameParts[0]) {
      return nameParts[0].charAt(0).toUpperCase();
    }
    return 'U';
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

        /* Success Alert */
        .success-alert {
          background-color: #d4edda;
          color: #155724;
          padding: 1rem;
          border-radius: 0.5rem;
          margin-bottom: 1rem;
          border: 1px solid #c3e6cb;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          animation: slideDown 0.3s ease-out;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
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
          grid-template-columns: 1fr auto auto;
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

        .user-info {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #e9ecef;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 600;
          font-size: 0.9rem;
          flex-shrink: 0;
        }

        .user-details h4 {
          margin: 0;
          font-weight: 600;
          color: #212529;
          font-size: 0.95rem;
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

        .badge-admin {
          background-color: #f3e5f5;
          color: #6f42c1;
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
          padding: 0;
          font-size: 0;
        }

        .btn-action:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .btn-view {
          background: #e3f2fd;
          color: #1976d2;
        }

        .btn-view:hover:not(:disabled) {
          background: #bbdefb;
          transform: scale(1.1);
        }

        .btn-edit {
          background: #fff3e0;
          color: #f57c00;
        }

        .btn-edit:hover:not(:disabled) {
          background: #ffe0b2;
          transform: scale(1.1);
        }

        .btn-delete {
          background: #ffebee;
          color: #c62828;
        }

        .btn-delete:hover:not(:disabled) {
          background: #ffcdd2;
          transform: scale(1.1);
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
          flex-shrink: 0;
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
          justify-content: flex-start;
          align-items: center;
          gap: 0.5rem;
        }

        /* Pagination */
        .pagination-container {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 0.5rem;
          margin-top: 2rem;
          flex-wrap: wrap;
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

        .loading-spinner {
          text-align: center;
          padding: 2rem;
          color: #6c757d;
        }

        .error-alert {
          background-color: #f8d7da;
          color: #721c24;
          padding: 1rem;
          border-radius: 0.5rem;
          margin-bottom: 1rem;
          border: 1px solid #f5c6cb;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          animation: slideDown 0.3s ease-out;
        }

        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .modal-content {
          background: white;
          border-radius: 1rem;
          padding: 2rem;
          max-width: 600px;
          width: 90%;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #e9ecef;
        }

        .modal-header h2 {
          margin: 0;
          font-size: 1.5rem;
          font-weight: 700;
          color: #212529;
        }

        .modal-close-btn {
          background: none;
          border: none;
          cursor: pointer;
          color: #6c757d;
          font-size: 1.5rem;
          padding: 0;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s;
        }

        .modal-close-btn:hover {
          color: #212529;
          transform: scale(1.1);
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 600;
          color: #212529;
          font-size: 0.95rem;
        }

        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #ced4da;
          border-radius: 0.5rem;
          font-size: 0.95rem;
          font-family: inherit;
        }

        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #007bff;
          box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
        }

        .form-group textarea {
          resize: vertical;
          min-height: 100px;
        }

        .form-hint {
          font-size: 0.8rem;
          color: #6c757d;
          margin-top: 0.25rem;
        }

        .modal-footer {
          display: flex;
          gap: 1rem;
          margin-top: 1.5rem;
          padding-top: 1rem;
          border-top: 1px solid #e9ecef;
          justify-content: flex-end;
        }

        .modal-footer button {
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 0.5rem;
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
        }

        .modal-footer button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .btn-primary {
          background: #007bff;
          color: white;
        }

        .btn-primary:hover:not(:disabled) {
          background: #0056b3;
        }

        .btn-secondary {
          background: #e9ecef;
          color: #212529;
        }

        .btn-secondary:hover:not(:disabled) {
          background: #dee2e6;
        }

        .info-section {
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #e9ecef;
        }

        .info-section h3 {
          font-size: 1rem;
          font-weight: 700;
          color: #212529;
          margin-bottom: 0.75rem;
        }

        .info-item {
          display: flex;
          justify-content: space-between;
          padding: 0.5rem 0;
          color: #495057;
        }

        .info-item strong {
          color: #212529;
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

          .modal-content {
            padding: 1.5rem;
          }

          .action-buttons {
            flex-direction: row;
            gap: 0.25rem;
          }

          .btn-action {
            width: 32px;
            height: 32px;
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

          {/* Success Alert */}
          {successMessage && (
            <div className="success-alert">
              <CheckCircle size={18} />
              {successMessage}
            </div>
          )}

          {/* Error Alert */}
          {error && (
            <div className="error-alert">
              <AlertCircle size={18} />
              {error}
            </div>
          )}

          {/* Stats Bar */}
          <div className="stats-bar">
            <div className="stat-item">
              <div className="stat-icon" style={{ backgroundColor: '#007bff' }}>
                <Users size={24} />
              </div>
              <div className="stat-content">
                <h3>{stats?.totalUsers || totalElements}</h3>
                <p>Total Users</p>
              </div>
            </div>

            <div className="stat-item">
              <div className="stat-icon" style={{ backgroundColor: '#17a2b8' }}>
                👤
              </div>
              <div className="stat-content">
                <h3>{stats?.ownerUsers || users.filter(u => u.role === 'SELLER').length}</h3>
                <p>Total Sellers</p>
              </div>
            </div>

            <div className="stat-item">
              <div className="stat-icon" style={{ backgroundColor: '#28a745' }}>
                👥
              </div>
              <div className="stat-content">
                <h3>{stats?.normalUsers || users.filter(u => u.role === 'BUYER').length}</h3>
                <p>Total Buyers</p>
              </div>
            </div>

            <div className="stat-item">
              <div className="stat-icon" style={{ backgroundColor: '#6f42c1' }}>
                👨‍💼
              </div>
              <div className="stat-content">
                <h3>{stats?.adminUsers || 0}</h3>
                <p>Total Admins</p>
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
                  placeholder="Search by name, email, or phone..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </div>

              <select
                className="filter-select"
                value={filterRole}
                onChange={(e) => handleFilterRole(e.target.value)}
              >
                <option value="">All Roles</option>
                <option value="SELLER">Sellers</option>
                <option value="BUYER">Buyers</option>
                <option value="ADMIN">Admins</option>
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
            Showing <strong>{users.length}</strong> users
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="loading-spinner">
              <div>Loading users...</div>
            </div>
          ) : (
            <>
              {/* Table View */}
              {viewType === 'table' && (
                <div className="table-card">
                  {users.length > 0 ? (
                    <div className="table-responsive">
                      <table className="table-custom">
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Contact</th>
                            <th>Role</th>
                            <th>Join Date</th>
                            <th style={{ width: '120px' }}>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {users.map((user) => (
                            <tr key={user.id}>
                              <td>
                                <div className="user-info">
                                  <div className="user-avatar" style={{ backgroundColor: user.role === 'SELLER' ? '#007bff' : user.role === 'ADMIN' ? '#6f42c1' : '#28a745' }}>
                                    {getInitials(user)}
                                  </div>
                                  <div className="user-details">
                                    <h4>{getFullName(user)}</h4>
                                  </div>
                                </div>
                              </td>
                              <td>{user.email}</td>
                              <td>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                  {user.phone && (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                      <Phone size={14} style={{ color: '#6c757d' }} />
                                      {user.phone}
                                    </div>
                                  )}
                                  {!user.phone && <span style={{ color: '#6c757d', fontSize: '0.85rem' }}>N/A</span>}
                                </div>
                              </td>
                              <td>
                                <span className={`badge-custom badge-${user.role.toLowerCase()}`}>
                                  {getRoleDisplay(user.role)}
                                </span>
                              </td>
                              <td>{formatDate(user.createdAt)}</td>
                              <td>
                                <div className="action-buttons">
                                  <button 
                                    className="btn-action btn-view" 
                                    title="View Details"
                                    onClick={() => handleViewUser(user)}
                                    disabled={isSaving || isDeleting}
                                  >
                                    <Eye size={16} />
                                  </button>
                                  <button 
                                    className="btn-action btn-edit" 
                                    title="Edit User"
                                    onClick={() => handleEditUser(user)}
                                    disabled={isSaving || isDeleting}
                                  >
                                    <Edit2 size={16} />
                                  </button>
                                  <button 
                                    className="btn-action btn-delete" 
                                    title="Delete User"
                                    onClick={() => handleDeleteUser(user.id)}
                                    disabled={isSaving || isDeleting}
                                  >
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
                  {users.length > 0 ? (
                    <div className="users-grid">
                      {users.map((user) => (
                        <div key={user.id} className="user-card">
                          <div className="card-header">
                            <div className="card-avatar" style={{ backgroundColor: user.role === 'SELLER' ? '#007bff' : user.role === 'ADMIN' ? '#6f42c1' : '#28a745' }}>
                              {getInitials(user)}
                            </div>
                            <div className="card-user-info">
                              <h3>{getFullName(user)}</h3>
                              <p>{user.email}</p>
                            </div>
                          </div>

                          <div className="card-body">
                            {user.phone && (
                              <div className="info-row">
                                <Phone size={16} />
                                <span>{user.phone}</span>
                              </div>
                            )}

                            <div className="info-row">
                              <Calendar size={16} />
                              <span>Joined {formatDate(user.createdAt)}</span>
                            </div>

                            <div style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid #e9ecef' }}>
                              <span className={`badge-custom badge-${user.role.toLowerCase()}`}>
                                {getRoleDisplay(user.role)}
                              </span>
                            </div>
                          </div>

                          <div className="card-footer">
                            <button 
                              className="btn-action btn-view" 
                              title="View Details"
                              onClick={() => handleViewUser(user)}
                              disabled={isSaving || isDeleting}
                            >
                              <Eye size={16} />
                            </button>
                            <button 
                              className="btn-action btn-edit" 
                              title="Edit User"
                              onClick={() => handleEditUser(user)}
                              disabled={isSaving || isDeleting}
                            >
                              <Edit2 size={16} />
                            </button>
                            <button 
                              className="btn-action btn-delete" 
                              title="Delete User"
                              onClick={() => handleDeleteUser(user.id)}
                              disabled={isSaving || isDeleting}
                            >
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
              {users.length > 0 && (
                <div className="pagination-container">
                  <button
                    className="pagination-btn"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 0))}
                    disabled={currentPage === 0}
                  >
                    <ChevronLeft size={18} />
                  </button>

                  {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                    const startPage = Math.max(0, currentPage - 2);
                    return startPage + i;
                  }).map(page => (
                    <button
                      key={page}
                      className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page + 1}
                    </button>
                  ))}

                  <button
                    className="pagination-btn"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages - 1))}
                    disabled={currentPage === totalPages - 1}
                  >
                    <ChevronRight size={18} />
                  </button>

                  <div className="pagination-info">
                    Page {currentPage + 1} of {totalPages}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* View Modal */}
      {viewModalOpen && selectedUser && (
        <div className="modal-overlay" onClick={() => setViewModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>User Details</h2>
              <button 
                className="modal-close-btn"
                onClick={() => setViewModalOpen(false)}
              >
                <X size={24} />
              </button>
            </div>

            <div className="info-section">
              <h3>Personal Information</h3>
              <div className="info-item">
                <strong>Full Name:</strong>
                <span>{getFullName(selectedUser)}</span>
              </div>
              <div className="info-item">
                <strong>Email:</strong>
                <span>{selectedUser.email}</span>
              </div>
              <div className="info-item">
                <strong>Phone:</strong>
                <span>{selectedUser.phone || 'N/A'}</span>
              </div>
            </div>

            <div className="info-section">
              <h3>Account Information</h3>
              <div className="info-item">
                <strong>Role:</strong>
                <span className={`badge-custom badge-${selectedUser.role.toLowerCase()}`}>
                  {getRoleDisplay(selectedUser.role)}
                </span>
              </div>
              <div className="info-item">
                <strong>Joined:</strong>
                <span>{formatDate(selectedUser.createdAt)}</span>
              </div>
            </div>

            <div className="modal-footer">
              <button 
                className="btn-secondary"
                onClick={() => setViewModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editModalOpen && selectedUser && (
        <div className="modal-overlay" onClick={() => setEditModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Edit User</h2>
              <button 
                className="modal-close-btn"
                onClick={() => setEditModalOpen(false)}
              >
                <X size={24} />
              </button>
            </div>

            <div>
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  value={editFormData.name}
                  onChange={(e) => setEditFormData({...editFormData, name: e.target.value})}
                  placeholder="Enter full name"
                  disabled={isSaving}
                />
              </div>

              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  value={editFormData.phone}
                  onChange={(e) => setEditFormData({...editFormData, phone: e.target.value})}
                  placeholder="Enter phone number"
                  disabled={isSaving}
                />
              </div>

              <div className="form-group">
                <label>Password (Optional)</label>
                <input
                  type="password"
                  value={editFormData.password}
                  onChange={(e) => setEditFormData({...editFormData, password: e.target.value})}
                  placeholder="Leave empty to keep current password"
                  disabled={isSaving}
                />
                <div className="form-hint">Only fill if you want to change the password</div>
              </div>
            </div>

            <div className="modal-footer">
              <button 
                className="btn-secondary"
                onClick={() => setEditModalOpen(false)}
                disabled={isSaving}
              >
                Cancel
              </button>
              <button 
                className="btn-primary"
                onClick={handleSaveEdit}
                disabled={isSaving}
              >
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}