from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from .models import *

# Create your views here.
@login_required(login_url='HomePage')
def learningNetwork(request):
    questions = Question.objects.all()
    syllabus_choices = Question.SYLLABUS_CHOICES
    class_choices = Question.CLASS_CHOICES
    subject_choices = Question.SUBJECT_CHOICES
    form_submitted = False
    if request.method == "POST":
        question = Question()
        question.user = request.user 
        question.question = request.POST['question']
        question.syllabus = request.POST['syllabus']
        question.class_field = request.POST['class']
        question.subject = request.POST['subject']
        question.topic = request.POST['topic']
        question.save()
        form_submitted = True
        return redirect('learningNetwork')
    
    context = {
        'questions': questions,
        'syllabus_choices': syllabus_choices,
        'class_choices': class_choices,
        'subject_choices': subject_choices,
        'form_submitted' : form_submitted,
    }
    return render(request, "Blog/learningNetwork.html", context)