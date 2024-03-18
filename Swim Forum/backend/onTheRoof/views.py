from django.shortcuts import render
from rest_framework.decorators import api_view, APIView, throttle_classes, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.throttling import UserRateThrottle
from rest_framework import status
from .serializers import  UsersSerializer, BlogSerializer, AvatarSerializer, CommentSerializer, LikesSerializer
from .models import BlogPosts, Avatar, Comments, Likes
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.http import JsonResponse


@api_view(['POST'])
def loginUser(request):
    username = request.data['username']
    password = request.data['password']
    user = authenticate(request, username=username, password=password)
    if user is None:
        return Response({"response":False,"user":user})
    else:
        login(request, user)
        return Response({"response":True,"user":user})

@api_view(['POST'])
def logout_view(request):
    logout(request)





@api_view(['POST'])
@authentication_classes([])
@permission_classes([])
def registerUser(request):
    try:
        first_name = request.data['first_name']
        last_name = request.data['last_name']
        username = request.data['username']
        email = request.data['email']
        password = request.data['password']
        newUser = User.objects.create_user(first_name=first_name, last_name=last_name, username=username, email=email, password=password)
        login(request, newUser)
        return Response({ 'result': 'ok' })
    except Exception as e:
        return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def getUsers(request):
    gettingUsers = User.objects.all()
    serializer = UsersSerializer(gettingUsers, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getUser(request, id):
    gettingUsers = User.objects.get(id=id)
    serializer = UsersSerializer(gettingUsers, many=False)
    return Response(serializer.data)





@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def getAvatar(request, id):
    gettingUsers = Avatar.objects.get(avatar=id)
    serializer = AvatarSerializer(gettingUsers, many=False)
    return Response(serializer.data)

@api_view(['POST'])
@authentication_classes([])
@permission_classes([])
def addAvatar(request, username):
    newAvatar = request.data
    gettingUsers = User.objects.get(username=username)
    avatar = Avatar.objects.create(
        avatar = newAvatar['img_src'],
        user = gettingUsers,
    )

    serializer = AvatarSerializer(avatar, many=False)
    return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['PUT'])
def editAvatar(request, post_id):
    post = Avatar.objects.get(post_id=post_id)
    updatedPost = request.data
    serializer = AvatarSerializer(post, data=updatedPost)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 



# POSTS
@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def getPosts(request):
    post = BlogPosts.objects.all()
    serializer = BlogSerializer(post, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getPost(request, post_id):
    post = BlogPosts.objects.get(post_id=post_id)
    serializer = BlogSerializer(post, many=False)
    return Response(serializer.data)

@api_view(['POST'])
@authentication_classes([])
@permission_classes([])
def addPost(request):
    newPost = request.data
    gettingUsers = User.objects.get(id=newPost['user'])

    post = BlogPosts.objects.create(
        title = newPost['title'],
        description = newPost['description'],
        img_src = newPost['img_src'],
        user = gettingUsers,
    )

    post.save()
    serializer = BlogSerializer(post, many=False)
    return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['PUT'])
@authentication_classes([])
@permission_classes([])
def editPost(request, post_id):
    updatedPost = request.data
    post = BlogPosts.objects.get(post_id=post_id)
 
    serializer = BlogSerializer(post, data=updatedPost, many=False, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'True'}, status=status.HTTP_201_CREATED)
    else:
        return Response({'message': 'False'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@authentication_classes([])
@permission_classes([])
def deletePost(request, post_id):
    post = BlogPosts.objects.get(post_id=post_id)
    post.delete()
    return Response({'message': '{} Tutorials were deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)



# COMMENTS
@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def getComments(request, pk):
    gettingComment = Comments.objects.filter(post_id=pk)
    serializer = CommentSerializer(gettingComment, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@authentication_classes([])
@permission_classes([])
def addComment(request):
    newComment = request.data

    gettingUsers = User.objects.get(id=newComment['user_id'])
    gettingPost = BlogPosts.objects.get(post_id=newComment['post_id'])

    comment = Comments.objects.create(
        post_id = gettingPost,
        user = gettingUsers,
        comment = newComment['comment'],
    )
    comment.save()
    serializer = CommentSerializer(comment, many=False)
    return Response(serializer.data, status=status.HTTP_201_CREATED)   



@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def getLikes(request, user_id, post_id):
    gettingUsers = User.objects.get(id=user_id)
    gettingPost = BlogPosts.objects.get(post_id=post_id)
    likePost = Likes.objects.get(user=gettingUsers, post_id=gettingPost)
    serialzer = LikesSerializer(likePost, many=True)
    return Response(serialzer.data)

@api_view(['POST'])
@authentication_classes([])
@permission_classes([])
def addLikes(request, user_id, post_id):

    gettingUsers = User.objects.get(id=user_id)
    gettingPost = BlogPosts.objects.get(post_id=post_id)

    likePost = Likes.objects.create(
        post_id = gettingPost,
        user = gettingUsers,
        liked = request.data['liked'],
    )
    likePost.save()
    serializer = LikesSerializer(likePost, many=False, partial=True)
    return Response(serializer.data, status=status.HTTP_201_CREATED) 
    return Response(status=status.HTTP_201_CREATED)