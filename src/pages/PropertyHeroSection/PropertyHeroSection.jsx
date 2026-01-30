import React, { useState, useEffect } from 'react';
import { Search, MapPin, ChevronDown } from 'lucide-react';
import Header from '../../Component/Header';
import { fetchWithAuth } from '../../utils/api/fetchWithAuth';

export default function PropertyHeroSection() {
  const [activeTab, setActiveTab] = useState('rent');
  const [recent, setRecent] = useState([]);
  const [loadingRecent, setLoadingRecent] = useState(true);
  const [recentError, setRecentError] = useState('');

  useEffect(() => {
    let mounted = true;
    const fetchRecent = async () => {
      setLoadingRecent(true);
      setRecentError('');
      try {
        const res = await fetchWithAuth('http://localhost:8080/api/properties');
        if (!res.ok) throw new Error('Failed to fetch properties');
        const data = await res.json();
        const list = Array.isArray(data) ? data : (data?.data || []);
        const sorted = list
          .filter(Boolean)
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 6);
        if (mounted) setRecent(sorted);
      } catch (err) {
        if (mounted) setRecentError(err.message || 'Error');
      } finally {
        if (mounted) setLoadingRecent(false);
      }
    };

    fetchRecent();
    return () => { mounted = false; };
  }, []);

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .hero-section {
          background: linear-gradient(135deg, #e8eef7 0%, #dce4f2 100%);
          min-height: 500px;
          padding: 3rem 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        .container {
          max-width: 1200px;
          width: 100%;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          align-items: center;
        }

        .content-left {
          z-index: 2;
        }

        .hero-title {
          font-size: 3rem;
          font-weight: 700;
          color: #1a1a2e;
          line-height: 1.2;
          margin-bottom: 1.5rem;
        }

        .hero-description {
          color: #6b7280;
          font-size: 1rem;
          line-height: 1.6;
          margin-bottom: 2.5rem;
        }

        .tabs {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 2rem;
        }

        .tab {
          padding: 0.5rem 1.5rem;
          background: transparent;
          border: none;
          color: #6b7280;
          font-weight: 500;
          font-size: 0.875rem;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .tab.active {
          color: #1a1a2e;
          border-bottom: 2px solid #1a1a2e;
        }

        .search-form {
          background: white;
          padding: 1.5rem;
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          display: flex;
          gap: 1rem;
          align-items: flex-end;
        }

        .form-group {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .form-label {
          font-size: 0.875rem;
          font-weight: 600;
          color: #1a1a2e;
          margin-bottom: 0.5rem;
        }

        .input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-icon {
          position: absolute;
          left: 0.75rem;
          color: #9ca3af;
        }

        .form-input,
        .form-select {
          width: 100%;
          padding: 0.75rem 0.75rem 0.75rem 2.5rem;
          border: none;
          background: #f3f4f6;
          border-radius: 8px;
          font-size: 0.875rem;
          color: #6b7280;
          outline: none;
          appearance: none;
          cursor: pointer;
        }

        .form-select {
          background-image: none;
          padding-right: 2.5rem;
        }

        .select-wrapper {
          position: relative;
        }

        .select-wrapper .chevron-icon {
          position: absolute;
          right: 0.75rem;
          top: 50%;
          transform: translateY(-50%);
          color: #9ca3af;
          pointer-events: none;
        }

        .search-button {
          padding: 0.75rem 1.5rem;
          background: #3b82f6;
          border: none;
          border-radius: 8px;
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.3s ease;
          min-width: 48px;
          height: 48px;
        }

        .search-button:hover {
          background: #2563eb;
        }

        .image-container {
          position: relative;
          z-index: 1;
        }

        .house-image {
          width: 100%;
          height: auto;
          border-radius: 20px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
        }

        .countries-section {
          background: white;
          padding: 4rem 2rem;
          text-align: center;
        }

        .countries-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .section-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: #1a1a2e;
          margin-bottom: 3rem;
          line-height: 1.3;
        }

        .countries-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
        }

        .country-card {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          aspect-ratio: 3/4;
          cursor: pointer;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .country-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
        }

        .country-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .country-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0) 100%);
        }

        .country-name {
          position: absolute;
          top: 2rem;
          left: 50%;
          transform: translateX(-50%);
          color: white;
          font-size: 1.125rem;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          text-shadow: 0 2px 10px rgba(0,0,0,0.3);
        }

        .recently-section {
          background: #f9fafb;
          padding: 4rem 2rem;
        }

        .recently-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2.5rem;
        }

        .section-title-left {
          font-size: 2rem;
          font-weight: 700;
          color: #1a1a2e;
          margin: 0;
        }

        .see-all-link {
          color: #3b82f6;
          text-decoration: none;
          font-weight: 600;
          font-size: 1rem;
          transition: color 0.3s ease;
        }

        .see-all-link:hover {
          color: #2563eb;
        }

        .properties-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
        }

        .property-card {
          background: white;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          display: flex;
          gap: 1rem;
          padding: 1rem;
        }

        .property-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
        }

        .property-image-wrapper {
          flex-shrink: 0;
          width: 140px;
          height: 140px;
          border-radius: 12px;
          overflow: hidden;
        }

        .property-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .property-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 0.5rem 0;
        }

        .property-title {
          font-size: 1.125rem;
          font-weight: 700;
          color: #1a1a2e;
          margin: 0 0 0.75rem 0;
          line-height: 1.4;
        }

        .property-details {
          display: flex;
          gap: 1rem;
          margin-bottom: 0.75rem;
        }

        .property-detail {
          font-size: 0.875rem;
          color: #6b7280;
        }

        .property-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .property-posted {
          font-size: 0.875rem;
          color: #6b7280;
        }

        .property-price {
          font-size: 1rem;
          font-weight: 700;
          color: white;
          background: #6b7280;
          padding: 0.375rem 1rem;
          border-radius: 20px;
        }

        .cta-section {
          background: white;
          padding: 4rem 2rem;
        }

        .cta-container {
          max-width: 1200px;
          margin: 0 auto;
          background: linear-gradient(135deg, #dce9f5 0%, #c9ddef 100%);
          border-radius: 30px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          overflow: hidden;
          min-height: 320px;
        }

        .cta-content {
          padding: 3rem 3rem 3rem 4rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .cta-title {
          font-size: 2.75rem;
          font-weight: 700;
          color: #1a1a2e;
          margin: 0 0 1.5rem 0;
          line-height: 1.2;
        }

        .cta-description {
          color: #6b7280;
          font-size: 1rem;
          line-height: 1.6;
          margin-bottom: 2rem;
        }

        .cta-button {
          background: #3b82f6;
          color: white;
          border: none;
          padding: 1rem 2rem;
          border-radius: 8px;
          font-size: 0.875rem;
          font-weight: 700;
          letter-spacing: 1px;
          cursor: pointer;
          transition: background 0.3s ease;
          align-self: flex-start;
        }

        .cta-button:hover {
          background: #2563eb;
        }

        .cta-image-wrapper {
          position: relative;
          overflow: hidden;
        }

        .cta-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }

        @media (max-width: 968px) {
          .container {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .hero-title {
            font-size: 2.5rem;
          }

          .search-form {
            flex-direction: column;
            align-items: stretch;
          }

          .search-button {
            width: 100%;
          }

          .countries-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .section-title {
            font-size: 2rem;
          }

          .properties-grid {
            grid-template-columns: 1fr;
          }

          .section-title-left {
            font-size: 1.75rem;
          }

          .cta-container {
            grid-template-columns: 1fr;
            min-height: auto;
          }

          .cta-content {
            padding: 2.5rem 2rem;
          }

          .cta-title {
            font-size: 2.25rem;
          }

          .cta-image-wrapper {
            height: 250px;
          }

          .cta-button {
            width: 100%;
          }
        }

        @media (max-width: 640px) {
          .hero-title {
            font-size: 2rem;
          }

          .hero-section {
            padding: 2rem 1rem;
          }

          .countries-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .section-title {
            font-size: 1.75rem;
          }

          .property-card {
            flex-direction: column;
          }

          .property-image-wrapper {
            width: 100%;
            height: 200px;
          }

          .cta-title {
            font-size: 2rem;
          }

          .cta-description br {
            display: none;
          }
        }
      `}</style>
        
      <div className="hero-section">
        
        <div className="container">
          <div className="content-left">
            <h1 className="hero-title">
              Easy way to find a perfect property
            </h1>
            <p className="hero-description">
              We provide a complete service for the sale, purchase or rental of real estate.
            </p>

            <div className="tabs">
              <button 
                className={`tab ₹{activeTab === 'rent' ? 'active' : ''}`}
                onClick={() => setActiveTab('rent')}
              >
                Rent
              </button>
              <button 
                className={`tab ₹{activeTab === 'buy' ? 'active' : ''}`}
                onClick={() => setActiveTab('buy')}
              >
                Buy
              </button>
              <button 
                className={`tab ₹{activeTab === 'sell' ? 'active' : ''}`}
                onClick={() => setActiveTab('sell')}
              >
                Sell
              </button>
            </div>

            <div className="search-form">
              <div className="form-group">
                <label className="form-label">Location</label>
                <div className="input-wrapper">
                  <MapPin size={18} className="input-icon" />
                  <input 
                    type="text" 
                    placeholder="Select Your City" 
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Property Type</label>
                <div className="select-wrapper">
                  <div className="input-wrapper">
                    <MapPin size={18} className="input-icon" />
                    <select className="form-select">
                      <option>Choose Property Type</option>
                      <option>House</option>
                      <option>Apartment</option>
                      <option>Villa</option>
                      <option>Condo</option>
                    </select>
                  </div>
                  <ChevronDown size={18} className="chevron-icon" />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Price Range</label>
                <div className="select-wrapper">
                  <div className="input-wrapper">
                    <MapPin size={18} className="input-icon" />
                    <select className="form-select">
                      <option>Choose Price Range</option>
                      <option>₹0 - ₹100,000</option>
                      <option>₹100,000 - ₹300,000</option>
                      <option>₹300,000 - ₹500,000</option>
                      <option>₹500,000+</option>
                    </select>
                  </div>
                  <ChevronDown size={18} className="chevron-icon" />
                </div>
              </div>

              <button className="search-button">
                <Search size={20} />
              </button>
            </div>
          </div>

          <div className="image-container">
            <img 
              src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80" 
              alt="Beautiful house" 
              className="house-image"
            />
          </div>
        </div>
      </div>

      {/* Countries Section */}
      <div className="countries-section">
        <div className="countries-container">
          <h2 className="section-title">
            We are available in many<br />well-known countries
          </h2>

          <div className="countries-grid">
            <div className="country-card">
              <img 
                src="https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=600&q=80" 
                alt="America - Statue of Liberty" 
                className="country-image"
              />
              <div className="country-overlay"></div>
              <h3 className="country-name">AMERICA</h3>
            </div>

            <div className="country-card">
              <img 
                src="https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=600&q=80" 
                alt="Spain - Barcelona" 
                className="country-image"
              />
              <div className="country-overlay"></div>
              <h3 className="country-name">SPAIN</h3>
            </div>

            <div className="country-card">
              <img 
                src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&q=80" 
                alt="London - Big Ben" 
                className="country-image"
              />
              <div className="country-overlay"></div>
              <h3 className="country-name">LONDON</h3>
            </div>

            <div className="country-card">
              <img 
                src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80" 
                alt="France - Eiffel Tower" 
                className="country-image"
              />
              <div className="country-overlay"></div>
              <h3 className="country-name">FRANCE</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Recently Added Section */}
      <div className="recently-section">
        <div className="recently-container">
          <div className="section-header">
            <h2 className="section-title-left">Recently Added</h2>
            <a href="#" className="see-all-link">See all</a>
          </div>

          <div className="properties-grid">
            {loadingRecent && <div style={{ padding: 20, color: '#6b7280' }}>Loading latest properties...</div>}
            {recentError && <div style={{ padding: 20, color: 'red' }}>Error: {recentError}</div>}
            {!loadingRecent && !recentError && recent.length === 0 && (
              <div style={{ padding: 20, color: '#6b7280' }}>No properties found.</div>
            )}

            {recent.map((p) => {
              const img = (p.images && p.images.length > 0) ? p.images[0] : 'https://images.unsplash.com/photo-1560185127-6b0b1d1f8b8e?w=800&q=80';
              const price = (typeof p.price === 'number') ? new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(p.price) : (p.price || '—');
              return (
                <div key={p.propertyId} className="property-card">
                  <div className="property-image-wrapper">
                    <img src={img} alt={p.title} className="property-image" />
                  </div>
                  <div className="property-content">
                    <h3 className="property-title">{p.title}</h3>
                    <div className="property-details">
                      <span className="property-detail">{p.propertyType}</span>
                      <span className="property-detail">{p.city}{p.state ? `, ${p.state}` : ''}</span>
                      <span className="property-detail">{p.pincode}</span>
                    </div>
                    <div className="property-footer">
                      <span className="property-posted">Posted by {p.sellerName ?? '—'}</span>
                      <span className="property-price">{price}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="cta-section">
        <div className="cta-container">
          <div className="cta-content">
            <h2 className="cta-title">Find your best<br />Real Estate</h2>
            <p className="cta-description">
              We provide a complete service for the sale,<br />
              purchase or rental of real estate.
            </p>
            <button className="cta-button">CONTACT US</button>
          </div>
          <div className="cta-image-wrapper">
            <img 
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80" 
              alt="Modern office building" 
              className="cta-image"
            />
          </div>
        </div>
      </div>
    </>
  );
}