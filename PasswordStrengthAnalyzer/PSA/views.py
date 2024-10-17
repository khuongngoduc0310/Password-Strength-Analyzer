from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from .models import Common_Passwords

# Create your views here.
def home(request):
    return render(request, '.\PSA\index.html')

def generator(request):
    return render(request, '.\PSA\generator.html')

def checkPassword(request, password):
    isExist = Common_Passwords.objects.filter(content=password).exists()
    # password_list = Common_Passwords.objects.filter(content=request.GET.get('password'))
    return JsonResponse({'exists': isExist})