import React from 'react';

const UserCard = ({ user }) => {
  return (
    <div className="user-card">
      <div className="user-avatar">
        {user.name.charAt(0).toUpperCase()}
      </div>
      <div className="user-info">
        <h3>{user.name}</h3>
        <p>{user.email}</p>
        <p className="user-meta">
          Joined: {new Date(user.created_at).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default UserCard;