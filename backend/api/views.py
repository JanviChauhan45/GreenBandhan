from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login, logout, get_user_model
from django.views.decorators.http import require_http_methods
import json
from .models import (
    WasteReport, Campaign, Park, Donation, 
    VolunteerParticipation, ParkFeedback, ImpactScore
)

User = get_user_model()

# Simple authentication views
@csrf_exempt
@require_http_methods(["POST"])
def user_login(request):
    """Simple login view"""
    try:
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
        
        user = authenticate(username=username, password=password)
        if user:
            login(request, user)
            return JsonResponse({
                'success': True,
                'message': 'Login successful',
                'user': {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email,
                    'role': getattr(user, 'role', 'citizen')
                }
            })
        else:
            return JsonResponse({
                'success': False,
                'message': 'Invalid credentials'
            }, status=400)
    except Exception as e:
        return JsonResponse({
            'success': False,
            'message': str(e)
        }, status=400)

@csrf_exempt
@require_http_methods(["POST"])
def user_register(request):
    """Simple registration view with role"""
    try:
        data = json.loads(request.body)
        username = data.get('username')
        email = data.get('email', '')
        password = data.get('password')
        role = data.get('role', 'citizen')
        
        if not username or not password:
            return JsonResponse({'success': False, 'message': 'Username and password are required'}, status=400)
        
        if User.objects.filter(username=username).exists():
            return JsonResponse({
                'success': False,
                'message': 'Username already exists'
            }, status=400)
        
        user = User.objects.create_user(
            username=username,
            email=email,
            password=password
        )
        # Set role if present on model
        if hasattr(user, 'role'):
            user.role = role
            user.save()
        
        return JsonResponse({
            'success': True,
            'message': 'Registration successful',
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'role': getattr(user, 'role', 'citizen')
            }
        })
    except Exception as e:
        return JsonResponse({
            'success': False,
            'message': str(e)
        }, status=400)

@csrf_exempt
def user_logout(request):
    """Simple logout view"""
    logout(request)
    return JsonResponse({
        'success': True,
        'message': 'Logout successful'
    })

# Waste Report views
@csrf_exempt
@require_http_methods(["GET"])
def get_waste_reports(request):
    """Get all waste reports"""
    try:
        reports = WasteReport.objects.all().order_by('-created_at')
        reports_data = []
        for report in reports:
            reports_data.append({
                'id': report.id,
                'title': report.title,
                'description': report.description,
                'location': report.location,
                'issue_type': report.issue_type,
                'status': report.status,
                'created_at': report.created_at.strftime('%Y-%m-%d %H:%M'),
                'reporter': report.reporter.username
            })
        
        return JsonResponse({
            'success': True,
            'reports': reports_data
        })
    except Exception as e:
        return JsonResponse({
            'success': False,
            'message': str(e)
        }, status=400)

@csrf_exempt
@require_http_methods(["POST"])
def create_waste_report(request):
    """Create a new waste report"""
    try:
        data = json.loads(request.body)
        
        # For simplicity, create a report with an anonymous user if no auth
        anon_user, _ = User.objects.get_or_create(
            username='anonymous',
            defaults={'email': 'anonymous@example.com'}
        )
        
        report = WasteReport.objects.create(
            reporter=anon_user,
            title=data.get('title', ''),
            description=data.get('description', ''),
            location=data.get('location', ''),
            issue_type=data.get('issue_type', 'garbage'),
            status='reported'
        )
        
        return JsonResponse({
            'success': True,
            'message': 'Waste report created successfully',
            'report_id': report.id
        })
    except Exception as e:
        return JsonResponse({
            'success': False,
            'message': str(e)
        }, status=400)

# Campaign views
@csrf_exempt
@require_http_methods(["GET"])
def get_campaigns(request):
    """Get all active campaigns"""
    try:
        campaigns = Campaign.objects.filter(is_active=True).order_by('-created_at')
        campaigns_data = []
        for campaign in campaigns:
            campaigns_data.append({
                'id': campaign.id,
                'title': campaign.title,
                'description': campaign.description,
                'start_date': campaign.start_date.strftime('%Y-%m-%d'),
                'end_date': campaign.end_date.strftime('%Y-%m-%d'),
                'location': campaign.location,
                'max_volunteers': campaign.max_volunteers,
                'organizer': campaign.organizer.username
            })
        
        return JsonResponse({
            'success': True,
            'campaigns': campaigns_data
        })
    except Exception as e:
        return JsonResponse({
            'success': False,
            'message': str(e)
        }, status=400)

# Park views
@csrf_exempt
@require_http_methods(["GET"])
def get_parks(request):
    """Get all parks"""
    try:
        parks = Park.objects.all().order_by('-oxygen_rating')
        parks_data = []
        for park in parks:
            parks_data.append({
                'id': park.id,
                'name': park.name,
                'location': park.location,
                'description': park.description,
                'oxygen_rating': park.oxygen_rating,
                'features': park.features
            })
        
        return JsonResponse({
            'success': True,
            'parks': parks_data
        })
    except Exception as e:
        return JsonResponse({
            'success': False,
            'message': str(e)
        }, status=400)

# Donation views
@csrf_exempt
@require_http_methods(["GET"])
def get_donations(request):
    """Get all donations"""
    try:
        donations = Donation.objects.all().order_by('-created_at')
        donations_data = []
        for donation in donations:
            donations_data.append({
                'id': donation.id,
                'donation_type': donation.donation_type,
                'description': donation.description,
                'pickup_address': donation.pickup_address,
                'status': donation.status,
                'created_at': donation.created_at.strftime('%Y-%m-%d %H:%M'),
                'donor': donation.donor.username
            })
        
        return JsonResponse({
            'success': True,
            'donations': donations_data
        })
    except Exception as e:
        return JsonResponse({
            'success': False,
            'message': str(e)
        }, status=400)

# Home page data
@csrf_exempt
@require_http_methods(["GET"])
def get_home_data(request):
    """Get data for the home page"""
    try:
        # Get counts for dashboard
        total_reports = WasteReport.objects.count()
        active_campaigns = Campaign.objects.filter(is_active=True).count()
        total_parks = Park.objects.count()
        total_donations = Donation.objects.count()
        
        # Get recent reports
        recent_reports = WasteReport.objects.all().order_by('-created_at')[:5]
        recent_reports_data = []
        for report in recent_reports:
            recent_reports_data.append({
                'id': report.id,
                'title': report.title,
                'status': report.status,
                'created_at': report.created_at.strftime('%Y-%m-%d')
            })
        
        return JsonResponse({
            'success': True,
            'stats': {
                'total_reports': total_reports,
                'active_campaigns': active_campaigns,
                'total_parks': total_parks,
                'total_donations': total_donations
            },
            'recent_reports': recent_reports_data
        })
    except Exception as e:
        return JsonResponse({
            'success': False,
            'message': str(e)
        }, status=400)
