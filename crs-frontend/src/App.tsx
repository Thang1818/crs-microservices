import { useState } from 'react';

import { useCourses } from './api/useCourses';

import SearchBox from './components/SearchBox';
import CourseList from './components/CourseList';
import Pagination from './components/Pagination';

function App() {
    // Từ khóa tìm kiếm
    const [keyword, setKeyword] = useState('');

    // Spring Pageable bắt đầu từ 0
    const [page, setPage] = useState(0);

    // Gọi custom hook
    const {
        courses,
        totalPages,
        state,
        errorMessage,
        refetch,
    } = useCourses(keyword, page);

    // Xử lý tìm kiếm
    const handleSearch = (newKeyword: string) => {
        setKeyword(newKeyword);

        // Mỗi lần tìm kiếm mới quay về trang đầu
        setPage(0);
    };

    return (
        <div
            style={{
                padding: 24,
                fontFamily: 'sans-serif',
                maxWidth: 800,
                margin: '0 auto',
            }}
        >
            <h1>Danh sach mon hoc</h1>

            {/* Ô tìm kiếm */}
            <SearchBox
                onSearch={handleSearch}
            />

            {/* Danh sách môn học */}
            <div style={{ marginTop: 16 }}>
                <CourseList
                    courses={courses}
                    state={state}
                    errorMessage={errorMessage}
                    onRetry={refetch}
                />
            </div>

            {/* Phân trang */}
            <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
            />
        </div>
    );
}

export default App;