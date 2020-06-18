from django.urls import path

from .views import ArticleDetailView, ArticleListView, ArticleCreateView

urlpatterns = [
    path('', ArticleListView.as_view()),
    path('create/', ArticleCreateView.as_view()),
    path('<pk>', ArticleDetailView.as_view())

]