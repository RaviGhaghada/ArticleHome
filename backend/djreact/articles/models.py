from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Article(models.Model):
    title = models.CharField(max_length=120)
    content = models.TextField()
    description = models.CharField(max_length=50)
    likes = models.ManyToManyField(User)

    def __str__(self):
        return self.title