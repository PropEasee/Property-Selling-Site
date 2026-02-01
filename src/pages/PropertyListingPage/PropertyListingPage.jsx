import React, { useState, useEffect } from 'react';
import { Search, MapPin, Home, Bed, Bath, Square, Heart, Share2, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fetchWithAuth } from '../../utils/api/fetchWithAuth';

export default function PropertyListingPage() {
 const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState('all');
  const [propertyType, setPropertyType] = useState('all');
  const [cityFilter, setCityFilter] = useState('all');
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // helper to read current user id from localStorage (matches other files)
  const getStoredUserId = () => {
    try {
      const st = localStorage.getItem('user');
      if (!st) return null;
      const u = JSON.parse(st);
      return u?.userId ?? u?.id ?? u?.user_id ?? null;
    } catch {
      return null;
    }
  };

  // fire-and-forget POST to count view when user clicks a property
  const sendView = async (propertyId) => {
    try {
      await fetchWithAuth('http://localhost:8080/api/properties/view', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ propertyId }),
      });
    } catch (err) {
      console.error('Error sending view:', err);
    }
  };
 
  const propertie = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=600&q=80",
      title: "103/143 West Street, Crows Nest",
      price: "₹45,545",
      location: "Sydney, NSW",
      bedrooms: 10,
      bathrooms: 4,
      area: "150 M",
      type: "House",
      featured: true
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80",
      title: "245 Oak Avenue, Melbourne",
      price: "₹67,890",
      location: "Melbourne, VIC",
      bedrooms: 4,
      bathrooms: 3,
      area: "220 M",
      type: "Villa",
      featured: false
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=80",
      title: "78 Beach Road, Brisbane",
      price: "₹38,200",
      location: "Brisbane, QLD",
      bedrooms: 3,
      bathrooms: 2,
      area: "180 M",
      type: "Apartment",
      featured: true
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=600&q=80",
      title: "567 Park Lane, Adelaide",
      price: "₹52,300",
      location: "Adelaide, SA",
      bedrooms: 5,
      bathrooms: 3,
      area: "200 M",
      type: "House",
      featured: false
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=600&q=80",
      title: "89 Lake View Drive, Perth",
      price: "₹71,500",
      location: "Perth, WA",
      bedrooms: 6,
      bathrooms: 4,
      area: "280 M",
      type: "Villa",
      featured: true
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&q=80",
      title: "321 City Center, Sydney",
      price: "₹42,100",
      location: "Sydney, NSW",
      bedrooms: 2,
      bathrooms: 2,
      area: "120 M",
      type: "Apartment",
      featured: false
    }
  ];

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        const response = await fetchWithAuth('http://localhost:8080/api/properties');
        if (!response.ok) throw new Error('Failed to fetch properties');
        const data = await response.json();
        setProperties(data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const uniqueCities = ['all', ...Array.from(new Set(properties.map(p => p.city).filter(Boolean)))];
  const typeOptions = ['all', 'VILLA', 'APARTMENT', 'HOUSE', 'LAND'];

  const filtered = properties.filter(p => {
    const q = searchTerm.trim().toLowerCase();
    if (q) {
      const match = (p.title || '').toLowerCase().includes(q) || (p.city || '').toLowerCase().includes(q) || (p.sellerName || '').toLowerCase().includes(q);
      if (!match) return false;
    }
    if (propertyType !== 'all' && (p.propertyType || '').toUpperCase() !== propertyType) return false;
    if (cityFilter !== 'all' && (p.city || '') !== cityFilter) return false;

    if (priceRange === 'below1cr' && !(p.price < 10000000)) return false;
    if (priceRange === '1to2cr' && !(p.price >= 10000000 && p.price <= 20000000)) return false;
    if (priceRange === 'above2cr' && !(p.price > 20000000)) return false;

    return true;
  });

  const formatPrice = (num) => {
    try {
      return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(num);
    } catch {
      return `₹${num}`;
    }
  };

  const placeholder = 'https://images.unsplash.com/photo-1560185127-6b0b1d1f8b8e?w=800&q=80';


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
          background: #f9fafb;
        }

        .listing-page {
          min-height: 100vh;
          background: #f9fafb;
        }

        .listing-header {
          background: white;
          padding: 2rem 2rem 3rem;
          border-bottom: 1px solid #e5e7eb;
        }

        .header-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .page-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: #1a1a2e;
          margin-bottom: 0.5rem;
        }

        .page-subtitle {
          color: #6b7280;
          font-size: 1rem;
          margin-bottom: 2rem;
        }

        .filters-container {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 1rem;
        }

        .filter-group {
          position: relative;
        }

        .filter-input,
        .filter-select {
          width: 100%;
          padding: 0.875rem 1rem 0.875rem 3rem;
          border: 2px solid #e5e7eb;
          background: white;
          border-radius: 12px;
          font-size: 0.875rem;
          color: #1a1a2e;
          outline: none;
          transition: border-color 0.3s ease;
          appearance: none;
          cursor: pointer;
        }

        .filter-input:focus,
        .filter-select:focus {
          border-color: #3b82f6;
        }

        .filter-input::placeholder {
          color: #9ca3af;
        }

        .filter-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: #9ca3af;
          pointer-events: none;
        }

        .select-wrapper {
          position: relative;
        }

        .chevron-icon {
          position: absolute;
          right: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: #9ca3af;
          pointer-events: none;
        }

        .listing-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
        }

        .results-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .results-count {
          color: #6b7280;
          font-size: 0.875rem;
        }

        .sort-by {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .sort-label {
          color: #6b7280;
          font-size: 0.875rem;
        }

        .sort-select {
          padding: 0.5rem 2rem 0.5rem 0.75rem;
          border: 1px solid #e5e7eb;
          background: white;
          border-radius: 8px;
          font-size: 0.875rem;
          color: #1a1a2e;
          outline: none;
          cursor: pointer;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%239ca3af' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 0.5rem center;
        }

        .properties-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }

        .property-card {
          background: white;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          cursor: pointer;
        }

        .property-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
        }

        .property-image-container {
          position: relative;
          width: 100%;
          height: 240px;
          overflow: hidden;
        }

        .property-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .property-card:hover .property-image {
          transform: scale(1.05);
        }

        .featured-badge {
          position: absolute;
          top: 1rem;
          left: 1rem;
          background: #3b82f6;
          color: white;
          padding: 0.375rem 0.875rem;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .property-actions {
          position: absolute;
          top: 1rem;
          right: 1rem;
          display: flex;
          gap: 0.5rem;
        }

        .action-button {
          width: 36px;
          height: 36px;
          background: white;
          border: none;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .action-button:hover {
          background: #3b82f6;
        }

        .action-button:hover svg {
          color: white;
        }

        .action-icon {
          color: #6b7280;
          transition: color 0.3s ease;
        }

        .property-details {
          padding: 1.5rem;
        }

        .property-price {
          font-size: 1.75rem;
          font-weight: 700;
          color: #1a1a2e;
          margin-bottom: 0.5rem;
        }

        .property-title {
          font-size: 1.125rem;
          font-weight: 600;
          color: #1a1a2e;
          margin-bottom: 0.5rem;
        }

        .property-location {
          display: flex;
          align-items: center;
          gap: 0.375rem;
          color: #6b7280;
          font-size: 0.875rem;
          margin-bottom: 1rem;
        }

        .property-features {
          display: flex;
          gap: 1.5rem;
          padding-top: 1rem;
          border-top: 1px solid #e5e7eb;
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #6b7280;
          font-size: 0.875rem;
        }

        .feature-icon {
          color: #3b82f6;
        }

        @media (max-width: 1024px) {
          .properties-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .filters-container {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 768px) {
          .properties-grid {
            grid-template-columns: 1fr;
          }

          .filters-container {
            grid-template-columns: 1fr;
          }

          .page-title {
            font-size: 2rem;
          }

          .listing-header,
          .listing-content {
            padding: 1.5rem;
          }

          .results-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
        }
      `}</style>

      <div className="listing-page">
        <div className="listing-header">
          <div className="header-container">
            <h1 className="page-title">Find Your Dream Property</h1>
            <p className="page-subtitle">Browse through our selection of premium properties</p>

            <div className="filters-container">
              <div className="filter-group">
                <Search size={18} className="filter-icon" />
                <input
                  type="text"
                  placeholder="Search by title, city or seller"
                  className="filter-input"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="filter-group">
                <Home size={18} className="filter-icon" />
                <div className="select-wrapper">
                  <select
                    className="filter-select"
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                  >
                    {typeOptions.map(t => <option key={t} value={t}>{t === 'all' ? 'All Types' : t}</option>)}
                  </select>
                  <ChevronDown size={18} className="chevron-icon" />
                </div>
              </div>

              <div className="filter-group">
                <MapPin size={18} className="filter-icon" />
                <div className="select-wrapper">
                  <select
                    className="filter-select"
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                  >
                    <option value="all">All Prices</option>
                    <option value="below1cr">Below ₹1 Cr</option>
                    <option value="1to2cr">₹1 Cr - ₹2 Cr</option>
                    <option value="above2cr">Above ₹2 Cr</option>
                  </select>
                  <ChevronDown size={18} className="chevron-icon" />
                </div>
              </div>

              <div className="filter-group">
                <MapPin size={18} className="filter-icon" />
                <div className="select-wrapper">
                  <select
                    className="filter-select"
                    value={cityFilter}
                    onChange={(e) => setCityFilter(e.target.value)}
                  >
                    {uniqueCities.map(c => <option key={c} value={c}>{c === 'all' ? 'All Cities' : c}</option>)}
                  </select>
                  <ChevronDown size={18} className="chevron-icon" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="listing-content">
          <div className="results-header">
            <span className="results-count">
              {loading ? 'Loading...' : error ? `Error: ${error}` : `Showing ${filtered.length} of ${properties.length} properties`}
            </span>
            <div className="sort-by">
              <span className="sort-label">Sort by:</span>
              <select className="sort-select" onChange={() => {}}>
                <option>Most Recent</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Most Popular</option>
              </select>
            </div>
          </div>

          <div className="properties-grid">
            {filtered.map((p) => {
              const img = (p.images && p.images.length > 0) ? p.images[0] : placeholder;
              return (
                
                <div key={p.propertyId} className="property-card">
                  <Link
                  // onClick={() => sendView(p.propertyId)}
                  to={`/PropertyDetailsPage/${p.propertyId}`}
                  key={p.propertyId}
                  className="property-card"
                  style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
                  >
                  <div className="property-image-container">
                    <img src={img} alt={p.title} className="property-image" />
                    {p.status === 'AVAILABLE' && <div className="featured-badge">Available</div>}
                    <div className="property-actions">
                      <button className="action-button">
                        <Heart size={18} className="action-icon" />
                      </button>
                      <button className="action-button">
                        <Share2 size={18} className="action-icon" />
                      </button>
                    </div>
                  </div>

                  <div className="property-details">
                    <div className="property-price">{formatPrice(p.price)}</div>
                    <h3 className="property-title">{p.title}</h3>
                    <div className="property-location">
                      <MapPin size={16} />
                      <span>{p.city}{p.state ? `, ${p.state}` : ''}</span>
                    </div>

                    <div style={{ paddingTop: '1rem', borderTop: '1px solid #e5e7eb', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                      <div className="feature-item"><strong>Type:</strong>&nbsp;{p.propertyType}</div>
                      <div className="feature-item"><strong>Seller:</strong>&nbsp;{p.sellerName}</div>
                      <div className="feature-item"><strong>Pincode:</strong>&nbsp;{p.pincode}</div>
                      <div className="feature-item"><strong>Listed:</strong>&nbsp;{new Date(p.createdAt).toLocaleDateString()}</div>
                    </div>
                  </div>
                </Link>
                </div>
               
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}