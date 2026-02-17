from django.shortcuts import render
from django.http import HttpResponse
from .models import Student


def home(request):
    students = Student.objects.all()
    return render(request, "home.html", {"students": students})


def student_detail(request, id):
    student = Student.objects.get(id=id)
    return render(request, "detail.html", {"student": student})
