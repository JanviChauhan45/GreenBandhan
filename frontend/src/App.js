import React, { useState, useEffect } from 'react';
import './App.css';

// Import all components
import {
  Header,
  Footer,
  HomePage,
  DashboardPage,
  CampaignsPage,
  ReportPage,
  ParksPage,
  DonationsPage,
  LoginPage,
  RegisterPage
} from './components';

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
  const [registerForm, setRegisterForm] = useState({ 
    role: 'citizen', 
    firstName: '', 
    lastName: '', 
    email: '', 
    username: '', 
    password: '', 
    confirmPassword: '',
    phone: '',
    address: '',
    organizationName: '',
    registrationNumber: '',
    contactPerson: '',
    skills: '',
    availability: ''
  });

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

  const resetRegisterForm = () => {
    setRegisterForm({ 
      role: 'citizen', 
      firstName: '', 
      lastName: '', 
      email: '', 
      username: '', 
      password: '', 
      confirmPassword: '',
      phone: '',
      address: '',
      organizationName: '',
      registrationNumber: '',
      contactPerson: '',
      skills: '',
      availability: ''
    });
    setRegisterStep('chooseRole');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage stats={stats} recentReports={recentReports} setActiveTab={setActiveTab} />;
      case 'login':
        return (
          <LoginPage 
            authMessage={authMessage}
            loginForm={loginForm}
            setLoginForm={setLoginForm}
            handleLoginSubmit={handleLoginSubmit}
            setActiveTab={setActiveTab}
          />
        );
      case 'register':
        return (
          <RegisterPage 
            authMessage={authMessage}
            registerStep={registerStep}
            setRegisterStep={setRegisterStep}
            registerForm={registerForm}
            setRegisterForm={setRegisterForm}
            handleRegisterSubmit={handleRegisterSubmit}
            setActiveTab={setActiveTab}
            resetRegisterForm={resetRegisterForm}
          />
        );
      case 'dashboard':
        return <DashboardPage authUser={authUser} setActiveTab={setActiveTab} handleLogout={handleLogout} />;
      case 'campaigns':
        return <CampaignsPage />;
      case 'report':
        return <ReportPage />;
      case 'parks':
        return <ParksPage />;
      case 'donations':
        return <DonationsPage />;
      default:
        return <HomePage stats={stats} recentReports={recentReports} setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="App">
      <Header 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        authUser={authUser}
        handleLogout={handleLogout}
      />

      <main className="App-main">
        {renderContent()}
      </main>

      <Footer />
    </div>
  );
}

export default App;
