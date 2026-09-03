import {
    Link,
    useNavigate,
} from 'react-router-dom';

import { useAuth } from '../context/AuthContext';

export default function Navbar() {

    const {
        user,
        isAuthenticated,
        logout,
    } = useAuth();

    const navigate =
        useNavigate();

    const handleLogout = () => {

        logout();

        navigate('/login');
    };

    return (
        <nav
            style={{
                padding: 16,
                borderBottom:
                    '1px solid #ddd',
                display: 'flex',
                gap: 16,
                alignItems: 'center',
            }}
        >

            <Link to="/courses">
                Mon hoc
            </Link>

            {/* MENU STUDENT */}
            {isAuthenticated &&
                user?.role === 'STUDENT' && (
                    <>
                        <Link to="/register-course">
                            Dang ky hoc phan
                        </Link>

                        <Link to="/my-registrations">
                            Mon hoc da dang ky
                        </Link>
                    </>
                )}

            {/* MENU ADMIN */}
            {isAuthenticated &&
                user?.role === 'ADMIN' && (
                    <>
                        <Link to="/admin/courses">
                            Quan tri mon hoc
                        </Link>

                        <Link to="/admin/api-keys">
                            Quan ly API Key
                        </Link>
                    </>
                )}

            <div
                style={{
                    marginLeft: 'auto',
                }}
            >

                {isAuthenticated &&
                    user && (
                        <>
                            <span
                                style={{
                                    marginRight: 12,
                                }}
                            >
                                Xin chao, {user.username} (
                                {user.role})
                            </span>

                            <button
                                onClick={
                                    handleLogout
                                }
                            >
                                Dang xuat
                            </button>
                        </>
                    )}

            </div>
        </nav>
    );
}