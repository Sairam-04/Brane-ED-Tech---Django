from django.urls import path
from . import views

urlpatterns = [
    path("generalSearch/", views.generalSearch, name="generalSearch"),
]