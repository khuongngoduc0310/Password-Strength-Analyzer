# Generated by Django 4.2.16 on 2024-10-17 20:58

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='CommonPasswords',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('passwordID', models.IntegerField()),
                ('content', models.CharField(max_length=255)),
            ],
        ),
    ]
