import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [stats, setStats] = useState({
    total_reports: 0,
    active_campaigns: 0,
    total_parks: 0,
    total_donations: 0
  });
  const [recentReports, setRecentReports] = useState([]);
  const [activeTab, setActiveTab] = useState('home');

  // Auth state
  const [authUser, setAuthUser] = useState(null); // {id, username, role}
  const [authMessage, setAuthMessage] = useState('');
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [registerStep, setRegisterStep] = useState('chooseRole'); // 'chooseRole' | 'form'
  const [registerForm, setRegisterForm] = useState({ role: 'citizen', username: '', email: '', password: '' });

  useEffect(() => {
    // Fetch home data when component mounts
    fetchHomeData();
  }, []);

  const fetchHomeData = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/home/');
      const data = await response.json();
      if (data.success) {
        setStats(data.stats);
        setRecentReports(data.recent_reports);
      }
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setAuthMessage('');
    try {
      const res = await fetch('http://localhost:8000/api/auth/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginForm)
      });
      const data = await res.json();
      if (data.success) {
        const role = data.user?.role || 'citizen';
        setAuthUser({ id: data.user.id, username: data.user.username, role });
        setAuthMessage('Login successful.');
        setActiveTab('dashboard');
      } else {
        setAuthMessage(data.message || 'Login failed');
      }
    } catch (err) {
      setAuthMessage('Login failed. Please try again.');
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setAuthMessage('');
    try {
      const res = await fetch('http://localhost:8000/api/auth/register/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registerForm)
      });
      const data = await res.json();
      if (data.success) {
        const role = data.user?.role || registerForm.role;
        setAuthUser({ id: data.user.id, username: data.user.username, role });
        setAuthMessage('Registration successful.');
        setActiveTab('dashboard');
      } else {
        setAuthMessage(data.message || 'Registration failed');
      }
    } catch (err) {
      setAuthMessage('Registration failed. Please try again.');
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:8000/api/auth/logout/');
    } catch {}
    setAuthUser(null);
    setAuthMessage('You have been logged out.');
    setActiveTab('home');
  };

  const renderHomeTab = () => (
    <div className="home-content">
      <div className="hero-section">
        <h1>Welcome to GreenBandhan</h1>
        <div className="hindi-quote">
          <p className="quote-text">"प्रकृति से जुड़ाव, पर्यावरण का संरक्षण"</p>
          <p className="quote-translation">"Connection with Nature, Conservation of Environment"</p>
        </div>
        <p className="hero-description">Empowering communities to create a greener, cleaner world together</p>
        <div className="hero-buttons">
          <button className="btn btn-primary" onClick={() => setActiveTab('report')}>Report an Issue</button>
          <button className="btn btn-secondary" onClick={() => setActiveTab('campaigns')}>Join a Campaign</button>
        </div>
      </div>

      <div className="stats-section">
        <h2>Our Impact</h2>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">{stats.total_reports}</div>
            <div className="stat-label">Issues Reported</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{stats.active_campaigns}</div>
            <div className="stat-label">Active Campaigns</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{stats.total_parks}</div>
            <div className="stat-label">Green Spaces</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{stats.total_donations}</div>
            <div className="stat-label">Donations</div>
          </div>
        </div>
      </div>

      <div className="recent-activity">
        <h2>Recent Activity</h2>
        <div className="activity-list">
          {recentReports.map((report, index) => (
            <div key={index} className="activity-item">
              <div className="activity-icon">🚨</div>
              <div className="activity-content">
                <div className="activity-title">{report.title}</div>
                <div className="activity-status">Status: {report.status}</div>
                <div className="activity-date">{report.created_at}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAuthTab = () => (
    <div className="auth-container">
      {authMessage && <div className="auth-message">{authMessage}</div>}

      <div className="auth-grid">
        <div className="auth-card">
          <h3>Login</h3>
          <form onSubmit={handleLoginSubmit}>
            <div className="form-group">
              <label>Username</label>
              <input type="text" className="form-control" value={loginForm.username} onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" className="form-control" value={loginForm.password} onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })} required />
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
          </form>
        </div>

        <div className="auth-card">
          <h3>Register</h3>

          {registerStep === 'chooseRole' ? (
            <div>
              <p className="inline-text">Choose your role to continue:</p>
              <div className="role-grid">
                {['citizen','ngo','volunteer','recycler'].map(r => (
                  <button key={r} className={`role-pill ${registerForm.role === r ? 'selected' : ''}`} onClick={() => { setRegisterForm({ ...registerForm, role: r }); setRegisterStep('form'); }}>
                    {r.charAt(0).toUpperCase() + r.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <form onSubmit={handleRegisterSubmit}>
              <div className="form-group">
                <label>Role</label>
                <div className="role-inline">
                  <span className="role-chip">{registerForm.role.charAt(0).toUpperCase() + registerForm.role.slice(1)}</span>
                  <button type="button" className="btn btn-outline" onClick={() => setRegisterStep('chooseRole')}>Change</button>
                </div>
              </div>
              <div className="form-group">
                <label>Username</label>
                <input type="text" className="form-control" value={registerForm.username} onChange={(e) => setRegisterForm({ ...registerForm, username: e.target.value })} required />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" className="form-control" value={registerForm.email} onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" value={registerForm.password} onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })} required />
              </div>
              <button type="submit" className="btn btn-secondary">Create Account</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );

  const renderDashboardTab = () => {
    if (!authUser) {
      return (
        <div className="report-content" style={{ textAlign: 'center' }}>
          <h2>Dashboard</h2>
          <p>Please login to view your dashboard.</p>
          <button className="btn btn-primary" onClick={() => setActiveTab('auth')}>Go to Login</button>
        </div>
      );
    }
    const rolePretty = authUser.role.charAt(0).toUpperCase() + authUser.role.slice(1);
    return (
      <div className="report-content" style={{ textAlign: 'center' }}>
        <h2>To {rolePretty} Dashboard</h2>
        <p>Welcome, {authUser.username}. This is a placeholder. Your {rolePretty} dashboard will appear here.</p>
        <div style={{ marginTop: '1rem' }}>
          <button className="btn btn-outline" onClick={() => setActiveTab('home')}>Back to Home</button>
          <span style={{ display: 'inline-block', width: 12 }} />
          <button className="btn btn-primary" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    );
  };

  const renderCampaignsTab = () => (
    <div className="campaigns-content">
      <h2>Environmental Campaigns</h2>
      <p>Join hands with NGOs and volunteers to make a difference</p>
      <div className="campaign-grid">
        <div className="campaign-card">
          <div className="campaign-image">🌱</div>
          <h3>Tree Plantation Drive</h3>
          <p>Help us plant 1000 trees in the city park</p>
          <button className="btn btn-primary">Join Now</button>
        </div>
        <div className="campaign-card">
          <div className="campaign-image">♻️</div>
          <h3>Plastic Cleanup</h3>
          <p>Clean up plastic waste from the river banks</p>
          <button className="btn btn-primary">Join Now</button>
        </div>
        <div className="campaign-card">
          <div className="campaign-image">💧</div>
          <h3>Water Conservation</h3>
          <p>Learn and implement water saving techniques</p>
          <button className="btn btn-primary">Join Now</button>
        </div>
      </div>
    </div>
  );

  const renderReportTab = () => (
    <div className="report-content">
      <h2>Report an Environmental Issue</h2>
      <p>Help us identify and resolve environmental problems in your area</p>
      
      <form className="report-form">
        <div className="form-group">
          <label>Issue Type</label>
          <select className="form-control">
            <option value="garbage">Garbage</option>
            <option value="recycling">Recycling</option>
            <option value="water">Water Issue</option>
            <option value="other">Other</option>
          </select>
        </div>
        
        <div className="form-group">
          <label>Title</label>
          <input type="text" className="form-control" placeholder="Brief description of the issue" />
        </div>
        
        <div className="form-group">
          <label>Description</label>
          <textarea className="form-control" rows="4" placeholder="Detailed description of the problem"></textarea>
        </div>
        
        <div className="form-group">
          <label>Location</label>
          <input type="text" className="form-control" placeholder="Address or location details" />
        </div>
        
        <button type="submit" className="btn btn-primary">Submit Report</button>
      </form>
    </div>
  );

  const renderParksTab = () => (
    <div className="parks-content">
      <h2>Oxygen Park Directory</h2>
      <p>Discover green spaces in your city and their oxygen ratings</p>
      
      <div className="parks-grid">
        <div className="park-card">
          <div className="park-rating">Oxygen: 9/10</div>
          <h3>Central Park</h3>
          <p>Beautiful central park with walking trails and benches</p>
          <div className="park-features">
            <span>Walking Trails</span>
            <span>Benches</span>
            <span>Playground</span>
          </div>
        </div>
        
        <div className="park-card">
          <div className="park-rating">Oxygen: 8/10</div>
          <h3>Riverside Garden</h3>
          <p>Peaceful garden along the river with meditation spots</p>
          <div className="park-features">
            <span>Meditation</span>
            <span>River View</span>
            <span>Flowers</span>
          </div>
        </div>
        
        <div className="park-card">
          <div className="park-rating">Oxygen: 7/10</div>
          <h3>Community Forest</h3>
          <p>Community-maintained forest with native trees</p>
          <div className="park-features">
            <span>Native Trees</span>
            <span>Bird Watching</span>
            <span>Picnic Area</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDonationsTab = () => (
    <div className="donations-content">
      <h2>Donate Items</h2>
      <p>Give your unused items a second life and help those in need</p>
      
      <div className="donation-types">
        <div className="donation-type">
          <div className="type-icon">👕</div>
          <h3>Clothing</h3>
          <p>Donate clothes, shoes, and accessories</p>
        </div>
        
        <div className="donation-type">
          <div className="type-icon">📚</div>
          <h3>Books</h3>
          <p>Share knowledge through book donations</p>
        </div>
        
        <div className="donation-type">
          <div className="type-icon">💻</div>
          <h3>Electronics</h3>
          <p>Donate working electronics and gadgets</p>
        </div>
        
        <div className="donation-type">
          <div className="type-icon">🪑</div>
          <h3>Furniture</h3>
          <p>Give furniture a new home</p>
        </div>
      </div>
      
      <button className="btn btn-primary">Schedule Pickup</button>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return renderHomeTab();
      case 'auth':
        return renderAuthTab();
      case 'dashboard':
        return renderDashboardTab();
      case 'campaigns':
        return renderCampaignsTab();
      case 'report':
        return renderReportTab();
      case 'parks':
        return renderParksTab();
      case 'donations':
        return renderDonationsTab();
      default:
        return renderHomeTab();
    }
  };

  return (
    <div className="App">
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
            className={`nav-tab ${activeTab === 'auth' ? 'active' : ''}`}
            onClick={() => setActiveTab('auth')}
          >
            Login/Register
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
              <button className="btn btn-outline" onClick={() => setActiveTab('auth')}>Login</button>
              <button className="btn btn-primary" onClick={() => setActiveTab('auth')}>Sign Up</button>
            </>
          )}
        </div>
      </header>

      <main className="App-main">
        {renderContent()}
      </main>

      <footer className="App-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>GreenBandhan</h4>
            <p>Empowering communities for a sustainable future</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li>About Us</li>
              <li>Contact</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Connect</h4>
            <ul>
              <li>Facebook</li>
              <li>Twitter</li>
              <li>Instagram</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 GreenBandhan. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
