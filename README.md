# GreenBandhan - Environmental Management Platform

A full-stack NGO-based environmental management platform built with Django and React, designed to enable citizens, NGOs, volunteers, and city administrators to collaboratively manage environmental initiatives.

## 🌍 Features

- **Campaign Management** - NGOs can create and manage environmental campaigns
- **Issue Reporting** - Citizens can report environmental problems
- **Volunteer Coordination** - Manage volunteer participation in campaigns
- **Donation Management** - Handle item and monetary donations
- **Oxygen Park Directory** - Green space directory with oxygen ratings
- **Impact Dashboard** - Track environmental impact and progress
- **Leaderboard System** - Gamified participation tracking

## 🚀 Quick Start

### Prerequisites

- Python 3.8+
- Node.js 16+
- npm or yarn

### Backend Setup (Django)

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Create virtual environment:**
   ```bash
   python -m venv venv
   
   # On Windows
   venv\Scripts\activate
   
   # On macOS/Linux
   source venv/bin/activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run migrations:**
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

5. **Create superuser (optional):**
   ```bash
   python manage.py createsuperuser
   ```

6. **Start Django server:**
   ```bash
   python manage.py runserver
   ```

The Django backend will be running at `http://localhost:8000`

### Frontend Setup (React)

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start React development server:**
   ```bash
   npm start
   ```

The React frontend will be running at `http://localhost:3000`

## 📁 Project Structure

```
greenbandhan/
├── backend/                 # Django backend
│   ├── api/                # Main API app
│   │   ├── models.py       # Database models
│   │   ├── views.py        # API views
│   │   ├── urls.py         # URL routing
│   │   └── admin.py        # Django admin
│   ├── backend/            # Django project settings
│   ├── manage.py           # Django management script
│   └── requirements.txt    # Python dependencies
├── frontend/               # React frontend
│   ├── src/
│   │   ├── App.js          # Main React component
│   │   ├── App.css         # Styling
│   │   └── index.js        # React entry point
│   ├── package.json        # Node.js dependencies
│   └── public/             # Static files
└── README.md               # This file
```

## 🗄️ Database Models

### Core Models

- **User** - Extended user model with roles (citizen, NGO, admin, volunteer, recycler)
- **WasteReport** - Environmental issue reports with location and status tracking
- **Campaign** - NGO-managed environmental campaigns
- **VolunteerParticipation** - Volunteer participation tracking
- **Park** - Green space directory with oxygen ratings
- **Donation** - Item donation management
- **ImpactScore** - User impact tracking for leaderboards

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/login/` - User login
- `POST /api/auth/register/` - User registration
- `GET /api/auth/logout/` - User logout

### Main Data
- `GET /api/home/` - Home page data and statistics
- `GET /api/waste-reports/` - Get all waste reports
- `POST /api/waste-reports/create/` - Create new waste report
- `GET /api/campaigns/` - Get active campaigns
- `GET /api/parks/` - Get parks directory
- `GET /api/donations/` - Get donations

## 🎨 Frontend Features

- **Responsive Design** - Mobile-first approach
- **Tab Navigation** - Easy switching between features
- **Modern UI** - Clean, green-themed interface
- **Interactive Elements** - Hover effects and animations
- **Form Handling** - Issue reporting and user input
- **Hindi Quote** - Beautiful Sanskrit-inspired tagline

## 🔧 Development

### Adding New Features

1. **Backend**: Add models in `api/models.py`, views in `api/views.py`
2. **Frontend**: Add new components and update `App.js`
3. **Styling**: Update `App.css` for new components

### Database Changes

After modifying models:
```bash
cd backend
python manage.py makemigrations
python manage.py migrate
```

## 🌱 Environmental Impact

GreenBandhan helps communities:
- Report and resolve environmental issues
- Participate in conservation campaigns
- Track and improve local green spaces
- Manage sustainable donations
- Build environmental awareness

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

---

**Made with ❤️ for a greener planet**
