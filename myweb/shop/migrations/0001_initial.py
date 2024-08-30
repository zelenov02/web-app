# Generated by Django 4.1 on 2022-09-11 13:06

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Products',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.DecimalField(decimal_places=0, help_text='Выбери тип, где: 1 - Турники, 2 - ДСК, 3 - СК, 4 - УДСК, 5 - Доп оборуование', max_digits=2, verbose_name='Тип')),
                ('title', models.CharField(max_length=70, verbose_name='Название')),
                ('description', models.TextField(verbose_name='Описание')),
                ('prise', models.DecimalField(decimal_places=0, max_digits=10, verbose_name='Цена')),
                ('image1', models.ImageField(help_text='Главное фото', upload_to='static/img')),
                ('image2', models.ImageField(upload_to='static/img')),
                ('image3', models.ImageField(upload_to='static/img')),
                ('image4', models.ImageField(upload_to='static/img')),
                ('image5', models.ImageField(upload_to='static/img')),
                ('available', models.BooleanField(default=True, verbose_name='Наличие')),
            ],
            options={
                'verbose_name': 'Товар',
                'verbose_name_plural': 'Товары',
            },
        ),
    ]