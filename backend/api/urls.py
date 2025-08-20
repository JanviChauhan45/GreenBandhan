from django.urls import path
from . import views

urlpatterns = [
    # Authentication
    path('auth/login/', views.user_login, name='user_login'),
    path('auth/register/', views.user_register, name='user_register'),
    path('auth/logout/', views.user_logout, name='user_logout'),
    
    # Main data endpoints
    path('home/', views.get_home_data, name='home_data'),
    path('waste-reports/', views.get_waste_reports, name='waste_reports'),
    path('waste-reports/create/', views.create_waste_report, name='create_waste_report'),
    path('campaigns/', views.get_campaigns, name='campaigns'),
    path('parks/', views.get_parks, name='parks'),
    path('donations/', views.get_donations, name='donations'),
]
