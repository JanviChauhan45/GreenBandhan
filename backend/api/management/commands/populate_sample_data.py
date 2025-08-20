from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from django.utils import timezone
from datetime import timedelta
from api.models import (
    User, WasteReport, Campaign, Park, Donation, 
    VolunteerParticipation, ParkFeedback, ImpactScore
)

User = get_user_model()

class Command(BaseCommand):
    help = 'Populate database with sample data for EcoConnect'

    def handle(self, *args, **options):
        self.stdout.write('Creating sample data...')
        
        # Create sample users
        self.create_sample_users()
        
        # Create sample parks
        self.create_sample_parks()
        
        # Create sample campaigns
        self.create_sample_campaigns()
        
        # Create sample waste reports
        self.create_sample_waste_reports()
        
        # Create sample donations
        self.create_sample_donations()
        
        # Create sample impact scores
        self.create_sample_impact_scores()
        
        self.stdout.write(
            self.style.SUCCESS('Successfully created sample data!')
        )

    def create_sample_users(self):
        """Create sample users with different roles"""
        users_data = [
            {
                'username': 'john_citizen',
                'email': 'john@example.com',
                'password': 'password123',
                'role': 'citizen',
                'first_name': 'John',
                'last_name': 'Citizen'
            },
            {
                'username': 'eco_ngo',
                'email': 'contact@eco-ngo.org',
                'password': 'password123',
                'role': 'ngo',
                'first_name': 'Eco',
                'last_name': 'NGO'
            },
            {
                'username': 'volunteer_sarah',
                'email': 'sarah@example.com',
                'password': 'password123',
                'role': 'volunteer',
                'first_name': 'Sarah',
                'last_name': 'Volunteer'
            },
            {
                'username': 'city_admin',
                'email': 'admin@city.gov',
                'password': 'password123',
                'role': 'admin',
                'first_name': 'City',
                'last_name': 'Administrator'
            }
        ]
        
        for user_data in users_data:
            user, created = User.objects.get_or_create(
                username=user_data['username'],
                defaults={
                    'email': user_data['email'],
                    'role': user_data['role'],
                    'first_name': user_data['first_name'],
                    'last_name': user_data['last_name']
                }
            )
            if created:
                user.set_password(user_data['password'])
                user.save()
                self.stdout.write(f'Created user: {user.username}')
            else:
                self.stdout.write(f'User already exists: {user.username}')

    def create_sample_parks(self):
        """Create sample parks with oxygen ratings"""
        parks_data = [
            {
                'name': 'Central Park',
                'location': '123 Main Street, Downtown',
                'description': 'Beautiful central park with walking trails, benches, and a playground. Perfect for family outings and morning walks.',
                'oxygen_rating': 9,
                'features': 'Walking Trails, Benches, Playground, Picnic Area, Fountain'
            },
            {
                'name': 'Riverside Garden',
                'location': '456 River Road, Riverside',
                'description': 'Peaceful garden along the river with meditation spots and beautiful flower displays. Ideal for relaxation and bird watching.',
                'oxygen_rating': 8,
                'features': 'Meditation Spots, River View, Flower Gardens, Bird Watching, Benches'
            },
            {
                'name': 'Community Forest',
                'location': '789 Forest Lane, Suburbs',
                'description': 'Community-maintained forest with native trees and wildlife. Great for hiking and nature education.',
                'oxygen_rating': 7,
                'features': 'Native Trees, Hiking Trails, Wildlife, Nature Education Center, Picnic Area'
            },
            {
                'name': 'Urban Oasis',
                'location': '321 City Center, Downtown',
                'description': 'Modern urban park with contemporary design, art installations, and sustainable features.',
                'oxygen_rating': 6,
                'features': 'Art Installations, Sustainable Design, Outdoor Gym, Cafeteria, WiFi'
            }
        ]
        
        for park_data in parks_data:
            park, created = Park.objects.get_or_create(
                name=park_data['name'],
                defaults=park_data
            )
            if created:
                self.stdout.write(f'Created park: {park.name}')
            else:
                self.stdout.write(f'Park already exists: {park.name}')

    def create_sample_campaigns(self):
        """Create sample environmental campaigns"""
        # Get NGO user
        ngo_user = User.objects.filter(role='ngo').first()
        if not ngo_user:
            self.stdout.write('No NGO user found. Skipping campaigns.')
            return
            
        campaigns_data = [
            {
                'title': 'Tree Plantation Drive 2024',
                'description': 'Help us plant 1000 trees in the city park to increase green cover and improve air quality. Volunteers will receive training and tools.',
                'start_date': timezone.now().date(),
                'end_date': (timezone.now() + timedelta(days=30)).date(),
                'location': 'Central Park and surrounding areas',
                'max_volunteers': 100
            },
            {
                'title': 'Plastic Cleanup Initiative',
                'description': 'Join us in cleaning up plastic waste from the river banks and beaches. This campaign aims to protect marine life and improve water quality.',
                'start_date': (timezone.now() + timedelta(days=7)).date(),
                'end_date': (timezone.now() + timedelta(days=21)).date(),
                'location': 'Riverside areas and beaches',
                'max_volunteers': 50
            },
            {
                'title': 'Water Conservation Awareness',
                'description': 'Educational campaign to promote water-saving techniques in homes and businesses. Includes workshops and practical demonstrations.',
                'start_date': (timezone.now() + timedelta(days=14)).date(),
                'end_date': (timezone.now() + timedelta(days=45)).date(),
                'location': 'Community centers and schools',
                'max_volunteers': 30
            }
        ]
        
        for campaign_data in campaigns_data:
            campaign, created = Campaign.objects.get_or_create(
                title=campaign_data['title'],
                defaults={**campaign_data, 'organizer': ngo_user}
            )
            if created:
                self.stdout.write(f'Created campaign: {campaign.title}')
            else:
                self.stdout.write(f'Campaign already exists: {campaign.title}')

    def create_sample_waste_reports(self):
        """Create sample waste reports"""
        # Get citizen user
        citizen_user = User.objects.filter(role='citizen').first()
        if not citizen_user:
            self.stdout.write('No citizen user found. Skipping waste reports.')
            return
            
        reports_data = [
            {
                'title': 'Garbage pile near Central Park',
                'description': 'Large pile of garbage has accumulated near the entrance of Central Park. It\'s causing unpleasant smell and attracting stray animals.',
                'location': 'Central Park entrance, Main Street',
                'issue_type': 'garbage',
                'status': 'reported'
            },
            {
                'title': 'Broken recycling bins',
                'description': 'Several recycling bins in the downtown area are broken and not functioning properly. Need immediate repair.',
                'location': 'Downtown shopping district',
                'issue_type': 'recycling',
                'status': 'in_progress'
            },
            {
                'title': 'Water leakage from street pipes',
                'description': 'Water is leaking from underground pipes on Oak Street. This is causing water wastage and road damage.',
                'location': 'Oak Street, between 5th and 6th Avenue',
                'issue_type': 'water',
                'status': 'reported'
            },
            {
                'title': 'Illegal dumping in vacant lot',
                'description': 'Someone has been illegally dumping construction waste in the vacant lot behind the mall. This needs immediate attention.',
                'location': 'Vacant lot behind City Mall',
                'issue_type': 'garbage',
                'status': 'reported'
            }
        ]
        
        for report_data in reports_data:
            report, created = WasteReport.objects.get_or_create(
                title=report_data['title'],
                defaults={**report_data, 'reporter': citizen_user}
            )
            if created:
                self.stdout.write(f'Created waste report: {report.title}')
            else:
                self.stdout.write(f'Waste report already exists: {report.title}')

    def create_sample_donations(self):
        """Create sample donations"""
        # Get citizen user
        citizen_user = User.objects.filter(role='citizen').first()
        if not citizen_user:
            self.stdout.write('No citizen user found. Skipping donations.')
            return
            
        donations_data = [
            {
                'donation_type': 'clothing',
                'description': 'Gently used winter clothes including jackets, sweaters, and warm accessories. All items are clean and in good condition.',
                'pickup_address': '123 Main Street, Apartment 4B, Downtown',
                'status': 'pending'
            },
            {
                'donation_type': 'books',
                'description': 'Collection of educational books, novels, and children\'s books. Perfect for schools and libraries.',
                'pickup_address': '456 Oak Avenue, House 12, Suburbs',
                'status': 'scheduled'
            },
            {
                'donation_type': 'electronics',
                'description': 'Working laptop, tablet, and mobile phones. All devices are functional and can be used by students.',
                'pickup_address': '789 Pine Street, Office 3, Business District',
                'status': 'pending'
            }
        ]
        
        for donation_data in donations_data:
            donation, created = Donation.objects.get_or_create(
                description=donation_data['description'][:50],  # Use first 50 chars as unique identifier
                defaults={**donation_data, 'donor': citizen_user}
            )
            if created:
                self.stdout.write(f'Created donation: {donation.donation_type}')
            else:
                self.stdout.write(f'Donation already exists: {donation.donation_type}')

    def create_sample_impact_scores(self):
        """Create sample impact scores for users"""
        users = User.objects.all()
        
        for user in users:
            # Generate random points based on user role
            if user.role == 'ngo':
                points = 150
                level = 3
            elif user.role == 'volunteer':
                points = 80
                level = 2
            elif user.role == 'admin':
                points = 200
                level = 4
            else:  # citizen
                points = 45
                level = 1
                
            impact_score, created = ImpactScore.objects.get_or_create(
                user=user,
                defaults={'points': points, 'level': level}
            )
            if created:
                self.stdout.write(f'Created impact score for {user.username}: {points} points')
            else:
                self.stdout.write(f'Impact score already exists for {user.username}')
