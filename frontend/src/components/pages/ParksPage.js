import React from 'react';

const ParksPage = () => {
  return (
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
};

export default ParksPage;
