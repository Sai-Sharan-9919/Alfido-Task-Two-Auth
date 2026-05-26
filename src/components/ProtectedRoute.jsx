import React from 'react';

// This wrapper checks if the user is authorized. 
// If they are not, it shows an access denied message instead of the secret page content.
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('user_logged_in') === 'true';

  if (!isAuthenticated) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', fontFamily: 'sans-serif' }}>
        <h2 style={{ color: '#dc3545' }}>⚠️ Access Denied</h2>
        <p>You must log in to view this workspace panel dashboard.</p>
        <a href="/login" style={{ color: '#007bff', textDecoration: 'none', fontWeight: 'bold' }}>Go to Login Page</a>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;