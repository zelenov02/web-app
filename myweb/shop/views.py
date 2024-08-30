from django.shortcuts import render
from django.views.generic import DetailView
from .models import Products
from django.http import JsonResponse


def catalog(request):
    return render(request, 'shop/catalog.html')


def turnik(request):
    products = Products.objects.all()
    return render(request, 'shop/turnik.html', {'products': products})


def uatlet(request):
    products = Products.objects.all()
    return render(request, 'shop/uatlet.html', {'products': products})


def atlet(request):
    products = Products.objects.all()
    return render(request, 'shop/atlet.html', {'products': products})


def street_sport(request):
    products = Products.objects.all()
    return render(request, 'shop/street.html', {'products': products})


def more_ivent(request):
    products = Products.objects.all()
    return render(request, 'shop/more.html', {'products': products})


class ProductsDetailView(DetailView):
    model = Products
    template_name = 'shop/products.html'
    context_object_name = 'products'