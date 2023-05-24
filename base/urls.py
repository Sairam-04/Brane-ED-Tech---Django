from django.urls import path
from . import views

urlpatterns = [
    path("signup/", views.signup, name="SignUp"),
    path("signin/", views.signin, name="SignIn"),
    path("", views.HomePage, name="HomePage"),
    path("takeaclass/", views.TakeaClass, name="takeaclass"),
    path("takeaclassPage2/", views.TakeaClassPage2, name="takeaclassPage2"),
    path("dashboard/", views.Dashboard, name="Dashboard"),
    path("landingPage/", views.landingPage, name="landingPage"),
    path("otheractivities/", views.OtherActivities, name="OtherActivities"),
]