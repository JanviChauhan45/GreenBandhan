from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MinValueValidator, MaxValueValidator

class User(AbstractUser):
    """Extended user model with roles"""
    ROLE_CHOICES = [
        ('citizen', 'Citizen'),
        ('ngo', 'NGO'),
        ('admin', 'Admin'),
        ('volunteer', 'Volunteer'),
        ('recycler', 'Recycler'),
    ]
    
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='citizen')
    phone = models.CharField(max_length=15, blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    
    def __str__(self):
        return f"{self.username} - {self.role}"

class WasteReport(models.Model):
    """Model for tracking garbage or recycling issues"""
    STATUS_CHOICES = [
        ('reported', 'Reported'),
        ('in_progress', 'In Progress'),
        ('resolved', 'Resolved'),
        ('closed', 'Closed'),
    ]
    
    TYPE_CHOICES = [
        ('garbage', 'Garbage'),
        ('recycling', 'Recycling'),
        ('water', 'Water Issue'),
        ('other', 'Other'),
    ]
    
    reporter = models.ForeignKey(User, on_delete=models.CASCADE, related_name='waste_reports')
    title = models.CharField(max_length=200)
    description = models.TextField()
    location = models.CharField(max_length=500)
    latitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    issue_type = models.CharField(max_length=20, choices=TYPE_CHOICES, default='garbage')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='reported')
    image = models.ImageField(upload_to='waste_reports/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.title} - {self.status}"

class Campaign(models.Model):
    """Model for NGO-managed environmental campaigns"""
    organizer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='campaigns')
    title = models.CharField(max_length=200)
    description = models.TextField()
    start_date = models.DateField()
    end_date = models.DateField()
    location = models.CharField(max_length=500)
    max_volunteers = models.PositiveIntegerField(default=50)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.title} by {self.organizer.username}"

class VolunteerParticipation(models.Model):
    """Model for tracking volunteer participation in campaigns"""
    volunteer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='participations')
    campaign = models.ForeignKey(Campaign, on_delete=models.CASCADE, related_name='participants')
    joined_at = models.DateTimeField(auto_now_add=True)
    hours_contributed = models.PositiveIntegerField(default=0)
    
    class Meta:
        unique_together = ['volunteer', 'campaign']
    
    def __str__(self):
        return f"{self.volunteer.username} in {self.campaign.title}"

class Park(models.Model):
    """Model for green space directory"""
    name = models.CharField(max_length=200)
    location = models.CharField(max_length=500)
    description = models.TextField()
    oxygen_rating = models.PositiveIntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(10)],
        help_text="Oxygen rating from 1-10"
    )
    features = models.TextField(help_text="Available features like walking trails, benches, etc.")
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.name} - Rating: {self.oxygen_rating}"

class ParkFeedback(models.Model):
    """Model for park ratings and comments"""
    park = models.ForeignKey(Park, on_delete=models.CASCADE, related_name='feedbacks')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='park_feedbacks')
    rating = models.PositiveIntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(5)],
        help_text="Rating from 1-5"
    )
    comment = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ['park', 'user']
    
    def __str__(self):
        return f"{self.user.username} rated {self.park.name} - {self.rating} stars"

class Donation(models.Model):
    """Model for clothing and item donations"""
    DONATION_TYPE_CHOICES = [
        ('clothing', 'Clothing'),
        ('books', 'Books'),
        ('electronics', 'Electronics'),
        ('furniture', 'Furniture'),
        ('other', 'Other'),
    ]
    
    donor = models.ForeignKey(User, on_delete=models.CASCADE, related_name='donations')
    volunteer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='pickups', null=True, blank=True)
    donation_type = models.CharField(max_length=20, choices=DONATION_TYPE_CHOICES)
    description = models.TextField()
    pickup_address = models.TextField()
    status = models.CharField(max_length=20, choices=[
        ('pending', 'Pending'),
        ('scheduled', 'Scheduled'),
        ('picked_up', 'Picked Up'),
        ('delivered', 'Delivered'),
    ], default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.donation_type} donation by {self.donor.username}"

class ImpactScore(models.Model):
    """Model for tracking user impact scores for leaderboard"""
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='impact_score')
    points = models.PositiveIntegerField(default=0)
    level = models.PositiveIntegerField(default=1)
    last_updated = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.user.username} - Level {self.level} ({self.points} points)"
