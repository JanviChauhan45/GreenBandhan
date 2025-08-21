import React from 'react';

const Footer = () => {
  return (
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
  );
};

export default Footer;
