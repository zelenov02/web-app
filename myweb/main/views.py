from django.shortcuts import render


def index(request):
    return render(request, 'main/index.html')


def about(request):
    return render(request, 'main/about.html')


def test(request):
    return render(request, 'main/none.html')


def delivery(request):
    return render(request, 'main/delivery.html')
