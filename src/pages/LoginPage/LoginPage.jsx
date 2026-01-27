import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

    const navigate = useNavigate()


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        throw new Error('Invalid email or password');
      }

      const user = await response.json();

      // Save logged-in user
      localStorage.setItem('user', JSON.stringify(user));

      // Redirect based on role
      if (user.role === 'ADMIN') {
        navigate('/home');
      } else if (user.role === 'SELLER') {
        navigate('/home');
      } else {
        navigate('/home');
      }

    } catch (err) {
      setError(err.message);
    }
  };



  return (
    <>
    
      <style>{`
        
      `}</style>

      <div className="login-page">
        <div className="login-left">
          <div className="login-image-wrapper">
            <img
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80"
              alt="Modern house"
              className="login-image"
            />
          </div>
        </div>

        <div className="login-right">
          <div className="login-form-container">
            <span className="logo-text">PropEase</span>

            <h1 className="login-title">Welcome back</h1>
            <p className="login-subtitle">
              Please enter your details to sign in
            </p>

            {error && (
              <p style={{ color: 'red', marginBottom: '1rem' }}>
                {error}
              </p>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Email</label>
                <div className="input-wrapper">
                  <Mail size={20} className="input-icon" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="form-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Password</label>
                <div className="input-wrapper">
                  <Lock size={20} className="input-icon" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    className="form-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <button type="submit" className="login-button">
                Sign In
              </button>
            </form>

            <p className="signup-text">
              Don't have an account?{' '}
              <a href="/register" className="signup-link">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}