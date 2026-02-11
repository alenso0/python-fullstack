from django.shortcuts import render
from django.http import HttpResponse 


# Create your views here.
def home(request):
    d={"name": "Alen Alex", "age": 20, "occupation": "Software Engineer", "username": "theceo", "phone": "+1234567890"}
    return render(request, "business_card.html", d)

def second(request):
    return HttpResponse("<h1>This is the second page.</h1>")

def third(request):
    return HttpResponse("<h1>This is the third page.</h1>")

def fourth(request):
    return HttpResponse("<h1>This is the fourth page.</h1>")
