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

def getCommon(request):
    json_path = os.path.join(settings.STATICFILES_DIRS[0], 'PSA/common.json')

    with open(json_path) as json_file:
        data = json.load(json_file)

    response = JsonResponse(data)
    response["Access-Control-Allow-Origin"] = "*"
    response["Access-Control-Allow-Credentials"] = True

    return response

def check_social(request, password):
    if (len(password) > 3):
        # Get the password from the GET request, convert to lower to ignore case.
        password = password.lower()
        # Variable to direct to the path of the file.
        module_dir = os.path.dirname(__file__)
        # Join the path with the file name for the full path.
        file_path = os.path.join(settings.STATICFILES_DIRS[0], 'PSA/SEData.txt')
    try:
        social_list =[x.lower() for x in open(file_path).read().splitlines()]
        # Cycle through the list to see if the password contains social engineering data.
        found = any(social in password for social in social_list)
        # Return true or false in JsonResponse if found/not found.
        return JsonResponse({'found': found})
    except FileNotFoundError:
        return JsonResponse({'error': 'File not found'}, status=404)
