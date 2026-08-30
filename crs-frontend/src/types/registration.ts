export interface Registration {
    id: number;
    studentId: number;
    courseId: number;
    ngayDangKy: string;
    trangThai: string;
}

export interface RegistrationRequest {
    studentId: number;
    courseId: number;
}