import React from 'react';

const DashboardPage = ({ authUser, setActiveTab, handleLogout }) => {
  if (!authUser) {
    return (
      <div className="report-content" style={{ textAlign: 'center' }}>
        <h2>Dashboard</h2>
        <p>Please login to view your dashboard.</p>
        <button className="btn btn-primary" onClick={() => setActiveTab('login')}>Go to Login</button>
      </div>
    );
  }

  const rolePretty = authUser.role.charAt(0).toUpperCase() + authUser.role.slice(1);
  
  return (
    <div className="report-content" style={{ textAlign: 'center' }}>
      <h2>Welcome to {rolePretty} Dashboard</h2>
      <p>Welcome, {authUser.username}. This is your {rolePretty} dashboard.</p>
      <div style={{ marginTop: '1rem' }}>
        <button className="btn btn-outline" onClick={() => setActiveTab('home')}>Back to Home</button>
        <span style={{ display: 'inline-block', width: 12 }} />
        <button className="btn btn-primary" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default DashboardPage;
