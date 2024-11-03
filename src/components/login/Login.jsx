import React, { useEffect, useState } from 'react';
import './login.css';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; 
import axios from 'axios';

const Login = () => {
  const [tin, setTin] = useState(''); // Initialize as an empty string
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate TIN
    if (tin.trim().length !== 9 || tin.startsWith('0')) {
      setError('Invalid TIN number');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:8080/users/authentication',
        { tin, password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        const data = response.data;
        setToken(data.token);
      } else {
        setError('Invalid Credentials');
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          setError('Invalid Credentials');
        } else if (error.response.status === 403) {
          setError('Forbidden');
        }
      } else if (error.request) {
        setError('No response received from server');
      } else {
        setError('Something went wrong');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      const isDefault = decodedToken.isDefault;
      const roles = decodedToken.roles || [];

      sessionStorage.setItem('tin', tin);
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('auths', true);
      sessionStorage.setItem('roles', roles);

      if (roles.includes('taxpayer')) {
        if (isDefault) {
          navigate('/forgot');
        } else {
          navigate('/home');
        }
      } else if (roles.includes('admin')) {
        navigate('/admin');
      }
    }
  }, [token, tin, navigate]);

  return (
    <div className="login__container">
      <div className="login__content">
        <h2 className="login__header">Login</h2>
        {error && <p className="signup__error">{error}</p>}
        <form className="login__form" onSubmit={handleLogin}>
          <label className="signup__label">TIN or Username</label>
          <input
            type="number"
            placeholder="Enter TIN or Username"
            className="signup__input"
            value={tin}
            onChange={(e) => setTin(e.target.value)}
          />
          <label className="signup__label">Password</label>
          <input
            type="password"
            placeholder="Enter Password"
            className="signup__input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Link to="/forgot-password" className="forgot__link">
            Forgot password?
          </Link>
          <button className="login__btn" disabled={loading}>
            {loading ? 'Loading...' : 'Login'}
          </button>
          <Link to="/signup" className="login__link">
            Not a Member? Signup
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
