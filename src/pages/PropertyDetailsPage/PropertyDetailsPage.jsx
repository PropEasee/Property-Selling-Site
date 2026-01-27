import React, { useState, useEffect } from 'react';
import { MapPin, Heart, Share2, Phone, Mail, User, Calendar, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { useParams } from 'react-router-dom';

export default function PropertyDetailsPage() {
  const { propertyId } = useParams();
  const [isSaved, setIsSaved] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedScheduleDate, setSelectedScheduleDate] = useState('');
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/properties/${propertyId || 3}`);
        if (!response.ok) throw new Error('Failed to fetch property');
        const data = await response.json();
        setProperty(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProperty();
  }, [propertyId]);

  if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading property details...</div>;
  if (error) return <div style={{ padding: '2rem', color: 'red' }}>Error: {error}</div>;
  if (!property) return <div style={{ padding: '2rem' }}>Property not found</div>;

  const displayImages = property.images && property.images.length > 0 
    ? property.images 
    : ['https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1200&q=80'];

  const handlePreviousImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? displayImages.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === displayImages.length - 1 ? 0 : prev + 1));
  };

  const handleScheduleTour = () => {
    if (selectedScheduleDate) {
      console.log('Tour scheduled for:', selectedScheduleDate);
      alert('Tour scheduled successfully!');
      setSelectedScheduleDate('');
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(price);
  };

  const propertyFeatures = [
    { icon: "🏡", title: "Property Type", description: property.propertyType },
    { icon: "📍", title: "Location", description: `${property.city}, ${property.state}` },
    { icon: "📮", title: "Pincode", description: property.pincode },
    { icon: "📅", title: "Listed", description: new Date(property.createdAt).toLocaleDateString() },
    { icon: "✅", title: "Status", description: property.status },
  ];

  const propertyAmenities = [
    "Well Maintained",
    "Modern Fixtures",
    "Good Ventilation",
    "Security System",
    "Parking Available",
    "Gated Community",
    "Water Supply",
    "Electricity Connection"
  ];

  const mockAgent = {
    name: "Real Estate Agent",
    title: "Property Specialist",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80",
    phone: "(555) 123-4567",
    email: "agent@realestateagency.com"
  };

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

        .property-details-page {
          min-height: 100vh;
          background: #f9fafb;
        }

        .breadcrumb {
          background: white;
          padding: 1rem 2rem;
          border-bottom: 1px solid #e5e7eb;
        }

        .breadcrumb-container {
          max-width: 1400px;
          margin: 0 auto;
        }

        .breadcrumb-list {
          display: flex;
          gap: 0.5rem;
          list-style: none;
          font-size: 0.875rem;
          color: #6b7280;
        }

        .breadcrumb-item {
          display: flex;
          align-items: center;
        }

        .breadcrumb-link {
          color: #3b82f6;
          text-decoration: none;
          font-weight: 500;
        }

        .breadcrumb-link:hover {
          text-decoration: underline;
        }

        .breadcrumb-separator {
          margin: 0 0.5rem;
        }

        .property-hero {
          background: white;
          padding: 2rem;
        }

        .hero-container {
          max-width: 1400px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 2rem;
        }

        .image-gallery {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          aspect-ratio: 4/3;
          background: #e5e7eb;
        }

        .main-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .gallery-nav-button {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255, 255, 255, 0.9);
          border: none;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          z-index: 10;
        }

        .gallery-nav-button:hover {
          background: white;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .gallery-prev {
          left: 1rem;
        }

        .gallery-next {
          right: 1rem;
        }

        .gallery-indicators {
          position: absolute;
          bottom: 1rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 0.5rem;
          z-index: 10;
        }

        .indicator-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.5);
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .indicator-dot.active {
          background: white;
          width: 24px;
          border-radius: 4px;
        }

        .thumbnail-gallery {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
          margin-top: 1rem;
        }

        .thumbnail {
          width: 100%;
          aspect-ratio: 4/3;
          border-radius: 12px;
          overflow: hidden;
          cursor: pointer;
          border: 3px solid transparent;
          transition: border-color 0.3s ease;
        }

        .thumbnail.active {
          border-color: #3b82f6;
        }

        .thumbnail img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .property-header {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .property-price-title {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 1rem;
        }

        .price-section {
          flex: 1;
        }

        .property-price {
          font-size: 2.5rem;
          font-weight: 700;
          color: #1a1a2e;
          margin-bottom: 0.5rem;
        }

        .property-title {
          font-size: 1.75rem;
          font-weight: 700;
          color: #1a1a2e;
          margin-bottom: 0.75rem;
        }

        .property-location {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #6b7280;
          font-size: 1rem;
          margin-bottom: 1rem;
        }

        .action-buttons {
          display: flex;
          gap: 1rem;
        }

        .icon-button {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          border: 2px solid #e5e7eb;
          background: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .icon-button:hover {
          border-color: #3b82f6;
          color: #3b82f6;
        }

        .icon-button.saved {
          border-color: #ef4444;
          color: #ef4444;
          background: #fef2f2;
        }

        .property-quick-info {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .info-card {
          background: #f3f4f6;
          padding: 1rem;
          border-radius: 12px;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .info-icon {
          color: #3b82f6;
          flex-shrink: 0;
        }

        .info-content {
          display: flex;
          flex-direction: column;
        }

        .info-label {
          font-size: 0.75rem;
          color: #6b7280;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .info-value {
          font-size: 1rem;
          font-weight: 700;
          color: #1a1a2e;
        }

        .schedule-tour-card {
          background: white;
          border: 2px solid #e5e7eb;
          border-radius: 16px;
          padding: 1.5rem;
        }

        .card-title {
          font-size: 1.125rem;
          font-weight: 700;
          color: #1a1a2e;
          margin-bottom: 1.5rem;
        }

        .form-group {
          margin-bottom: 1rem;
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
          padding: 0.75rem 1rem;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          font-size: 0.875rem;
          outline: none;
          transition: border-color 0.3s ease;
        }

        .form-input:focus {
          border-color: #3b82f6;
        }

        .tour-button {
          width: 100%;
          padding: 0.875rem;
          background: #3b82f6;
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .tour-button:hover {
          background: #2563eb;
        }

        .contact-agent-card {
          background: white;
          border: 2px solid #e5e7eb;
          border-radius: 16px;
          padding: 1.5rem;
          margin-top: 1rem;
          text-align: center;
        }

        .agent-image {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          object-fit: cover;
          margin: 0 auto 1rem;
        }

        .agent-name {
          font-size: 1rem;
          font-weight: 700;
          color: #1a1a2e;
          margin-bottom: 0.25rem;
        }

        .agent-title {
          font-size: 0.875rem;
          color: #6b7280;
          margin-bottom: 1rem;
        }

        .contact-buttons {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .contact-button {
          padding: 0.75rem;
          background: white;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 600;
          color: #6b7280;
        }

        .contact-button:hover {
          border-color: #3b82f6;
          color: #3b82f6;
          background: #eff6ff;
        }

        .content-section {
          background: white;
          margin-top: 2rem;
          padding: 2rem;
          border-radius: 16px;
        }

        .section-title {
          font-size: 1.75rem;
          font-weight: 700;
          color: #1a1a2e;
          margin-bottom: 1.5rem;
        }

        .description-text {
          color: #6b7280;
          line-height: 1.8;
          margin-bottom: 2rem;
          font-size: 1rem;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }

        .feature-item {
          display: flex;
          gap: 1rem;
        }

        .feature-icon {
          font-size: 2rem;
          flex-shrink: 0;
        }

        .feature-content {
          flex: 1;
        }

        .feature-title {
          font-size: 1rem;
          font-weight: 700;
          color: #1a1a2e;
          margin-bottom: 0.25rem;
        }

        .feature-description {
          color: #6b7280;
          font-size: 0.875rem;
        }

        .amenities-section {
          background: white;
          margin-top: 2rem;
          padding: 2rem;
          border-radius: 16px;
        }

        .amenities-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
        }

        .amenity-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem;
          background: #f3f4f6;
          border-radius: 12px;
        }

        .amenity-icon {
          color: #3b82f6;
          flex-shrink: 0;
        }

        .amenity-name {
          font-size: 0.9375rem;
          font-weight: 600;
          color: #1a1a2e;
        }

        .container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        @media (max-width: 1024px) {
          .hero-container {
            grid-template-columns: 1fr;
          }

          .features-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .amenities-grid {
            grid-template-columns: repeat(3, 1fr);
          }

          .property-quick-info {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .breadcrumb {
            padding: 1rem;
          }

          .property-hero {
            padding: 1rem;
          }

          .thumbnail-gallery {
            grid-template-columns: repeat(2, 1fr);
          }

          .property-price {
            font-size: 2rem;
          }

          .property-title {
            font-size: 1.5rem;
          }

          .action-buttons {
            flex-wrap: wrap;
          }

          .features-grid {
            grid-template-columns: 1fr;
          }

          .amenities-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .content-section,
          .amenities-section {
            padding: 1.5rem;
          }

          .container {
            padding: 0 1rem;
          }
        }
      `}</style>

      <div className="property-details-page">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <div className="breadcrumb-container">
            <ul className="breadcrumb-list">
              <li className="breadcrumb-item">
                <a href="/" className="breadcrumb-link">Home</a>
              </li>
              <li className="breadcrumb-item">
                <span className="breadcrumb-separator">/</span>
                <a href="/PropertyListing" className="breadcrumb-link">Properties</a>
              </li>
              <li className="breadcrumb-item">
                <span className="breadcrumb-separator">/</span>
                <span>{property.title}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Property Hero Section */}
        <div className="property-hero">
          <div className="hero-container">
            {/* Image Gallery */}
            <div>
              <div className="image-gallery">
                <img 
                  src={displayImages[currentImageIndex]} 
                  alt={property.title}
                  className="main-image"
                />
                <button 
                  className="gallery-nav-button gallery-prev"
                  onClick={handlePreviousImage}
                >
                  <ChevronLeft size={24} color="#3b82f6" />
                </button>
                <button 
                  className="gallery-nav-button gallery-next"
                  onClick={handleNextImage}
                >
                  <ChevronRight size={24} color="#3b82f6" />
                </button>
                <div className="gallery-indicators">
                  {displayImages.map((_, index) => (
                    <button
                      key={index}
                      className={`indicator-dot ${index === currentImageIndex ? 'active' : ''}`}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                </div>
              </div>

              {/* Thumbnail Gallery */}
              {displayImages.length > 1 && (
                <div className="thumbnail-gallery">
                  {displayImages.map((image, index) => (
                    <div
                      key={index}
                      className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                      onClick={() => setCurrentImageIndex(index)}
                    >
                      <img src={image} alt={`Property ${index + 1}`} />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Property Info & Booking */}
            <div>
              <div className="property-header">
                <div className="property-price-title">
                  <div className="price-section">
                    <div className="property-price">{formatPrice(property.price)}</div>
                    <h1 className="property-title">{property.title}</h1>
                    <div className="property-location">
                      <MapPin size={20} />
                      <span>{property.city}, {property.state} - {property.pincode}</span>
                    </div>
                  </div>
                  <div className="action-buttons">
                    <button 
                      className={`icon-button ${isSaved ? 'saved' : ''}`}
                      onClick={() => setIsSaved(!isSaved)}
                    >
                      <Heart size={24} fill={isSaved ? 'currentColor' : 'none'} />
                    </button>
                    <button className="icon-button">
                      <Share2 size={24} />
                    </button>
                  </div>
                </div>

                {/* Quick Info */}
                <div className="property-quick-info">
                  <div className="info-card">
                    <div className="info-icon">🏠</div>
                    <div className="info-content">
                      <span className="info-label">Property Type</span>
                      <span className="info-value">{property.propertyType}</span>
                    </div>
                  </div>
                  <div className="info-card">
                    <div className="info-icon">✅</div>
                    <div className="info-content">
                      <span className="info-label">Status</span>
                      <span className="info-value">{property.status}</span>
                    </div>
                  </div>
                  <div className="info-card">
                    <div className="info-icon">📮</div>
                    <div className="info-content">
                      <span className="info-label">Pincode</span>
                      <span className="info-value">{property.pincode}</span>
                    </div>
                  </div>
                  <div className="info-card">
                    <Calendar size={24} className="info-icon" />
                    <div className="info-content">
                      <span className="info-label">Listed</span>
                      <span className="info-value">{new Date(property.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                {/* Schedule Tour Card */}
                <div className="schedule-tour-card">
                  <h3 className="card-title">Schedule a Tour</h3>
                  <div className="form-group">
                    <label className="form-label">Preferred Date</label>
                    <input 
                      type="date" 
                      className="form-input"
                      value={selectedScheduleDate}
                      onChange={(e) => setSelectedScheduleDate(e.target.value)}
                    />
                  </div>
                  <button 
                    className="tour-button"
                    onClick={handleScheduleTour}
                  >
                    Request a Tour
                  </button>
                </div>

                {/* Contact Agent Card */}
                <div className="contact-agent-card">
                  <img 
                    src={mockAgent.image} 
                    alt={mockAgent.name}
                    className="agent-image"
                  />
                  <h4 className="agent-name">{mockAgent.name}</h4>
                  <p className="agent-title">{mockAgent.title}</p>
                  <div className="contact-buttons">
                    <button className="contact-button">
                      <Phone size={18} />
                      Call Agent
                    </button>
                    <button className="contact-button">
                      <Mail size={18} />
                      Send Email
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Property Description */}
        <div className="container">
          <div className="content-section">
            <h2 className="section-title">About this property</h2>
            <p className="description-text">
              {property.description || 'A beautiful property in ' + property.city + ', ' + property.state + '. This ' + property.propertyType.toLowerCase() + ' is available for purchase at an asking price of ' + formatPrice(property.price) + '.'}
            </p>
          </div>

          {/* Features Section */}
          <div className="content-section">
            <h2 className="section-title">Key Details</h2>
            <div className="features-grid">
              {propertyFeatures.map((feature, index) => (
                <div key={index} className="feature-item">
                  <div className="feature-icon">{feature.icon}</div>
                  <div className="feature-content">
                    <h4 className="feature-title">{feature.title}</h4>
                    <p className="feature-description">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Amenities Section */}
          <div className="amenities-section">
            <h2 className="section-title">Amenities</h2>
            <div className="amenities-grid">
              {propertyAmenities.map((amenity, index) => (
                <div key={index} className="amenity-item">
                  <Check size={20} className="amenity-icon" />
                  <span className="amenity-name">{amenity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}