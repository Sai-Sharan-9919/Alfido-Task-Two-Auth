import React from 'react';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const currentPath = window.location.pathname;

  const handleLogout = () => {
    localStorage.removeItem('user_logged_in');
    window.location.href = '/login';
  };

  if (currentPath === '/login' || currentPath === '/') {
    return <Login />;
  }

  if (currentPath === '/dashboard') {
    return (
      <ProtectedRoute>
        <div style={{ maxWidth: '800px', margin: '50px auto', padding: '30px', fontFamily: 'sans-serif' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #eee', paddingBottom: '15px' }}>
            <h2>🔐 Secure Workspace Dashboard</h2>
            <button onClick={handleLogout} style={{ padding: '8px 16px', background: '#dc3545', border: 'none', borderRadius: '4px', cursor: 'pointer', color: '#fff' }}>
              Log Out
            </button>
          </div>
          <div style={{ marginTop: '30px', padding: '20px', background: '#f8f9fa', borderRadius: '6px', borderLeft: '4px solid #28a745' }}>
            <h4>Authenticated Content Loaded via JWT Cookie verification:</h4>
            <p style={{ fontFamily: 'monospace', color: '#333', background: '#fff', padding: '15px', border: '1px solid #ddd' }}>
              Project Financial Metrics: Alpha=$45k, Beta=$120k
            </p>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <div style={{ textAlign: 'center', padding: '50px', fontFamily: 'sans-serif' }}>
      <h2>404 - Page Not Found</h2>
      <a href="/login">Go to Login</a>
    </div>
  );
}

export default App;