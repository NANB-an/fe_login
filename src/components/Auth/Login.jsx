import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    remember_me: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    const result = await login(credentials);

    if (result.success) {
      navigate('/', { replace: true });
    } else {
      setErrors(result.error?.errors || { message: result.error?.message });
    }
    
    setIsLoading(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login to Your Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              value={credentials.email}
              onChange={(e) => setCredentials({...credentials, email: e.target.value})}
              required
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <span className="error-text">{errors.email[0]}</span>}
          </div>

          <div className="form-group password-group">
            <label htmlFor="password">Password</label>
            <div className="password-wrapper">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={credentials.password}
              onChange={(e) => setCredentials({...credentials, password: e.target.value})}
              required
              className={errors.password ? 'error' : ''}
            />
              <span
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </span>
              </div>
            {errors.password && <span className="error-text">{errors.password[0]}</span>}
          </div>

          <div className="form-group remember">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={credentials.remember_me}
                onChange={(e) => setCredentials({...credentials, remember_me: e.target.checked})}
              />
              <span className="checkmark"></span>
              Remember me
            </label>
          </div>

          {errors.message && <div className="error-message">{errors.message}</div>}

          <button type="submit" disabled={isLoading} className="btn btn-primary">
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Don't have an account? <Link to="/register">Sign up here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
