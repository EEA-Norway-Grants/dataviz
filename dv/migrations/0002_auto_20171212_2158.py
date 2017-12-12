# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2017-12-12 19:58
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dv', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='ImportLog',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now=True, null=True)),
                ('data', models.TextField()),
            ],
        ),
        migrations.AlterModelOptions(
            name='news',
            options={'ordering': ('-created',), 'verbose_name_plural': 'news'},
        ),
        migrations.AlterModelOptions(
            name='nuts',
            options={'ordering': ['code'], 'verbose_name_plural': 'NUTS'},
        ),
    ]