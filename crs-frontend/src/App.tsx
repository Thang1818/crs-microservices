import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom';

import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

import LoginPage from './pages/LoginPage';
import CoursesPage from './pages/CoursesPage';
import AdminCoursesPage from './pages/AdminCoursesPage';
import RegisterCoursePage from './pages/RegisterCoursePage';
import MyRegistrationsPage from './pages/MyRegistrationsPage';
import ApiKeysPage from './pages/ApiKeysPage';

export default function App() {
    return (
        <BrowserRouter>
            <Navbar />

            <Routes>

                {/* Trang đăng nhập */}
                <Route
                    path="/login"
                    element={<LoginPage />}
                />

                {/* Danh sách môn học */}
                <Route
                    path="/courses"
                    element={<CoursesPage />}
                />

                {/* Quản trị môn học - ADMIN */}
                <Route
                    path="/admin/courses"
                    element={
                        <ProtectedRoute requiredRole="ADMIN">
                            <AdminCoursesPage />
                        </ProtectedRoute>
                    }
                />

                {/* Quản lý API Key - ADMIN */}
                <Route
                    path="/admin/api-keys"
                    element={
                        <ProtectedRoute requiredRole="ADMIN">
                            <ApiKeysPage />
                        </ProtectedRoute>
                    }
                />

                {/* Đăng ký học phần - STUDENT */}
                <Route
                    path="/register-course"
                    element={
                        <ProtectedRoute requiredRole="STUDENT">
                            <RegisterCoursePage />
                        </ProtectedRoute>
                    }
                />

                {/* Môn học đã đăng ký - STUDENT */}
                <Route
                    path="/my-registrations"
                    element={
                        <ProtectedRoute requiredRole="STUDENT">
                            <MyRegistrationsPage />
                        </ProtectedRoute>
                    }
                />

                {/* Mở localhost:5173/ thì chuyển sang login */}
                <Route
                    path="/"
                    element={
                        <Navigate
                            to="/login"
                            replace
                        />
                    }
                />

                {/* URL không tồn tại cũng chuyển về login */}
                <Route
                    path="*"
                    element={
                        <Navigate
                            to="/login"
                            replace
                        />
                    }
                />

            </Routes>
        </BrowserRouter>
    );
}