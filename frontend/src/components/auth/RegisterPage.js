import React, { useState } from 'react';

const RegisterPage = ({ 
  authMessage, 
  registerStep, 
  setRegisterStep,
  registerForm, 
  setRegisterForm, 
  handleRegisterSubmit, 
  setActiveTab 
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!registerForm.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (registerForm.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }
    
    if (!registerForm.password) {
      newErrors.password = 'Password is required';
    } else if (registerForm.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (registerForm.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registerForm.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRoleSelect = (role) => {
    setRegisterForm({ ...registerForm, role });
    setRegisterStep('form');
    setErrors({});
  };

  const handleInputChange = (field, value) => {
    setRegisterForm({ ...registerForm, [field]: value });
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({});
    
    try {
      await handleRegisterSubmit(e);
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const goBackToRoleSelection = () => {
    setRegisterStep('chooseRole');
    setErrors({});
  };

  return (
    <div className="auth-container">
      {authMessage && (
        <div className={`auth-message ${authMessage.includes('successful') ? 'success' : 'error'}`}>
          {authMessage}
        </div>
      )}
      
      <div className="auth-grid">
        <div className="auth-card">
          <h3>Create Your Account</h3>
          
          {registerStep === 'chooseRole' ? (
            <div className="role-selection">
              <p className="inline-text">Choose your role to continue:</p>
              <div className="role-grid">
                {[
                  { key: 'citizen', label: 'Citizen', icon: '👤', desc: 'Report issues, join campaigns' },
                  { key: 'ngo', label: 'NGO', icon: '🏢', desc: 'Manage campaigns, coordinate volunteers' },
                  { key: 'volunteer', label: 'Volunteer', icon: '🤝', desc: 'Participate in cleanup drives' },
                  { key: 'recycler', label: 'Recycler', icon: '♻️', desc: 'Process waste, create value' }
                ].map(role => (
                  <button 
                    key={role.key} 
                    className={`role-pill ${registerForm.role === role.key ? 'selected' : ''}`} 
                    onClick={() => handleRoleSelect(role.key)}
                  >
                    <div className="role-icon">{role.icon}</div>
                    <div className="role-info">
                      <div className="role-label">{role.label}</div>
                      <div className="role-desc">{role.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="registration-form">
              <div className="form-group">
                <label>Role</label>
                <div className="role-inline">
                  <span className="role-chip">
                    {registerForm.role.charAt(0).toUpperCase() + registerForm.role.slice(1)}
                  </span>
                  <button 
                    type="button" 
                    className="btn btn-outline" 
                    onClick={goBackToRoleSelection}
                  >
                    Change
                  </button>
                </div>
              </div>
              
              <div className="form-group">
                <label>Username *</label>
                <input 
                  type="text" 
                  className={`form-control ${errors.username ? 'error' : ''}`}
                  value={registerForm.username} 
                  onChange={(e) => handleInputChange('username', e.target.value)}
                  placeholder="Choose a unique username"
                  required 
                />
                {errors.username && <span className="error-text">{errors.username}</span>}
              </div>
              
              <div className="form-group">
                <label>Email</label>
                <input 
                  type="email" 
                  className={`form-control ${errors.email ? 'error' : ''}`}
                  value={registerForm.email} 
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="your.email@example.com"
                />
                {errors.email && <span className="error-text">{errors.email}</span>}
              </div>
              
              <div className="form-group">
                <label>Password *</label>
                <input 
                  type="password" 
                  className={`form-control ${errors.password ? 'error' : ''}`}
                  value={registerForm.password} 
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  placeholder="Minimum 6 characters"
                  required 
                />
                {errors.password && <span className="error-text">{errors.password}</span>}
              </div>
              
              <button 
                type="submit" 
                className="btn btn-secondary" 
                disabled={isLoading}
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>
          )}
          
          <p className="inline-text" style={{ marginTop: '0.75rem' }}>
            Already have an account?{' '}
            <button className="link-button" onClick={() => setActiveTab('login')}>
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
