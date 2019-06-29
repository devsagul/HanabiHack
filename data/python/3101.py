# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2017-01-14 04:50
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Client',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('phone', models.CharField(max_length=20)),
                ('email', models.EmailField(blank=True, max_length=254)),
                ('gender', models.PositiveIntegerField(choices=[(0, 'Male'), (1, 'Female')])),
                ('address', models.TextField(blank=True)),
            ],
        ),
        migrations.CreateModel(
            name='Location',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('address', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Parcel',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.TextField()),
                ('waybill', models.CharField(max_length=50, unique=True)),
                ('recipient_name', models.CharField(max_length=50)),
                ('recipient_phone', models.CharField(max_length=20)),
                ('status', models.PositiveIntegerField(choices=[(0, 'Loading'), (1, 'Transit'), (2, 'Arrived')])),
                ('cost', models.DecimalField(decimal_places=2, max_digits=10)),
                ('batch_number', models.CharField(blank=True, max_length=20)),
                ('current_location', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='parcel_location', to='parcel.Location')),
                ('destination', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='destination', to='parcel.Location')),
                ('loaded_from', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='origin', to='parcel.Location')),
                ('sender', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='parcel.Client')),
            ],
        ),
        migrations.CreateModel(
            name='State',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Vehicle',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('licence_plate', models.CharField(max_length=10)),
                ('in_transit', models.BooleanField(default=False)),
                ('location', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='parcel.Location')),
            ],
        ),
        migrations.AddField(
            model_name='parcel',
            name='vehicle',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='parcel.Vehicle'),
        ),
        migrations.AddField(
            model_name='location',
            name='state',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='parcel.State'),
        ),
    ]