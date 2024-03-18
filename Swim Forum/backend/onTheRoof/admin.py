from django.contrib import admin
from .models import BlogPosts, Comments, Likes, Avatar

# Register your models here.

# admin.site.register(Users)
admin.site.register(BlogPosts)
admin.site.register(Comments)
admin.site.register(Likes)
admin.site.register(Avatar)