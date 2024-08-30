from django.db import models


class Products(models.Model):
    type = models.DecimalField('Тип', max_digits=2, decimal_places=0, help_text='Выбери тип, где: 1 - Турники, 2 - ДСК, 3 - СК, 4 - УДСК, 5 - Доп оборуование')
    title = models.CharField('Название', max_length=70)
    description = models.TextField('Описание')
    prise = models.DecimalField('Цена', max_digits=10, decimal_places=0)
    image1 = models.ImageField(upload_to='static/img', help_text='Главное фото')
    image2 = models.ImageField(upload_to='static/img')
    image3 = models.ImageField(upload_to='static/img')
    image4 = models.ImageField(upload_to='static/img')
    image5 = models.ImageField(upload_to='static/img')
    available = models.BooleanField(default=True, verbose_name='Наличие')

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Товар'
        verbose_name_plural = 'Товары'