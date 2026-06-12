import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';
import '../styles/Auth.css';

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get('token');
    if (token) {
      localStorage.setItem('token', token);
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleGoogleLogin = () => {
    try {
      authAPI.loginWithGoogle();
    } catch (err) {
      setError('Failed to initiate login');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Birthday Memory Album</h1>
        <p className="login-subtitle">Create and cherish your birthday memories</p>
        
        <button className="google-login-btn" onClick={handleGoogleLogin}>
          <img src="https://www.gstatic.com/firebaseapp/images/logo-plus.png" alt="Google" />
          Sign in with Google
        </button>

        {error && <p className="error-message">{error}</p>}

        <p className="login-info">
          Sign in with your Gmail account to create albums and store your birthday memories.
        </p>
      </div>
    </div>
  );
};

export default Login;
