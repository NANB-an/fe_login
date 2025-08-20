import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();  

  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    const result = await register(userData);

    if (result.success) {
      
      navigate('/home');  

    } else {
      setErrors(result.error?.errors || { message: result.error?.message });
    }
    
    setIsLoading(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Create Your Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              value={userData.name}
              onChange={(e) => setUserData({ ...userData, name: e.target.value })}
              required
              className={errors.name ? 'error' : ''}
            />
            {errors.name && <span className="error-text">{errors.name[0]}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              value={userData.email}
              onChange={(e) => setUserData({ ...userData, email: e.target.value })}
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
              value={userData.password}
              onChange={(e) => setUserData({ ...userData, password: e.target.value })}
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

          <div className="form-group password-group">
            <label htmlFor="password_confirmation">Confirm Password</label>
            <div className="password-wrapper">
            <input
              id="password_confirmation"
              type={showConfirmPassword ? 'text' : 'password'}
              value={userData.password_confirmation}
              onChange={(e) => setUserData({ ...userData, password_confirmation: e.target.value })}
              required
            />
             <span
                className="toggle-password"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <i className={`fa-solid ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </span>
            </div>
            
          </div>

          {errors.message && <div className="error-message">{errors.message}</div>}

          <button type="submit" disabled={isLoading} className="btn btn-primary">
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
