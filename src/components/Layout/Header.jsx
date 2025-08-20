import React from 'react';
import { useAuth } from '../../contexts/AuthContext';


const Header = () => {
  const { user,  setUser } = useAuth();
  const { logout } = useAuth();

  const handleLogout = async () => {
  try {
    await logout(); 
  } catch (err) {
    console.error("Logout error:", err);
  } finally {
    setUser(null); 
  }
};

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <h1>Welcome, {user?.name}!</h1>
          <button onClick={handleLogout} className="btn btn-secondary">
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
