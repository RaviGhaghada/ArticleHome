from rest_framework import viewsets
from rest_framework import permissions
from articles.models import Article
from .serializers import ArticleSerializer
from rest_framework.response import Response
from rest_framework.decorators import action


class ArticleViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing article instances.
    """
    serializer_class = ArticleSerializer
    queryset = Article.objects.all()

    def get_permissions(self):
        """
        Instantiates and returns the list of permissions that this view requires.
        """
        if self.action in ['list', 'retrieve', 'likes']:
            permission_classes = [permissions.AllowAny]
        else:
            permission_classes = [permissions.IsAuthenticated]
        return [permission() for permission in permission_classes]
    

    @action(detail=True, methods=['post'])
    def togglelike(self, request, pk=None):
        """
        Toggle whether the user likes the article or not
        """
        article = self.get_object()
        likes = article.likes
        user = request.user

        if likes.filter(id=user.id).exists():
            likes.remove(user)
            return Response({'status': 'Success. Unliked article.'})
        else:
            likes.add(user)
            return Response({'status': 'Success. Liked article.'})


    @action(detail=True, methods=['get'])
    def liked(self, request, pk=None):
        """
        Returns True if the user likes this article, else False
        """
        article = self.get_object()
        likes = article.likes
        user = request.user
        result = likes.filter(id=user.id).exists()
        return Response(result);
    
    @action(detail=True, methods=['get'])
    def likes(self, request, pk=None):
        """
        Returns the number of people who liked this post
        """
        article = self.get_object()
        return Response(article.likes.count())