import React from 'react';

const CampaignsPage = () => {
  return (
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
};

export default CampaignsPage;
