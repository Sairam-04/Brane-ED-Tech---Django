from django.shortcuts import render
from django.contrib.auth.decorators import login_required

# Create your views here.
@login_required(login_url="Home")
def generalSearch(request):
    return render(request, 'generalSearch/General_Search.html', {})