import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate()

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const getLogin = () =>{
      navigate('/')
  }

  return (
    <>
      <style>{`
        .header {
          background: white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .logo-circle {
          width: 32px;
          height: 32px;
          background: linear-gradient(135deg, #22d3ee 0%, #3b82f6 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 8px;
        }

        .logo-circle-inner {
          width: 24px;
          height: 24px;
          border: 2px solid white;
          border-radius: 50%;
        }

        .logo-text {
          font-size: 1.25rem;
          font-weight: 600;
          color: #111827;
          margin: 0;
        }
          .logoimg{
            margin-right: 5px;
            
            }

        .navbar {
          padding: 1rem 0;
        }

        .navbar-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .navbar-brand {
          display: flex;
          align-items: center;
          text-decoration: none;
        }

        .navbar-menu {
          display: flex;
          align-items: center;
          gap: 2rem;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .nav-link {
          color: #374151;
          font-weight: 500;
          font-size: 0.875rem;
          letter-spacing: 0.5px;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .nav-link:hover {
          color: #111827;
        }

        .login-btn {
          padding: 0.5rem 1.5rem;
          border: 2px solid #22d3ee;
          color: #06b6d4;
          background: white;
          border-radius: 50px;
          font-weight: 500;
          font-size: 0.875rem;
          letter-spacing: 0.5px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .login-btn:hover {
          background-color: #ecfeff;
        }

        .navbar-toggler {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.5rem;
        }

        .hamburger {
          width: 24px;
          height: 2px;
          background-color: #374151;
          position: relative;
          transition: all 0.3s ease;
        }

        .hamburger::before,
        .hamburger::after {
          content: '';
          position: absolute;
          width: 24px;
          height: 2px;
          background-color: #374151;
          transition: all 0.3s ease;
        }

        .hamburger::before {
          top: -8px;
        }

        .hamburger::after {
          top: 8px;
        }

        .hamburger.active {
          background-color: transparent;
        }

        .hamburger.active::before {
          transform: rotate(45deg);
          top: 0;
        }

        .hamburger.active::after {
          transform: rotate(-45deg);
          top: 0;
        }

        @media (max-width: 768px) {
          .navbar-toggler {
            display: block;
          }

          .navbar-menu {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            flex-direction: column;
            align-items: flex-start;
            padding: 1rem;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            display: none;
          }

          .navbar-menu.active {
            display: flex;
          }

          .navbar-menu li {
            width: 100%;
            padding: 0.5rem 0;
          }

          .login-btn {
            width: 100%;
            margin-top: 0.5rem;
          }

          .navbar {
            position: relative;
          }
            
        }
      `}</style>

      <nav className="navbar header">
        <div className="navbar-container">
          <a href="#" className="navbar-brand">
            {/* <div className="logo-circle">
              <div className="logo-circle-inner"></div>
            </div> */}
            <img src="/logo2.png" alt="img" height={35} className='logoimg' />
            <span className="logo-text">PropEase</span>
          </a>

          <button className="navbar-toggler" onClick={toggleMenu}>
            <div className={`hamburger ₹{isOpen ? 'active' : ''}`}></div>
          </button>

          <ul className={`navbar-menu ₹{isOpen ? 'active' : ''}`}>
            <li><a href="home" className="nav-link">HOME</a></li>
            <li><a href="PropertyListing" className="nav-link">PROPERTIES</a></li>
            <li><a href="PropertyDetailsPage/3" className="nav-link">PROPERTIES DETAILS</a></li>
            <li><a href="AboutUs" className="nav-link">ABOUT US</a></li>
            <li><a href="ContactUs" className="nav-link">CONTACT US</a></li>

            <li><button className="login-btn" onClick={getLogin}>LOG OUT</button></li>
          </ul>
          
        </div>
        {/* <div className="navbar-container">

          <ul className={`navbar-menu ₹{isOpen ? 'active' : ''}`}>

            <li><a href="BuyerDashboard" className="nav-link">BuyerDashboard </a></li>
            <li><a href="SellerDashboard" className="nav-link">SellerDashboard</a></li>
            <li><a href="AdminDashboard" className="nav-link">AdminDashboard</a></li>

            <li><a href="SellerPropertiesList" className="nav-link">Seller Properties </a></li>
            <li><a href="AdminPropertyList" className="nav-link">Admin Property </a></li>
            <li><a href="AdminUsersList" className="nav-link">All Users List</a></li>
            <li><a href="AdminProfile" className="nav-link">Profile</a></li>

          </ul>
          
        </div> */} 
      </nav>
    </>
  );
}