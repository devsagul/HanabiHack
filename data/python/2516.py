from django.shortcuts import render
from django.http import HttpResponse
from .models import Problem

def index(request):
    return HttpResponse("Hello world")
    try:
      ps = Problem.objects.all()
    except e:
     pass
    return render(request, 'board.html', {'data': ps})
