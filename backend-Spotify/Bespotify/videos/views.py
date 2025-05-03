from rest_framework import viewsets
from .models import Video
from .serializers import VideoSerializer

class VideoViewSet(viewsets.ModelViewSet):
    queryset = Video.objects.all()  # Lấy tất cả các video
    serializer_class = VideoSerializer  # Sử dụng VideoSerializer để chuyển đổi dữ liệu
    permission_classes = []
    
    def get_queryset(self):
        # Nếu có tham số 'id' trong URL, chỉ lấy video theo id đó
        video_id = self.kwargs.get('pk')  # 'pk' là mặc định cho id trong URL
        if video_id:
            return Video.objects.filter(id=video_id)  # Lấy video theo id
        return Video.objects.all()  # Nếu không có id, lấy tất cả video  