from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from onTheRoof import views


urlpatterns = [
    path('login/', views.loginUser, name="login"),
    path('logout/', views.logout_view, name="logout"),

    #user urls
    path('users/', views.getUsers, name="users"),
    path('users/<int:id>', views.getUser, name="user"),
    path('users/createUser', views.registerUser, name="all_user"),
    
    #avatar urls
    path('users/avatar/<str:username>', views.addAvatar, name="avatar"),
    path('users/getAvatar/<int:id>', views.getAvatar, name="avatar"),


    # # post urls
    path('posts/', views.getPosts, name="posts"),
    path('posts/<int:post_id>', views.getPost, name="post"),
    path('posts/addPost', views.addPost, name="addPost"),
    path('posts/edit/<int:post_id>', views.editPost, name="editPost"),
     path('posts/delete/<int:post_id>', views.deletePost, name="deletePost"),

    #comment urls
    path('addComment/', views.addComment, name="add-comment"),
    path('comments/<int:pk>', views.getComments, name="comments"),

    path('likes/<int:user_id>/<int:post_id>', views.getLikes, name="likes"),
    path('addLikes/<int:user_id>/<int:post_id>', views.addLikes, name="addLikes"),
    
    # path('users/<int:pk>', views.getUser, name="user"),


    # path('posts/<int:post_id>', views.getPost, name="post"),
    # path('posts/addPost', views.addPost, name="addPost"),
    # path('comments/<int:pk>', views.getComments, name="comments"),
    # path('addComment/', views.addComment, name="add-comment"),
    # path('likes/<int:user_id>/<int:post_id>', views.getLikes, name="likes"),
    # # path('home/', views.login, name ='home'),
    # path('home/', views.HomeView.as_view(), name ='home'),
]