from django.db import models
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import User

# Create your models here.

class BlogPosts(models.Model):
    class FilterChoices(models.TextChoices):
            NONE = 'NO', _('None')
            BIRTHDAY ='BD', _('Birthday')
            LOGISTICS = 'LG', _("Logisitcs")
            PARTIES = 'PA', _("Parties")
            Socials = 'SO', _("Socials")
    
    post_id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=120, null=False, blank=True)
    description = models.TextField(null=True, blank=True)
    img_src = models.ImageField(upload_to='postImages', null=True, blank=True)
    time = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def _str_(self):
        return self.title


class Avatar(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    avatar = models.ImageField(upload_to='avatars', null=True, blank=True)

    def _str_(self):
        return self.avatar

class Comments(models.Model):
    comment_id = models.AutoField(primary_key=True)
    post_id = models.ForeignKey(BlogPosts, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    time = models.DateTimeField(auto_now_add=True)
    comment = models.TextField()

    def _str_(self):
        return self.comment


class Likes(models.Model):
    post_id = models.ForeignKey(BlogPosts, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    liked = models.BooleanField(default=False)

    def _str_(self):
        return self.liked

