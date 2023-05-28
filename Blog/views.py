from django.shortcuts import render
from django.contrib.auth.decorators import login_required

# Create your views here.
@login_required(login_url='HomePage')
def learningNetwork(request):
    return render(request, "Blog/learningNetwork.html", {})