# Blueprint API

## auth-service (Port 8081)

| Method | Endpoint | Mô tả | Yêu cầu |
|---------|----------|-------|----------|
| POST | /auth/login | Đăng nhập và trả về JWT | Public |
| POST | /auth/register | Đăng ký tài khoản | Public |

---

## course-service (Port 8082)

| Method | Endpoint | Mô tả | Yêu cầu |
|---------|----------|-------|----------|
| GET | /courses | Lấy danh sách môn học (có tìm kiếm và phân trang) | Public |
| GET | /courses/{id} | Lấy thông tin chi tiết môn học | Public |
| POST | /courses | Thêm môn học mới | ADMIN |
| PUT | /courses/{id} | Cập nhật môn học | ADMIN |
| DELETE | /courses/{id} | Xóa môn học | ADMIN |

### API nội bộ

| Method | Endpoint | Mô tả |
|---------|----------|-------|
| PATCH | /internal/courses/{id}/reserve-seat | Kiểm tra còn chỗ và giảm số chỗ còn lại |
| PATCH | /internal/courses/{id}/release-seat | Hoàn trả một chỗ khi hủy đăng ký |

---

## registration-service (Port 8083)

| Method | Endpoint | Mô tả | Yêu cầu |
|---------|----------|-------|----------|
| POST | /registrations | Đăng ký học phần | STUDENT |
| GET | /registrations/my | Xem danh sách học phần đã đăng ký | STUDENT |
| DELETE | /registrations/{id} | Hủy đăng ký học phần | STUDENT hoặc ADMIN |