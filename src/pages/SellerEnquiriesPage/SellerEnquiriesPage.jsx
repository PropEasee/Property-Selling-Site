import React, { useState, useEffect } from 'react';
import { fetchWithAuth } from '../../utils/api/fetchWithAuth';

export default function SellerEnquiriesPage() {
  const [enquiries, setEnquiries] = useState([]);
  const [filteredEnquiries, setFilteredEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [propertyFilter, setPropertyFilter] = useState('all'); // State for selected property filter
  const [properties, setProperties] = useState([]); // List of properties for the dropdown

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

  useEffect(() => {
    const fetchEnquiries = async () => {
      setLoading(true);
      setError('');
      const sellerId = getSellerIdFromStorage();
      if (!sellerId) {
        setError('Seller ID not found. Please log in as a seller.');
        setLoading(false);
        return;
      }

      try {
        const res = await fetchWithAuth('http://localhost:8080/api/enquiries');
        if (!res.ok) throw new Error('Failed to fetch enquiries');
        const data = await res.json();

        // Filter enquiries for the current seller
        const filteredEnquiries = data.filter(
          (enquiry) => enquiry.property.seller.userId === sellerId
        );

        // Extract unique properties for the dropdown
        const uniqueProperties = Array.from(
          new Set(filteredEnquiries.map((enquiry) => enquiry.property.title))
        );

        setEnquiries(filteredEnquiries);
        setFilteredEnquiries(filteredEnquiries);
        setProperties(['all', ...uniqueProperties]); // Add "all" option for no filtering
      } catch (err) {
        setError(err.message || 'Error fetching enquiries');
      } finally {
        setLoading(false);
      }
    };

    fetchEnquiries();
  }, []);

  const handlePropertyFilterChange = (e) => {
    const selectedProperty = e.target.value;
    setPropertyFilter(selectedProperty);

    if (selectedProperty === 'all') {
      setFilteredEnquiries(enquiries); // Show all enquiries
    } else {
      const filtered = enquiries.filter(
        (enquiry) => enquiry.property.title === selectedProperty
      );
      setFilteredEnquiries(filtered);
    }
  };

  return (
    <>
      <style>{`
        .enquiries-page {
          padding: 2rem;
          background: #f9fafb;
          min-height: 100vh;
        }
        .enquiries-container {
          max-width: 1200px;
          margin: 0 auto;
          background: white;
          padding: 2rem;
          border-radius: 12px;
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);
        }
        .enquiries-header {
          margin-bottom: 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .enquiries-header h2 {
          font-size: 1.75rem;
          font-weight: 700;
          color: #1a1a2e;
        }
        .filter-select {
          padding: 0.5rem 1rem;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          font-size: 1rem;
          color: #1a1a2e;
          outline: none;
          cursor: pointer;
        }
        .enquiries-table {
          width: 100%;
          border-collapse: collapse;
        }
        .enquiries-table th,
        .enquiries-table td {
          padding: 1rem;
          text-align: left;
          border-bottom: 1px solid #e5e7eb;
        }
        .enquiries-table th {
          background: #f3f4f6;
          font-weight: 600;
          color: #6b7280;
        }
        .enquiries-table tr:hover {
          background: #f9fafb;
        }
        .empty-state {
          text-align: center;
          color: #6b7280;
          font-size: 1rem;
          margin-top: 2rem;
        }
      `}</style>

      <div className="enquiries-page">
        <div className="enquiries-container">
          <div className="enquiries-header">
            <div>
              <h2>All Enquiries</h2>
              <p>View all enquiries for your listed properties</p>
            </div>
            <div>
              <select
                className="filter-select"
                value={propertyFilter}
                onChange={handlePropertyFilterChange}
              >
                {properties.map((property) => (
                  <option key={property} value={property}>
                    {property === 'all' ? 'All Properties' : property}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {loading && <p>Loading enquiries...</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {!loading && !error && filteredEnquiries.length === 0 && (
            <div className="empty-state">No enquiries found for your properties.</div>
          )}
          {!loading && !error && filteredEnquiries.length > 0 && (
            <table className="enquiries-table">
              <thead>
                <tr>
                  <th>Buyer Name</th>
                  <th>Buyer Email</th>
                  <th>Property</th>
                  <th>Message</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredEnquiries.map((enquiry) => (
                  <tr key={enquiry.enquiryId}>
                    <td>{enquiry.buyer.name}</td>
                    <td>{enquiry.buyer.email}</td>
                    <td>
                      {enquiry.property.title} ({enquiry.property.city}, {enquiry.property.state})
                    </td>
                    <td>{enquiry.message}</td>
                    <td>{new Date(enquiry.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}