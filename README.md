# 🎵 Ứng dụng Nghe Nhạc và Nhắn Tin

Ứng dụng cho phép người dùng nghe nhạc trực tuyến, thêm bài hát vào danh sách yêu thích, kết bạn và nhắn tin thời gian thực.

## 🔧 Công nghệ sử dụng
- Django REST Framework
- WebSocket (Django Channels)
- ReactJS
- PostgreSQL

## 🚀 Cách cài đặt

```bash
# 1. Clone repo
git clone https://github.com/datmaithanh/music-chat-app.git
cd music-chat-app

# 2. Cài backend
cd backend
pip install -r requirements.txt
python manage.py runserver

# 3. Cài frontend
cd ../frontend
npm install
npm run dev
