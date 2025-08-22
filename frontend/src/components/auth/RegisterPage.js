import React, { useState } from 'react';

const RegisterPage = ({ 
  authMessage, 
  registerStep, 
  setRegisterStep,
  registerForm, 
  setRegisterForm, 
  handleRegisterSubmit, 
  setActiveTab,
  resetRegisterForm
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    // Common field validations
    if (!registerForm.firstName?.trim()) {
      newErrors.firstName = 'First Name is required';
    }
    
    if (!registerForm.lastName?.trim()) {
      newErrors.lastName = 'Last Name is required';
    }
    
    if (!registerForm.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registerForm.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!registerForm.username?.trim()) {
      newErrors.username = 'Username is required';
    } else if (registerForm.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }
    
    if (!registerForm.password) {
      newErrors.password = 'Password is required';
    } else if (registerForm.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!registerForm.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (registerForm.password !== registerForm.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Role-specific validations
    if (registerForm.role === 'citizen') {
      if (!registerForm.phone?.trim()) {
        newErrors.phone = 'Phone number is required';
      }
      if (!registerForm.address?.trim()) {
        newErrors.address = 'Address is required';
      }
    }

    if (registerForm.role === 'ngo') {
      if (!registerForm.organizationName?.trim()) {
        newErrors.organizationName = 'Organization name is required';
      }
      if (!registerForm.registrationNumber?.trim()) {
        newErrors.registrationNumber = 'Registration number is required';
      }
      if (!registerForm.contactPerson?.trim()) {
        newErrors.contactPerson = 'Contact person is required';
      }
    }

    if (registerForm.role === 'volunteer') {
      if (!registerForm.skills?.trim()) {
        newErrors.skills = 'Skills are required';
      }
      if (!registerForm.availability?.trim()) {
        newErrors.availability = 'Availability is required';
      }
    }

    if (registerForm.role === 'recycler') {
      if (!registerForm.phone?.trim()) {
        newErrors.phone = 'Phone number is required';
      }
      if (!registerForm.address?.trim()) {
        newErrors.address = 'Address is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRoleSelect = (role) => {
    resetRegisterForm();
    setRegisterForm(prev => ({ ...prev, role }));
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
    resetRegisterForm();
    setErrors({});
  };

  const renderRoleSpecificFields = () => {
    switch (registerForm.role) {
      case 'citizen':
        return (
          <>
            <div className="form-group">
              <label>Phone Number *</label>
              <input 
                type="tel" 
                className={`form-control ${errors.phone ? 'error' : ''}`}
                value={registerForm.phone || ''} 
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="Enter your phone number"
                required 
              />
              {errors.phone && <span className="error-text">{errors.phone}</span>}
            </div>
            
            <div className="form-group">
              <label>Address *</label>
              <textarea 
                className={`form-control ${errors.address ? 'error' : ''}`}
                value={registerForm.address || ''} 
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="Enter your full address"
                rows="3"
                required 
              />
              {errors.address && <span className="error-text">{errors.address}</span>}
            </div>
          </>
        );

      case 'ngo':
        return (
          <>
            <div className="form-group">
              <label>Organization Name *</label>
              <input 
                type="text" 
                className={`form-control ${errors.organizationName ? 'error' : ''}`}
                value={registerForm.organizationName || ''} 
                onChange={(e) => handleInputChange('organizationName', e.target.value)}
                placeholder="Enter organization name"
                required 
              />
              {errors.organizationName && <span className="error-text">{errors.organizationName}</span>}
            </div>
            
            <div className="form-group">
              <label>Registration Number *</label>
              <input 
                type="text" 
                className={`form-control ${errors.registrationNumber ? 'error' : ''}`}
                value={registerForm.registrationNumber || ''} 
                onChange={(e) => handleInputChange('registrationNumber', e.target.value)}
                placeholder="Enter registration number"
                required 
              />
              {errors.registrationNumber && <span className="error-text">{errors.registrationNumber}</span>}
            </div>
            
            <div className="form-group">
              <label>Contact Person *</label>
              <input 
                type="text" 
                className={`form-control ${errors.contactPerson ? 'error' : ''}`}
                value={registerForm.contactPerson || ''} 
                onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                placeholder="Enter contact person name"
                required 
              />
              {errors.contactPerson && <span className="error-text">{errors.contactPerson}</span>}
            </div>
          </>
        );

      case 'volunteer':
        return (
          <>
            <div className="form-group">
              <label>Skills *</label>
              <textarea 
                className={`form-control ${errors.skills ? 'error' : ''}`}
                value={registerForm.skills || ''} 
                onChange={(e) => handleInputChange('skills', e.target.value)}
                placeholder="Describe your skills (e.g., Event management, Communication, Technical skills)"
                rows="3"
                required 
              />
              {errors.skills && <span className="error-text">{errors.skills}</span>}
            </div>
            
            <div className="form-group">
              <label>Availability *</label>
              <textarea 
                className={`form-control ${errors.availability ? 'error' : ''}`}
                value={registerForm.availability || ''} 
                onChange={(e) => handleInputChange('availability', e.target.value)}
                placeholder="Describe your availability (e.g., Weekends, Evenings, Flexible)"
                rows="3"
                required 
              />
              {errors.availability && <span className="error-text">{errors.availability}</span>}
            </div>
          </>
        );

      case 'recycler':
        return (
          <>
            <div className="form-group">
              <label>Phone Number *</label>
              <input 
                type="tel" 
                className={`form-control ${errors.phone ? 'error' : ''}`}
                value={registerForm.phone || ''} 
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="Enter your phone number"
                required 
              />
              {errors.phone && <span className="error-text">{errors.phone}</span>}
            </div>
            
            <div className="form-group">
              <label>Address *</label>
              <textarea 
                className={`form-control ${errors.address ? 'error' : ''}`}
                value={registerForm.address || ''} 
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="Enter your business address"
                rows="3"
                required 
              />
              {errors.address && <span className="error-text">{errors.address}</span>}
            </div>
          </>
        );

      default:
        return null;
    }
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
              
              <div className="form-row">
                <div className="form-group">
                  <label>First Name *</label>
                  <input 
                    type="text" 
                    className={`form-control ${errors.firstName ? 'error' : ''}`}
                    value={registerForm.firstName || ''} 
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    placeholder="Enter first name"
                    required 
                  />
                  {errors.firstName && <span className="error-text">{errors.firstName}</span>}
                </div>
                
                <div className="form-group">
                  <label>Last Name *</label>
                  <input 
                    type="text" 
                    className={`form-control ${errors.lastName ? 'error' : ''}`}
                    value={registerForm.lastName || ''} 
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    placeholder="Enter last name"
                    required 
                  />
                  {errors.lastName && <span className="error-text">{errors.lastName}</span>}
                </div>
              </div>
              
              <div className="form-group">
                <label>Email *</label>
                <input 
                  type="email" 
                  className={`form-control ${errors.email ? 'error' : ''}`}
                  value={registerForm.email || ''} 
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="your.email@example.com"
                  required 
                />
                {errors.email && <span className="error-text">{errors.email}</span>}
              </div>
              
              <div className="form-group">
                <label>Username *</label>
                <input 
                  type="text" 
                  className={`form-control ${errors.username ? 'error' : ''}`}
                  value={registerForm.username || ''} 
                  onChange={(e) => handleInputChange('username', e.target.value)}
                  placeholder="Choose a unique username"
                  required 
                />
                {errors.username && <span className="error-text">{errors.username}</span>}
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Password *</label>
                  <input 
                    type="password" 
                    className={`form-control ${errors.password ? 'error' : ''}`}
                    value={registerForm.password || ''} 
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    placeholder="Minimum 6 characters"
                    required 
                  />
                  {errors.password && <span className="error-text">{errors.password}</span>}
                </div>
                
                <div className="form-group">
                  <label>Confirm Password *</label>
                  <input 
                    type="password" 
                    className={`form-control ${errors.confirmPassword ? 'error' : ''}`}
                    value={registerForm.confirmPassword || ''} 
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    placeholder="Confirm your password"
                    required 
                  />
                  {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
                </div>
              </div>
              
              {/* Role-specific fields */}
              {renderRoleSpecificFields()}
              
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
