import React from 'react';

export default function AboutUs() {
  const features = [
    {
      icon: "🏠",
      title: "Wide Range of Properties",
      description: "We offer expert legal help for all related property items in Delhi."
    },
    {
      icon: "💰",
      title: "Trusted by Thousands",
      description: "We offer you free consultancy to get a loan for your new property."
    },
    {
      icon: "🔒",
      title: "Secure & Safe",
      description: "We provide the best security features for your property transactions."
    },
    {
      icon: "✨",
      title: "Easy Process",
      description: "Buy or rent properties with our easy and streamlined process."
    }
  ];

  return (
    <div className="about-page">
      <link 
        href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css" 
        rel="stylesheet"
      />
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .about-page {
          min-height: 100vh;
          background: #f5f7fa;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
        }

        .hero-section {
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%);
          padding: 80px 0 60px;
        }

        .hero-content {
          display: flex;
          align-items: center;
          gap: 60px;
        }

        .hero-text {
          flex: 1;
        }

        .hero-text h1 {
          font-size: 3rem;
          font-weight: 700;
          color: #1a1f36;
          margin-bottom: 20px;
          line-height: 1.2;
        }

        .hero-text .subtitle {
          font-size: 1.3rem;
          color: #667eea;
          font-weight: 600;
          margin-bottom: 25px;
        }

        .hero-text p {
          font-size: 1.1rem;
          color: #5a6c7d;
          line-height: 1.8;
          margin-bottom: 15px;
        }

        .hero-image {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .image-placeholder {
          width: 100%;
          max-width: 500px;
          height: 400px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 20px 60px rgba(102, 126, 234, 0.3);
          position: relative;
          overflow: hidden;
        }

        .house-illustration {
          font-size: 10rem;
          filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.2));
        }

        .features-section {
          padding: 80px 0;
          background: white;
        }

        .section-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .section-header h2 {
          font-size: 2.5rem;
          font-weight: 700;
          color: #1a1f36;
          margin-bottom: 15px;
        }

        .section-header p {
          font-size: 1.1rem;
          color: #5a6c7d;
          max-width: 700px;
          margin: 0 auto;
        }

        .feature-card {
          background: white;
          border-radius: 15px;
          padding: 40px 30px;
          text-align: center;
          transition: all 0.3s ease;
          border: 2px solid #f0f0f0;
          height: 100%;
        }

        .feature-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 15px 40px rgba(102, 126, 234, 0.15);
          border-color: #667eea;
        }

        .feature-icon {
          font-size: 4rem;
          margin-bottom: 20px;
          display: block;
        }

        .feature-card h4 {
          font-size: 1.4rem;
          font-weight: 700;
          color: #1a1f36;
          margin-bottom: 15px;
        }

        .feature-card p {
          font-size: 1rem;
          color: #5a6c7d;
          line-height: 1.7;
        }

        .mission-section {
          padding: 80px 0;
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%);
        }

        .mission-content {
          display: flex;
          align-items: center;
          gap: 60px;
        }

        .mission-image {
          flex: 1;
        }

        .mission-placeholder {
          width: 100%;
          height: 350px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 8rem;
          box-shadow: 0 20px 60px rgba(102, 126, 234, 0.3);
        }

        .mission-text {
          flex: 1;
        }

        .mission-text h2 {
          font-size: 2.5rem;
          font-weight: 700;
          color: #1a1f36;
          margin-bottom: 25px;
        }

        .mission-text p {
          font-size: 1.1rem;
          color: #5a6c7d;
          line-height: 1.8;
          margin-bottom: 20px;
        }

        .stats-section {
          padding: 80px 0;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        .stat-item {
          text-align: center;
          padding: 30px 20px;
        }

        .stat-number {
          font-size: 3.5rem;
          font-weight: 700;
          margin-bottom: 10px;
          line-height: 1;
        }

        .stat-label {
          font-size: 1.2rem;
          opacity: 0.95;
          font-weight: 500;
        }

        @media (max-width: 991px) {
          .hero-content,
          .mission-content {
            flex-direction: column;
            gap: 40px;
          }

          .hero-text h1 {
            font-size: 2.5rem;
          }

          .image-placeholder {
            height: 300px;
          }

          .house-illustration {
            font-size: 8rem;
          }

          .mission-placeholder {
            height: 300px;
            font-size: 6rem;
          }
        }

        @media (max-width: 767px) {
          .hero-section {
            padding: 50px 0 40px;
          }

          .hero-text h1 {
            font-size: 2rem;
          }

          .hero-text .subtitle {
            font-size: 1.1rem;
          }

          .hero-text p {
            font-size: 1rem;
          }

          .section-header h2 {
            font-size: 2rem;
          }

          .image-placeholder {
            height: 250px;
          }

          .house-illustration {
            font-size: 6rem;
          }

          .feature-card {
            margin-bottom: 20px;
          }

          .mission-text h2 {
            font-size: 2rem;
          }

          .stat-number {
            font-size: 2.5rem;
          }

          .stat-label {
            font-size: 1rem;
          }
        }
      `}</style>

      {/* Hero Section */}
      <div className="hero-section">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <div className="subtitle">About LogoIpsum</div>
              <h1>Easy way to find a perfect property</h1>
              <p>
                We provide a complete service for the sale, purchase or rental of real estate. 
                Our team of experts is ready to help you find your dream property.
              </p>
              <p>
                With years of experience in the industry, we understand what it takes to match 
                the right property with the right person. Your satisfaction is our priority.
              </p>
            </div>
            <div className="hero-image">
              <div className="image-placeholder">
                <div className="house-illustration">🏠</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="features-section">
        <div className="container">
          <div className="section-header">
            <h2>Why Choose Us</h2>
            <p>We provide the best services to make your property search easier and more reliable</p>
          </div>
          <div className="row">
            {features.map((feature, index) => (
              <div key={index} className="col-lg-3 col-md-6 mb-4">
                <div className="feature-card">
                  <span className="feature-icon">{feature.icon}</span>
                  <h4>{feature.title}</h4>
                  <p>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="mission-section">
        <div className="container">
          <div className="mission-content">
            <div className="mission-image">
              <div className="mission-placeholder">
                🎯
              </div>
            </div>
            <div className="mission-text">
              <h2>Our Mission</h2>
              <p>
                Our mission is to revolutionize the real estate experience by providing 
                transparent, efficient, and customer-centric services. We believe everyone 
                deserves to find their perfect property without stress or complications.
              </p>
              <p>
                We leverage technology and expertise to simplify the property search process, 
                ensuring that you have all the information and support you need to make 
                confident decisions about your real estate investments.
              </p>
              <p>
                Trust, integrity, and excellence are the foundations of our business. We're 
                committed to building lasting relationships with our clients by delivering 
                exceptional results every single time.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="stats-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6 col-6">
              <div className="stat-item">
                <div className="stat-number">500+</div>
                <div className="stat-label">Properties</div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-6">
              <div className="stat-item">
                <div className="stat-number">1000+</div>
                <div className="stat-label">Happy Clients</div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-6">
              <div className="stat-item">
                <div className="stat-number">15+</div>
                <div className="stat-label">Years Experience</div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-6">
              <div className="stat-item">
                <div className="stat-number">50+</div>
                <div className="stat-label">Team Members</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}