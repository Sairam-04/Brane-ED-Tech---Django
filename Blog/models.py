# Create your models here.
from django.db import models
from base.models import CustomUser

class Question(models.Model):
    SYLLABUS_CHOICES = [
        ('CBSE', 'CBSE'),
    ]

    CLASS_CHOICES = [
        ('class-10', 'class-10'),
    ]

    SUBJECT_CHOICES = [
        ('Maths', 'Maths'),
    ]

    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    question = models.TextField()
    syllabus = models.CharField(max_length=50, choices=SYLLABUS_CHOICES)
    class_field = models.CharField(max_length=50, choices=CLASS_CHOICES)
    subject = models.CharField(max_length=50, choices=SUBJECT_CHOICES)
    topic = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.question

class Answer(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    answer_text = models.TextField()
    pub_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.answer_text
