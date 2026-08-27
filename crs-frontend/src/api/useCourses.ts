import {
    useState,
    useEffect,
    useCallback,
} from 'react';

import { getCourses } from './courseApi';

import type { Course } from '../types/course';
import type { ApiErrorResponse } from '../types/apiError';

import axios from 'axios';

export type LoadState =
    | 'loading'
    | 'success'
    | 'empty'
    | 'error';

export function useCourses(
    keyword: string,
    page: number,
    size = 10
) {
    // Danh sách môn học
    const [courses, setCourses] =
        useState<Course[]>([]);

    // Tổng số trang
    const [totalPages, setTotalPages] =
        useState(0);

    // Trạng thái hiện tại
    const [state, setState] =
        useState<LoadState>('loading');

    // Nội dung lỗi
    const [errorMessage, setErrorMessage] =
        useState('');

    // Hàm gọi API
    const fetchCourses = useCallback(() => {

        // Mỗi lần gọi API -> Loading
        setState('loading');

        getCourses(keyword, page, size)

            .then((res) => {

                const data = res.data;

                // Lưu danh sách môn học
                setCourses(data.content);

                // Lưu tổng số trang
                setTotalPages(data.totalPages);

                // Có dữ liệu -> Success
                // Không có dữ liệu -> Empty
                if (data.content.length === 0) {
                    setState('empty');
                } else {
                    setState('success');
                }
            })

            .catch((err) => {

                let message =
                    'Da xay ra loi khong xac dinh, vui long thu lai.';

                // Kiểm tra lỗi Axios
                if (
                    axios.isAxiosError<ApiErrorResponse>(err)
                ) {

                    // Backend/Gateway có trả response
                    if (err.response?.data?.message) {

                        message =
                            err.response.data.message;

                    }

                    // Không nhận được response
                    else if (!err.response) {

                        message =
                            'Khong ket noi duoc toi he thong. Vui long thu lai sau.';
                    }
                }

                setErrorMessage(message);

                setState('error');
            });

    }, [keyword, page, size]);

    // Tự động gọi API khi keyword/page/size thay đổi
    useEffect(() => {

        fetchCourses();

    }, [fetchCourses]);

    return {
        courses,
        totalPages,
        state,
        errorMessage,

        // Dùng cho nút "Thử lại"
        refetch: fetchCourses,
    };
}