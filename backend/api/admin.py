from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import (
    User, WasteReport, Campaign, Park, Donation, 
    VolunteerParticipation, ParkFeedback, ImpactScore
)

# Custom User Admin
class CustomUserAdmin(UserAdmin):
    list_display = ('username', 'email', 'role', 'is_staff', 'is_active')
    list_filter = ('role', 'is_staff', 'is_active')
    fieldsets = UserAdmin.fieldsets + (
        ('EcoConnect Profile', {'fields': ('role', 'phone', 'address')}),
    )
    add_fieldsets = UserAdmin.add_fieldsets + (
        ('EcoConnect Profile', {'fields': ('role', 'phone', 'address')}),
    )

# Waste Report Admin
@admin.register(WasteReport)
class WasteReportAdmin(admin.ModelAdmin):
    list_display = ('title', 'reporter', 'issue_type', 'status', 'created_at')
    list_filter = ('issue_type', 'status', 'created_at')
    search_fields = ('title', 'description', 'location')
    readonly_fields = ('created_at', 'updated_at')

# Campaign Admin
@admin.register(Campaign)
class CampaignAdmin(admin.ModelAdmin):
    list_display = ('title', 'organizer', 'start_date', 'end_date', 'is_active')
    list_filter = ('is_active', 'start_date', 'end_date')
    search_fields = ('title', 'description', 'location')
    readonly_fields = ('created_at',)

# Park Admin
@admin.register(Park)
class ParkAdmin(admin.ModelAdmin):
    list_display = ('name', 'location', 'oxygen_rating', 'created_at')
    list_filter = ('oxygen_rating', 'created_at')
    search_fields = ('name', 'location', 'description')
    readonly_fields = ('created_at',)

# Donation Admin
@admin.register(Donation)
class DonationAdmin(admin.ModelAdmin):
    list_display = ('donation_type', 'donor', 'status', 'created_at')
    list_filter = ('donation_type', 'status', 'created_at')
    search_fields = ('description', 'pickup_address')
    readonly_fields = ('created_at',)

# Volunteer Participation Admin
@admin.register(VolunteerParticipation)
class VolunteerParticipationAdmin(admin.ModelAdmin):
    list_display = ('volunteer', 'campaign', 'hours_contributed', 'joined_at')
    list_filter = ('joined_at', 'hours_contributed')
    search_fields = ('volunteer__username', 'campaign__title')

# Park Feedback Admin
@admin.register(ParkFeedback)
class ParkFeedbackAdmin(admin.ModelAdmin):
    list_display = ('park', 'user', 'rating', 'created_at')
    list_filter = ('rating', 'created_at')
    search_fields = ('park__name', 'user__username', 'comment')
    readonly_fields = ('created_at',)

# Impact Score Admin
@admin.register(ImpactScore)
class ImpactScoreAdmin(admin.ModelAdmin):
    list_display = ('user', 'points', 'level', 'last_updated')
    list_filter = ('level', 'last_updated')
    search_fields = ('user__username',)
    readonly_fields = ('last_updated',)

# Register the custom user admin
admin.site.register(User, CustomUserAdmin)
