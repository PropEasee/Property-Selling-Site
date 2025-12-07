import React, { useState } from 'react';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.subject && formData.message) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      }, 3000);
    }
  };

  return (
    <>
      <link 
        href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.2/css/bootstrap.min.css" 
        rel="stylesheet"
      />
      <link 
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" 
        rel="stylesheet"
      />
      
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          background-color: #f9fafb;
        }

        .hero {
          background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 50%, #1e40af 100%);
          color: white;
          padding: 4rem 0 5rem 0;
          position: relative;
          overflow: hidden;
        }

        .hero::before {
          content: '';
          position: absolute;
          top: 40px;
          right: 40px;
          width: 250px;
          height: 250px;
          background: rgba(255,255,255,0.1);
          border-radius: 50%;
          filter: blur(80px);
        }

        .hero::after {
          content: '';
          position: absolute;
          bottom: 40px;
          left: 40px;
          width: 350px;
          height: 350px;
          background: rgba(147, 197, 253, 0.1);
          border-radius: 50%;
          filter: blur(80px);
        }

        .hero h1 {
          font-size: 3rem;
          font-weight: 700;
          margin-bottom: 1rem;
          position: relative;
          z-index: 1;
        }

        .hero p {
          font-size: 1.15rem;
          color: #bfdbfe;
          position: relative;
          z-index: 1;
        }

        .contact-cards-section {
          margin-top: -50px;
          position: relative;
          z-index: 10;
          padding-bottom: 3rem;
        }

        .contact-card {
          background: white;
          border-radius: 1rem;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          padding: 2rem 1.5rem;
          text-align: center;
          transition: all 0.3s;
          height: 100%;
        }

        .contact-card:hover {
          box-shadow: 0 15px 40px rgba(0,0,0,0.15);
          transform: translateY(-5px);
        }

        .contact-card .icon-circle {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1rem;
          font-size: 1.75rem;
        }

        .contact-card.green .icon-circle {
          background: #d1fae5;
          color: #059669;
        }

        .contact-card.purple .icon-circle {
          background: #e9d5ff;
          color: #9333ea;
        }

        .contact-card.orange .icon-circle {
          background: #fed7aa;
          color: #ea580c;
        }

        .contact-card h3 {
          font-weight: 700;
          font-size: 1.125rem;
          margin-bottom: 0.5rem;
          color: #111827;
        }

        .contact-card p {
          color: #6b7280;
          font-size: 0.875rem;
          margin: 0;
          line-height: 1.6;
        }

        .form-section {
          padding: 2rem 0 4rem 0;
        }

        .form-container {
          background: white;
          border-radius: 1.5rem;
          box-shadow: 0 20px 50px rgba(0,0,0,0.1);
          padding: 2.5rem;
        }

        .form-container h2 {
          font-size: 2.25rem;
          font-weight: 700;
          color: #111827;
          margin-bottom: 0.5rem;
        }

        .form-container .subtitle {
          color: #6b7280;
          margin-bottom: 2rem;
          font-size: 0.95rem;
        }

        .form-label {
          font-weight: 600;
          font-size: 0.875rem;
          color: #374151;
          margin-bottom: 0.5rem;
        }

        .form-control {
          border: 2px solid #e5e7eb;
          border-radius: 0.5rem;
          padding: 0.75rem 1rem;
          font-size: 0.9375rem;
          transition: all 0.3s;
        }

        .form-control:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
          outline: none;
        }

        .btn-submit {
          background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%);
          color: white;
          border: none;
          border-radius: 0.5rem;
          padding: 1rem;
          font-weight: 600;
          font-size: 1rem;
          width: 100%;
          transition: all 0.3s;
          box-shadow: 0 10px 25px rgba(59, 130, 246, 0.3);
          cursor: pointer;
        }

        .btn-submit:hover {
          box-shadow: 0 15px 35px rgba(59, 130, 246, 0.4);
          transform: translateY(-2px);
        }

        .success-alert {
          background: #d1fae5;
          border-left: 4px solid #059669;
          color: #065f46;
          padding: 1rem;
          border-radius: 0.5rem;
          margin-bottom: 1.5rem;
        }

        .info-box {
          background: linear-gradient(135deg, #eff6ff 0%, #e0e7ff 100%);
          border-radius: 1.5rem;
          box-shadow: 0 10px 30px rgba(0,0,0,0.08);
          padding: 2.5rem;
          margin-bottom: 1.5rem;
        }

        .info-box h3 {
          font-size: 1.75rem;
          font-weight: 700;
          color: #111827;
          margin-bottom: 1.5rem;
        }

        .info-item {
          display: flex;
          align-items: start;
          margin-bottom: 1.25rem;
        }

        .info-item:last-child {
          margin-bottom: 0;
        }

        .info-check {
          width: 32px;
          height: 32px;
          background: #3b82f6;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 700;
          font-size: 0.875rem;
          margin-right: 1rem;
          flex-shrink: 0;
        }

        .info-item h4 {
          font-weight: 700;
          font-size: 1rem;
          color: #111827;
          margin-bottom: 0.25rem;
        }

        .info-item p {
          color: #6b7280;
          font-size: 0.875rem;
          line-height: 1.6;
          margin: 0;
        }

        .help-box {
          background: linear-gradient(135deg, #f3e8ff 0%, #e0e7ff 100%);
          border-radius: 1.5rem;
          box-shadow: 0 10px 30px rgba(0,0,0,0.08);
          padding: 2.5rem;
        }

        .help-box h3 {
          font-size: 1.75rem;
          font-weight: 700;
          color: #111827;
          margin-bottom: 1.5rem;
        }

        .help-card {
          background: white;
          border-radius: 1rem;
          padding: 1.5rem;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
          margin-bottom: 1.25rem;
        }

        .help-card:last-child {
          margin-bottom: 0;
        }

        .help-card h4 {
          font-weight: 700;
          font-size: 1rem;
          color: #111827;
          margin-bottom: 0.5rem;
          display: flex;
          align-items: center;
        }

        .help-card h4 i {
          margin-right: 0.5rem;
          font-size: 1.25rem;
        }

        .help-card p {
          color: #6b7280;
          font-size: 0.875rem;
          line-height: 1.6;
          margin-bottom: 0.5rem;
        }

        .help-card .contact-info {
          color: #3b82f6;
          font-weight: 600;
          margin-top: 0.5rem;
          display: block;
        }

        @media (max-width: 768px) {
          .hero {
            padding: 3rem 0 4rem 0;
          }
          .hero h1 {
            font-size: 2rem;
          }
          .hero p {
            font-size: 1rem;
          }
          .form-container {
            padding: 2rem 1.5rem;
          }
          .form-container h2 {
            font-size: 1.75rem;
          }
          .info-box, .help-box {
            padding: 2rem;
          }
        }
      `}</style>

      <div style={{ backgroundColor: '#f9fafb', minHeight: '100vh' }}>
        {/* Hero Section */}
        <section className="hero">
          <div className="container">
            <div className="text-center">
              <h1>Get In Touch With Us</h1>
              <p className="mx-auto" style={{ maxWidth: '600px' }}>
                Have questions about properties? Our expert team is here to help you find your perfect home.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Cards */}
        <section className="contact-cards-section">
          <div className="container">
            <div className="row g-4">
              <div className="col-md-6 col-lg-4">
                <div className="contact-card green">
                  <div className="icon-circle">
                    <i className="fas fa-phone"></i>
                  </div>
                  <h3>Call Us</h3>
                  <p>+1 (555) 123-4567<br />+1 (555) 765-4321</p>
                </div>
              </div>
              <div className="col-md-6 col-lg-4">
                <div className="contact-card purple">
                  <div className="icon-circle">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <h3>Email Us</h3>
                  <p>info@logoipsum.com<br />support@logoipsum.com</p>
                </div>
              </div>
              <div className="col-md-6 col-lg-4">
                <div className="contact-card orange">
                  <div className="icon-circle">
                    <i className="fas fa-clock"></i>
                  </div>
                  <h3>Working Hours</h3>
                  <p>Mon - Fri: 9AM - 6PM<br />Sat - Sun: 10AM - 4PM</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="form-section">
          <div className="container">
            <div className="row g-4">
              {/* Contact Form */}
              <div className="col-lg-6">
                <div className="form-container">
                  <h2>Send Us a Message</h2>
                  <p className="subtitle">Fill out the form below and we'll get back to you within 24 hours.</p>
                  
                  {submitted && (
                    <div className="success-alert">
                      <p className="fw-semibold mb-1">Success!</p>
                      <p className="mb-0" style={{ fontSize: '0.875rem' }}>Your message has been sent successfully.</p>
                    </div>
                  )}

                  <div className="mb-3">
                    <label className="form-label">Full Name *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Email Address *</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Phone Number</label>
                    <input
                      type="tel"
                      className="form-control"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Subject *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="How can we help?"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label">Message *</label>
                    <textarea
                      className="form-control"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="5"
                      placeholder="Tell us more about your inquiry..."
                      required
                    ></textarea>
                  </div>

                  <button type="button" className="btn btn-submit" onClick={handleSubmit}>
                    <span className="me-2">Send Message</span>
                    <i className="fas fa-paper-plane"></i>
                  </button>
                </div>
              </div>

              {/* Info Boxes */}
              <div className="col-lg-6">
                <div className="info-box">
                  <h3>Why Choose Us?</h3>
                  <div className="info-item">
                    <div className="info-check">✓</div>
                    <div>
                      <h4>Expert Guidance</h4>
                      <p>Our experienced agents provide personalized service to help you find your perfect property.</p>
                    </div>
                  </div>
                  <div className="info-item">
                    <div className="info-check">✓</div>
                    <div>
                      <h4>Trusted Service</h4>
                      <p>With over 15 years in the industry, we've helped thousands of families find their dream homes.</p>
                    </div>
                  </div>
                </div>

                <div className="help-box">
                  <h3>Need Immediate Help?</h3>
                  
                  <div className="help-card">
                    <h4>
                      <i className="fas fa-phone" style={{ color: '#059669' }}></i>
                      Call Us Now
                    </h4>
                    <p>Speak directly with our team for urgent inquiries or immediate assistance.</p>
                    <span className="contact-info">+1 (555) 123-4567</span>
                  </div>

                  <div className="help-card">
                    <h4>
                      <i className="fas fa-envelope" style={{ color: '#9333ea' }}></i>
                      Email Support
                    </h4>
                    <p>Send us detailed questions and we'll respond within 24 hours.</p>
                    <span className="contact-info">info@logoipsum.com</span>
                  </div>

                  <div className="help-card">
                    <h4>
                      <i className="fas fa-clock" style={{ color: '#ea580c' }}></i>
                      Response Time
                    </h4>
                    <p>We typically respond to all inquiries within 2-4 business hours during working days.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}