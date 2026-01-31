import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    try {
      const stored = localStorage.getItem('user');
      if (stored) {
        const u = JSON.parse(stored);
        setUserRole(u?.role ?? null);
      } else {
        setUserRole(null);
      }
    } catch (e) {
      setUserRole(null);
    }
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleAuthButton = () => {
    if (userRole) {
      localStorage.removeItem('user');
      setUserRole(null);
      navigate('/');
    } else {
      navigate('/');
    }
  };

  return (
    <>
      <style>{`
        .header {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(15px); /* Increased blur effect */
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          padding: 0.5rem 1rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: sticky;
          top: 0;
          z-index: 1000;
        }

        .logo-container {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding-left: 1rem;
        }

        .logoimg {
          height: 40px;
        }

        .website-name {
          font-family: 'Poppins', sans-serif;
          font-size: 1.5rem;
          font-weight: bold;
          color: #3b82f6;
        }

        .role-badge {
          font-size: 0.75rem;
          color: #ffffff;
          background: #244b8a;
          padding: 0.25rem 0.5rem;
          border-radius: 0.9rem;
          text-transform: uppercase;
        }

        .navbar-menu {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .nav-link {
          color: #0b121d;
          font-weight: 500;
          font-size: 1rem;
          text-decoration: none;
          padding: 0.5rem 1rem;
          border-radius: 20px; /* Rounded box for links */
          transition: background-color 0.3s ease, color 0.3s ease, transform 0.3s ease;
        }

        .nav-link:hover {
          background-color: #113c83;
          color: #ffffff;
          transform: scale(1.1);
        }

        .nav-link.active {
          background-color: #113c83; /* Highlight selected option */
          color: #ffffff;
        }

        .login-btn {
          padding: 0.5rem 1.5rem;
          border: 2px solid #3b82f6;
          color: #3b82f6;
          background: transparent;
          border-radius: 50px;
          font-weight: 500;
          font-size: 0.875rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .login-btn:hover {
          background-color: #3b82f6;
          color: #ffffff;
          transform: scale(1.1);
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
          background-color: #3b82f6;
          position: relative;
          transition: all 0.3s ease;
        }

        .hamburger::before,
        .hamburger::after {
          content: '';
          position: absolute;
          width: 24px;
          height: 2px;
          background-color: #3b82f6;
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
            background: rgba(255, 255, 255, 0.9);
            backdrop-filter: blur(15px); /* Increased blur effect */
            flex-direction: column;
            align-items: flex-start;
            padding: 1rem;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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
        <div className="logo-container">
          <img src="/logo2.png" alt="Logo" className="logoimg" />
          <span className="website-name">PropEase</span>
          {userRole && <span className="role-badge">{userRole}</span>}
        </div>

        <button className="navbar-toggler" onClick={toggleMenu}>
          <div className={`hamburger ${isOpen ? 'active' : ''}`}></div>
        </button>

        <ul className={`navbar-menu ${isOpen ? 'active' : ''}`}>
          {userRole === 'ADMIN' && (
            <>
              <li>
                <a
                  href="/AdminDashboard"
                  className={`nav-link ${location.pathname === '/AdminDashboard' ? 'active' : ''}`}
                >
                  Admin Dashboard
                </a>
              </li>
              <li>
                <a
                  href="/AdminPropertyList"
                  className={`nav-link ${location.pathname === '/AdminPropertyList' ? 'active' : ''}`}
                >
                  Manage Properties
                </a>
              </li>
              <li>
                <a
                  href="/AdminUsersList"
                  className={`nav-link ${location.pathname === '/AdminUsersList' ? 'active' : ''}`}
                >
                  Users
                </a>
              </li>
              <li>
                <a
                  href="/AdminProfile"
                  className={`nav-link ${location.pathname === '/AdminProfile' ? 'active' : ''}`}
                >
                  Profile
                </a>
              </li>
            </>
          )}

          {userRole === 'SELLER' && (
            <>
              <li>
                <a
                  href="/SellerDashboard"
                  className={`nav-link ${location.pathname === '/SellerDashboard' ? 'active' : ''}`}
                >
                  Seller Dashboard
                </a>
              </li>
              <li>
                <a
                  href="/SellerPropertiesList"
                  className={`nav-link ${location.pathname === '/SellerPropertiesList' ? 'active' : ''}`}
                >
                  My Properties
                </a>
              </li>
              <li>
                <a
                  href="/AddProperty"
                  className={`nav-link ${location.pathname === '/AddProperty' ? 'active' : ''}`}
                >
                  Add Property
                </a>
              </li>
              <li>
                <a
                  href="/AdminProfile"
                  className={`nav-link ${location.pathname === '/AdminProfile' ? 'active' : ''}`}
                >
                  Profile
                </a>
              </li>
            </>
          )}

          {(!userRole || userRole === 'BUYER') && (
            <>
              <li>
                <a
                  href="/home"
                  className={`nav-link ${location.pathname === '/home' ? 'active' : ''}`}
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/PropertyListing"
                  className={`nav-link ${location.pathname === '/PropertyListing' ? 'active' : ''}`}
                >
                  Properties
                </a>
              </li>
              <li>
                <a
                  href="/BuyerDashboard"
                  className={`nav-link ${location.pathname === '/BuyerDashboard' ? 'active' : ''}`}
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="/ContactUs"
                  className={`nav-link ${location.pathname === '/ContactUs' ? 'active' : ''}`}
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="/BuyerProfile"
                  className={`nav-link ${location.pathname === '/BuyerProfile' ? 'active' : ''}`}
                >
                  Profile
                </a>
              </li>
            </>
          )}
        </ul>

        <button className="login-btn" onClick={handleAuthButton}>
          {userRole ? 'Log Out' : 'Log In'}
        </button>
      </nav>
    </>
  );
}