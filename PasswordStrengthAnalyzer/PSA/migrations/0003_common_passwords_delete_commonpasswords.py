# Generated by Django 4.2.16 on 2024-10-17 21:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('PSA', '0002_remove_commonpasswords_passwordid'),
    ]

    operations = [
        migrations.CreateModel(
            name='Common_Passwords',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content', models.CharField(max_length=255)),
            ],
        ),
        migrations.DeleteModel(
            name='CommonPasswords',
        ),
    ]