import axios from 'axios';

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Tự động lấy JWT và gửi kèm mỗi request
axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('crs_token');

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default axiosClient;