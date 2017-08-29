# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2017-08-28 17:05
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('dv', '0017_auto_20170822_2154'),
    ]

    operations = [
        migrations.AddField(
            model_name='organisation',
            name='city',
            field=models.CharField(default='', max_length=64),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='project',
            name='summary',
            field=models.TextField(default=''),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='organisation_organisationrole',
            name='project',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='organisation_roles', to='dv.Project'),
        ),
    ]