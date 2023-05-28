from django.urls import path
from . import views

urlpatterns = [
    path("learningNetwork", views.learningNetwork, name="learningNetwork"),
]