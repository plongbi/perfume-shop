🌸 Perfume Shop (Cửa Hàng Nước Hoa Trực Tuyến)

Đây là một dự án website bán nước hoa Fullstack, bao gồm giao diện người dùng (Frontend) và máy chủ xử lý dữ liệu (Backend).

✨ Tính năng nổi bật

Dành cho khách hàng: Khám phá chi tiết các loại nước hoa, thêm vào giỏ hàng (CartContext), đăng ký/đăng nhập, và thanh toán trực tuyến dễ dàng qua cổng VNPay.
Dành cho quản trị (Admin): Trang quản trị riêng biệt giúp quản lý sản phẩm, tài khoản người dùng và theo dõi đơn hàng.

🛠 Công nghệ sử dụng
Frontend: ReactJS (build bằng Vite).
Backend: Node.js.
Cơ sở dữ liệu: Hệ quản trị CSDL hỗ trợ các Models (User, Product, Order) - thường là MongoDB.

🚀 Hướng dẫn cài đặt và chạy dự án

Để chạy dự án này trên máy của bạn, hãy làm theo các bước sau:

Bước 1: Khởi động Server (Backend)

Mở terminal, di chuyển vào thư mục server và cài đặt các gói phụ thuộc:
cd server
npm install
Lưu ý: Hãy chắc chắn bạn đã cấu hình các biến môi trường trong file .env (như thông tin database, key kết nối VNPay).
Bạn cũng có thể chạy node seedProducts.js để tạo dữ liệu mẫu ban đầu.

Khởi động server:
npm start 
# hoặc node server.js

Bước 2: Khởi động Giao diện (Frontend)
Mở một cửa sổ terminal mới ở thư mục gốc của dự án:
npm install
npm run dev
Sau khi chạy lệnh trên, ứng dụng sẽ cung cấp một đường dẫn (thường là http://localhost:5173). Bạn hãy nhấp vào đó để trải nghiệm website.
