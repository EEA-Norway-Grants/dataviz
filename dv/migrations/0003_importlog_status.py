# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2017-12-13 07:11
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dv', '0002_auto_20171212_2158'),
    ]

    operations = [
        migrations.AddField(
            model_name='importlog',
            name='status',
            field=models.TextField(default='SUCCESS'),
            preserve_default=False,
        ),
    ]