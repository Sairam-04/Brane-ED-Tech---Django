from django.urls import path, include
from . import views

urlpatterns = [
    path("signup/", views.signup, name="SignUp"),
    path("signin/", views.signin, name="SignIn"),
    path("", views.HomePage, name="HomePage"),
    path("takeaclass/", views.TakeaClass, name="takeaclass"),
    path("takeaclassPage2/", views.TakeaClassPage2, name="takeaclassPage2"),
    path("takeaclassPage2/takeassessment", views.takeAssessment, name="takeAssessment"),
    # path("takeassessment/generate_certificate/", views.generate_certificate, name="generate_certificate"),
    path("takeassessment/", views.takeTest, name="takeTest"),
    path("dashboard/", views.Dashboard, name="Dashboard"),
    path("landingPage/", views.landingPage, name="landingPage"),
    path("otheractivities/", views.OtherActivities, name="OtherActivities"),
    path("game/", views.Game, name="Game"),
    path("game_view/", views.game_view, name="Game_view"),
    path("logout/", views.logoutUser, name="Logout"),
    path("", include('Blog.urls')),
    path("", include('generalSearch.urls')),
]
