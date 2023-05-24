from django.shortcuts import render

# Create your views here.

def signup(request):
    return render(request, 'base/Signup.html')

def signin(request):
    return render(request, 'base/Signin.html') 

def HomePage(request):
    return render(request, 'base/HomePage.html')

def TakeaClass(request):
    return render(request, "base/Takeaclass.html")

def TakeaClassPage2(request):
    return render(request,"base/TakeaclassPage2.html")

def landingPage(request):
    return render(request, 'base/LandingPage.html')

def Dashboard(request):
    return render(request, 'base/Dashboard.html')

def OtherActivities(request):
    return render(request, "base/otheractivities.html")