# Generated by Django 5.2 on 2025-04-22 18:41

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('music', '0007_likedsong'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AlterField(
            model_name='likedsong',
            name='song',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='liked_by_users', to='music.song'),
        ),
        migrations.AlterField(
            model_name='likedsong',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='liked_songs', to=settings.AUTH_USER_MODEL),
        ),
    ]
