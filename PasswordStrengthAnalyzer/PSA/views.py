from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def home(request):
    return render(request, '.\PSA\index.html')

def generator(request):
    return render(request, '.\PSA\generator.html')