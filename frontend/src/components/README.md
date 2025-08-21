# GreenBandhan Frontend Components

This directory contains all the React components organized in a clean, maintainable structure.

## 📁 Directory Structure

```
components/
├── layout/           # Layout components (Header, Footer)
├── pages/           # Page-level components
├── auth/            # Authentication components
└── index.js         # Central export file
```

## 🏗️ Layout Components

### Header (`layout/Header.js`)
- **Purpose**: Main navigation header with logo, tabs, and auth buttons
- **Props**: 
  - `activeTab`: Current active tab
  - `setActiveTab`: Function to change active tab
  - `authUser`: Current authenticated user
  - `handleLogout`: Logout function
- **Features**: Responsive navigation, auth state display

### Footer (`layout/Footer.js`)
- **Purpose**: Site footer with links and company info
- **Props**: None (static content)
- **Features**: Quick links, social media, copyright

## 📄 Page Components

### HomePage (`pages/HomePage.js`)
- **Purpose**: Landing page with hero section, stats, and recent activity
- **Props**:
  - `stats`: Statistics data (reports, campaigns, parks, donations)
  - `recentReports`: Array of recent waste reports
  - `setActiveTab`: Function to navigate to other pages
- **Features**: Hero section, impact statistics, recent activity feed

### DashboardPage (`pages/DashboardPage.js`)
- **Purpose**: User dashboard after authentication
- **Props**:
  - `authUser`: Current authenticated user
  - `setActiveTab`: Navigation function
  - `handleLogout`: Logout function
- **Features**: Role-based welcome message, navigation options

### CampaignsPage (`pages/CampaignsPage.js`)
- **Purpose**: Environmental campaigns display
- **Props**: None (static content)
- **Features**: Campaign cards with join buttons

### ReportPage (`pages/ReportPage.js`)
- **Purpose**: Environmental issue reporting form
- **Props**: None (form handles its own state)
- **Features**: Issue type selection, description, location input

### ParksPage (`pages/ParksPage.js`)
- **Purpose**: Oxygen park directory
- **Props**: None (static content)
- **Features**: Park cards with oxygen ratings and features

### DonationsPage (`pages/DonationsPage.js`)
- **Purpose**: Item donation interface
- **Props**: None (static content)
- **Features**: Donation type cards, pickup scheduling

## 🔐 Authentication Components

### LoginPage (`auth/LoginPage.js`)
- **Purpose**: User login form
- **Props**:
  - `authMessage`: Authentication status message
  - `loginForm`: Login form state
  - `setLoginForm`: Form state setter
  - `handleLoginSubmit`: Login submission handler
  - `setActiveTab`: Navigation to register page
- **Features**: Username/password form, link to registration

### RegisterPage (`auth/RegisterPage.js`)
- **Purpose**: User registration with role selection
- **Props**:
  - `authMessage`: Authentication status message
  - `registerStep`: Current registration step ('chooseRole' or 'form')
  - `registerForm`: Registration form state
  - `setRegisterForm`: Form state setter
  - `handleRegisterSubmit`: Registration submission handler
  - `setActiveTab`: Navigation to login page
- **Features**: Role selection, multi-step form, link to login

## 🔧 Usage

### Importing Components
```javascript
// Import individual components
import { Header, Footer, HomePage } from './components';

// Or import specific components
import Header from './components/layout/Header';
```

### Component Props
All components receive their required props from the main `App.js` component, which manages the global state and passes down necessary data and functions.

### State Management
- **Global State**: Managed in `App.js` (auth, navigation, data)
- **Local State**: Each component manages its own internal state when needed
- **Props**: Data flows down from parent to child components

## 🎨 Styling
All components use the existing CSS classes defined in `App.css`. The component structure maintains the same visual appearance while improving code organization.

## 📱 Responsiveness
All components inherit responsive design from the existing CSS media queries and maintain mobile-first approach.

## 🚀 Benefits of This Structure

1. **Maintainability**: Each component has a single responsibility
2. **Reusability**: Components can be easily reused across the app
3. **Testing**: Individual components can be tested in isolation
4. **Scalability**: Easy to add new features and components
5. **Readability**: Clear separation of concerns and easy navigation
6. **Collaboration**: Multiple developers can work on different components simultaneously
