from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, AllowAny
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

    # def get_permissions(self):
    #     """
    #     Instantiates and returns the list of permissions that this view requires.
    #     """
    #     if self.action == 'list' or self.action == 'retrieve':
    #         permission_classes = [AllowAny]
    #     else:
    #         permission_classes = [IsAuthenticated]
    #     return [permission() for permission in permission_classes]
    
    # @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    # def like(self, request, pk=None):
    #     article = self.get_object()
    #     logged_in_user = request
    #     print("SAY WHAT?")
    #     print(logged_in_user.user.id)
    #     return Response({'status': 'password set'})
