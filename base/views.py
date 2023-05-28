from django.shortcuts import render, redirect
from .models import *
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.hashers import make_password
from django.template.loader import render_to_string
from django.templatetags.static import static
from django.http import HttpResponse
from PIL import Image, ImageDraw, ImageFont
import io


# Create your views here.


def signup(request):
    if request.method == 'POST':
        # Retrieve form data from request.POST
        name = request.POST['name']
        contact_number = request.POST['contact_number']
        email = request.POST['email']
        username = request.POST['username']
        password1 = request.POST['password1']
        password2 = request.POST['password2']

        # Create a new CustomUser instance and save it to the database
        if password1 == password2:
            # Passwords match, proceed with creating a new user
            hashed_password = make_password(password1)

            user = CustomUser.objects.create(
                name=name,
                contact_number=contact_number,
                email=email,
                username=username,
                password=hashed_password
            )
            return redirect("SignIn")
        else:
            # Passwords don't match, display an error message
            return render(request, 'base/Signup.html', {'error': 'Passwords do not match'})

    return render(request, 'base/Signup.html')


def signin(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            # Redirect to the desired page after login
            return redirect('landingPage')
        else:
            # Handle invalid login credentials
            return render(request, 'base/Signin.html', {'error': 'Invalid username or password'})
    else:
        return render(request, 'base/Signin.html')


def HomePage(request):
    if request.user.is_authenticated:
        return redirect("landingPage")
    return render(request, 'base/HomePage.html')


@login_required(login_url='HomePage')
def TakeaClass(request):
    return render(request, "base/Takeaclass.html")


@login_required(login_url='HomePage')
def TakeaClassPage2(request):
    return render(request, "base/TakeaclassPage2.html")


@login_required(login_url='HomePage')
def landingPage(request):
    return render(request, 'base/LandingPage.html')

@login_required(login_url='HomePage')
def takeAssessment(request):
    return render(request, 'base/takeurAssessment.html')

@login_required(login_url='HomePage')
def takeTest(request):
    return render(request, 'base/takeassessment.html')

@login_required(login_url='HomePage')
def Dashboard(request):
    return render(request, 'base/Dashboard.html')

@login_required(login_url='HomePage')
def OtherActivities(request):
    return render(request, "base/otheractivities.html")

def logoutUser(request):
    logout(request)
    return redirect("HomePage")
