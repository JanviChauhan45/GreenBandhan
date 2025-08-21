import React from 'react';

const HomePage = ({ stats, recentReports, setActiveTab }) => {
  return (
    <div className="home-content">
      <div className="hero-section">
        <h1>Welcome to GreenBandhan</h1>
        <div className="hindi-quote">
          <p className="quote-text">"प्रकृति से जुड़ाव, कल के लिए संकल्प"</p>
          <p className="quote-translation">"Connection with Nature, Conservation of Environment"</p>
        </div>
        <p className="hero-description">Empowering communities to create a greener, cleaner world together</p>
        <div className="hero-buttons">
          <button className="btn btn-primary" onClick={() => setActiveTab('report')}>Report an Issue</button>
          <button className="btn btn-secondary" onClick={() => setActiveTab('campaigns')}>Join a Campaign</button>
          <button className="btn btn-outline" onClick={() => setActiveTab('register')}>Get Started</button>
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
};

export default HomePage;
