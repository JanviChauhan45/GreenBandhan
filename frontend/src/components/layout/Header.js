import React from 'react';

const Header = ({ 
  activeTab, 
  setActiveTab, 
  authUser, 
  handleLogout 
}) => {
  return (
    <header className="App-header">
      <div className="logo">
        <span className="logo-icon">🌍</span>
        <span className="logo-text">GreenBandhan</span>
      </div>
      
      <nav className="nav-tabs">
        <button 
          className={`nav-tab ${activeTab === 'home' ? 'active' : ''}`}
          onClick={() => setActiveTab('home')}
        >
          Home
        </button>
        <button 
          className={`nav-tab ${activeTab === 'campaigns' ? 'active' : ''}`}
          onClick={() => setActiveTab('campaigns')}
        >
          Campaigns
        </button>
        <button 
          className={`nav-tab ${activeTab === 'report' ? 'active' : ''}`}
          onClick={() => setActiveTab('report')}
        >
          Report Issue
        </button>
        <button 
          className={`nav-tab ${activeTab === 'parks' ? 'active' : ''}`}
          onClick={() => setActiveTab('parks')}
        >
          Parks
        </button>
        <button 
          className={`nav-tab ${activeTab === 'donations' ? 'active' : ''}`}
          onClick={() => setActiveTab('donations')}
        >
          Donate
        </button>
        <button 
          className={`nav-tab ${activeTab === 'login' ? 'active' : ''}`}
          onClick={() => setActiveTab('login')}
        >
          Login
        </button>
        <button 
          className={`nav-tab ${activeTab === 'register' ? 'active' : ''}`}
          onClick={() => setActiveTab('register')}
        >
          Register
        </button>
      </nav>
      
      <div className="auth-buttons">
        {authUser ? (
          <>
            <span style={{ marginRight: 8 }}>Hi, {authUser.username}</span>
            <button className="btn btn-outline" onClick={() => setActiveTab('dashboard')}>Dashboard</button>
            <button className="btn btn-primary" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <button className="btn btn-outline" onClick={() => setActiveTab('login')}>Login</button>
            <button className="btn btn-primary" onClick={() => setActiveTab('register')}>Sign Up</button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
