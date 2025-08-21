import React from 'react';

const LoginPage = ({ 
  authMessage, 
  loginForm, 
  setLoginForm, 
  handleLoginSubmit, 
  setActiveTab 
}) => {
  return (
    <div className="auth-container">
      {authMessage && <div className="auth-message">{authMessage}</div>}
      <div className="auth-grid">
        <div className="auth-card">
          <h3>Login</h3>
          <form onSubmit={handleLoginSubmit}>
            <div className="form-group">
              <label>Username</label>
              <input 
                type="text" 
                className="form-control" 
                value={loginForm.username} 
                onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })} 
                required 
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input 
                type="password" 
                className="form-control" 
                value={loginForm.password} 
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })} 
                required 
              />
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
          </form>
          <p className="inline-text" style={{ marginTop: '0.75rem' }}>
            Don't have an account?{' '}
            <button className="link-button" onClick={() => setActiveTab('register')}>
              Register
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
