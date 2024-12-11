from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),  # URL for rendering the HTML
    path('generator', views.generator, name='generator'),
    path('checkPassword/<str:password>/', views.checkPassword, name='checkPassword'),
    path('getCommon', views.getCommon, name='getCommon'),
    path('checkSocial/<str:password>/', views.check_social, name='check_social'),
]
