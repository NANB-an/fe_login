import React, { useState, useEffect } from 'react';
import { authAPI } from '../../services/api';
import Header from '../Layout/Header';
import UserCard from './UserCard';

const Home = () => {
  const [users, setUsers] = useState([]); // note plural
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchUser = async () => {
    setIsLoading(true);
    setError('');
    try {
      const response = await authAPI.getUser();
      // wrap single user object in an array
      setUsers([response.data]); 
    } catch (error) {
      setError('Failed to fetch users. Please try again.');
      console.error('Error fetching users:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="home-container">
      <Header />

      <main className="container main-content">
        <div className="users-section">
          <div className="section-header">
            <h2>User Directory</h2>
            <button 
              onClick={fetchUser} 
              disabled={isLoading} 
              className="btn btn-primary"
            >
              {isLoading ? 'Loading...' : 'Refresh Users'}
            </button>
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="users-grid">
            {users.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>

          {users.length === 0 && !isLoading && (
            <div className="empty-state">
              <p>No users found.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
