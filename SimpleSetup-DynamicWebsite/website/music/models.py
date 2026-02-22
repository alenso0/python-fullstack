from django.db import models


class User_Messages(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    subject = models.CharField(max_length=150)
    message = models.TextField()
    def __str__(self):
        return self.subject

# Define the Artists model
class Artists(models.Model):
    name = models.CharField(max_length=100)
    # Add other fields as necessary, like genre, biography, etc.

# Define the Album model
class Album(models.Model):
    name = models.CharField(max_length=100)
    artist = models.ForeignKey(Artists, on_delete=models.CASCADE)  # Make sure to include on_delete
    release_date = models.DateField()