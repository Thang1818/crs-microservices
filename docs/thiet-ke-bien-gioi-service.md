# Thiết kế biên giới Service

## 1. Danh sách Service

| Service | Cổng | Database | Trách nhiệm chính |
|----------|------|----------|-------------------|
| api-gateway | 8080 | Không có DB | Điểm vào duy nhất của hệ thống, định tuyến request, xác thực sơ bộ, cấu hình CORS |
| auth-service | 8081 | auth_db | Quản lý User, Student, đăng nhập, sinh và xác thực JWT |
| course-service | 8082 | course_db | Quản lý môn học (Course), tìm kiếm, phân trang, quản lý số chỗ còn lại |
| registration-service | 8083 | registration_db | Quản lý đăng ký học phần, gọi sang course-service để kiểm tra và giữ chỗ |

---

## 2. Nguyên tắc sở hữu dữ liệu (Data Ownership)

- Mỗi service có một database riêng.
- Không service nào được truy cập trực tiếp database của service khác.
- Muốn lấy hoặc cập nhật dữ liệu của service khác phải gọi thông qua REST API.
- Mỗi service chỉ chịu trách nhiệm quản lý dữ liệu của chính mình.

### Ví dụ

- `registration-service` **không có bảng Course**.
- `registration-service` chỉ lưu `courseId`.
- Khi sinh viên đăng ký học phần, `registration-service` sẽ gọi REST API sang `course-service` để:
    - Kiểm tra môn học còn chỗ hay không.
    - Giảm số chỗ còn lại nếu đăng ký thành công.

---

## 3. Bảng định tuyến Gateway

| Route | Forward tới | Ghi chú |
|--------|-------------|---------|
| /api/auth/** | http://localhost:8081 | Login public, các API khác yêu cầu JWT |
| /api/courses/** | http://localhost:8082 | GET public, POST/PUT/DELETE yêu cầu ADMIN |
| /api/registrations/** | http://localhost:8083 | Yêu cầu JWT (STUDENT hoặc ADMIN) |
| /api/public/courses | http://localhost:8082 | Dùng API Key cho đối tác ngoài |