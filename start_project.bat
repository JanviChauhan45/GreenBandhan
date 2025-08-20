@echo off
echo Starting GreenBandhan Project...
echo.

echo Starting Django Backend...
cd backend
start "Django Backend" cmd /k "python manage.py runserver"

echo.
echo Starting React Frontend...
cd ../frontend
start "React Frontend" cmd /k "npm start"

echo.
echo Both servers are starting...
echo Django Backend: http://localhost:8000
echo React Frontend: http://localhost:3000
echo.
echo Press any key to exit this window...
pause >nul
