"""
URL configuration for roofio project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from onTheRoof.views import registerUser as register_views
from django.views.generic import TemplateView
from django.conf.urls.static import static
from django.conf import settings
from rest_framework_simplejwt import views as jwt_views
# from administration import views as ad_views
from rest_framework.routers import DefaultRouter
from django.contrib.auth import views as auth_views
# from users import views as user_views

# router = DefaultRouter()
# router.register(r'admin', ad_views.CurrentUserViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('onTheRoof.urls')),
    path('api/users/', include('django.contrib.auth.urls')),
    path('', TemplateView.as_view(template_name='index.html')),
    path('api-auth/', include('rest_framework.urls')),
    path('token/', jwt_views.TokenObtainPairView.as_view(), name ='token_obtain_pair'),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name ='token_refresh'),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
