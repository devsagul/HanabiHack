# -*- coding: utf-8 -*-
# Generated by Django 1.9.1 on 2016-01-17 18:24
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0052_holesawdiameter_advice'),
    ]

    operations = [
        migrations.AlterField(
            model_name='holesawdiameter',
            name='advice',
            field=models.BooleanField(default=False, verbose_name='Aus Empfehlungstabelle?'),
        ),
    ]
