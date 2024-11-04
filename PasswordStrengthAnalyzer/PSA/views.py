from django.shortcuts import render
from django.conf import settings
from django.http import HttpResponse, JsonResponse
from .models import Common_Passwords
import os
import json

# Create your views here.
def home(request):
    return render(request, '.\PSA\index.html')

def generator(request):
    json_path = os.path.join(settings.STATICFILES_DIRS[0], 'PSA/common.json')
    
    with open(json_path) as json_file:
        data = json.load(json_file)
    
    # Pass the JSON data to the template
    return render(request, '.\PSA\generator.html', {'common_data': json.dumps(data)})

def checkPassword(request, password):
    if (len(password) > 0):
        isExist = Common_Passwords.objects.filter(content=password).exists()
    else: isExist = False
    # password_list = Common_Passwords.objects.filter(content=request.GET.get('password'))
    return JsonResponse({'exists': isExist})
