from django.urls import path
from . import views


urlpatterns = [
    path('', views.catalog, name='catalog'),
    path('турники', views.turnik, name='turnik'),
    path('юный_атлет', views.uatlet, name='uatlet'),
    path('атлет', views.atlet, name='atlet'),
    path('уличные_комплексы', views.street_sport, name='street'),
    path('доп_оборудование', views.more_ivent, name='more'),
    path('<int:pk>', views.ProductsDetailView.as_view(), name='products-detail')
]
