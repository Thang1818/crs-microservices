package vn.edu.crs.courseservice.service;

import vn.edu.crs.courseservice.dto.CourseDTO;
import vn.edu.crs.courseservice.entity.Course;
import vn.edu.crs.courseservice.repository.CourseRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class CourseService {

    private final CourseRepository courseRepository;

    // =====================================================
    // GET ALL - phân trang
    // =====================================================

    public Page<CourseDTO> search(String keyword, Pageable pageable) {

        Page<Course> page;

        if (keyword == null || keyword.isBlank()) {
            page = courseRepository.findAll(pageable);
        } else {
            page = courseRepository
                    .findByTenMonHocContainingIgnoreCase(keyword, pageable);
        }

        return page.map(this::toDTO);
    }

    // =====================================================
    // GET BY ID
    // =====================================================

    public CourseDTO getById(Long id) {

        Course course = courseRepository.findById(id)
                .orElseThrow(() ->
                        new NoSuchElementException(
                                "Khong tim thay mon hoc id = " + id
                        )
                );

        return toDTO(course);
    }

    // =====================================================
    // CREATE
    // =====================================================

    public CourseDTO create(CourseDTO dto) {

        if (courseRepository.existsByTenMonHocIgnoreCase(dto.getTenMonHoc())) {
            throw new IllegalStateException(
                    "Mon hoc da ton tai: " + dto.getTenMonHoc()
            );
        }

        Course course = new Course();

        course.setTenMonHoc(dto.getTenMonHoc());
        course.setSoTinChi(dto.getSoTinChi());
        course.setSoChoToiDa(dto.getSoChoToiDa());
        course.setSoChoConLai(dto.getSoChoToiDa());

        return toDTO(courseRepository.save(course));
    }

    // =====================================================
    // UPDATE
    // =====================================================

    public CourseDTO update(Long id, CourseDTO dto) {

        Course course = courseRepository.findById(id)
                .orElseThrow(() ->
                        new NoSuchElementException(
                                "Khong tim thay mon hoc id = " + id
                        )
                );

        course.setTenMonHoc(dto.getTenMonHoc());
        course.setSoTinChi(dto.getSoTinChi());

        if (dto.getSoChoToiDa() != null) {

            int daDangKy =
                    course.getSoChoToiDa() - course.getSoChoConLai();

            int choToiDaMoi = dto.getSoChoToiDa();

            if (choToiDaMoi < daDangKy) {
                throw new IllegalStateException(
                        "So cho toi da moi khong du de giu cac dang ky hien tai"
                );
            }

            course.setSoChoToiDa(choToiDaMoi);
            course.setSoChoConLai(choToiDaMoi - daDangKy);
        }

        return toDTO(courseRepository.save(course));
    }

    // =====================================================
    // DELETE
    // =====================================================

    public void delete(Long id) {

        Course course = courseRepository.findById(id)
                .orElseThrow(() ->
                        new NoSuchElementException(
                                "Khong tim thay mon hoc id = " + id
                        )
                );

        courseRepository.delete(course);
    }

    // =====================================================
    // RESERVE SEAT
    // =====================================================

    @Transactional
    public CourseDTO reserveSeat(Long courseId) {

        Course course = courseRepository.findById(courseId)
                .orElseThrow(() ->
                        new NoSuchElementException(
                                "Khong tim thay mon hoc id = " + courseId
                        )
                );

        if (course.getSoChoConLai() <= 0) {
            throw new IllegalStateException(
                    "Mon hoc da het cho, khong the dang ky"
            );
        }

        course.setSoChoConLai(
                course.getSoChoConLai() - 1
        );

        return toDTO(courseRepository.save(course));
    }

    // =====================================================
    // RELEASE SEAT
    // =====================================================

    @Transactional
    public CourseDTO releaseSeat(Long courseId) {

        Course course = courseRepository.findById(courseId)
                .orElseThrow(() ->
                        new NoSuchElementException(
                                "Khong tim thay mon hoc id = " + courseId
                        )
                );

        if (course.getSoChoConLai() < course.getSoChoToiDa()) {

            course.setSoChoConLai(
                    course.getSoChoConLai() + 1
            );
        }

        return toDTO(courseRepository.save(course));
    }

    // =====================================================
    // CONVERT ENTITY -> DTO
    // =====================================================

    private CourseDTO toDTO(Course course) {

        return new CourseDTO(
                course.getId(),
                course.getTenMonHoc(),
                course.getSoTinChi(),
                course.getSoChoToiDa(),
                course.getSoChoConLai()
        );
    }
}