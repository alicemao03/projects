from rest_framework import serializers
from .models import  BlogPosts, Comments, Likes, Avatar
from django.contrib.auth.models import User

class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name', 'email', 'username', 'password')
        

class BlogSerializer(serializers.ModelSerializer):
    user = UsersSerializer(many=False)
    class Meta:
        model = BlogPosts
        fields = ('post_id', 'title', 'description', 'img_src', 'time', 'user')

class AvatarSerializer(serializers.ModelSerializer):
    user = UsersSerializer(many=False)
    class Meta:
        model = Avatar
        fields = ('avatar', 'user')


class CommentSerializer(serializers.ModelSerializer):
    user = UsersSerializer(many=False)
    post_id = BlogSerializer(many=False)

    class Meta:
        model = Comments
        fields = ('comment_id', 'time', 'comment', 'user', 'post_id')


class LikesSerializer(serializers.ModelSerializer):
    user = UsersSerializer(many=False)
    post_id = BlogSerializer(many=False)
    class Meta:
        model = Likes
        fields = ('liked', 'user', 'post_id')


