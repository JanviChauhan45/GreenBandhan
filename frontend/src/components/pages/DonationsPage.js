import React from 'react';

const DonationsPage = () => {
  return (
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
};

export default DonationsPage;
