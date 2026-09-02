package vn.edu.crs.registrationservice.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import vn.edu.crs.registrationservice.dto.RegistrationRequestDTO;
import vn.edu.crs.registrationservice.entity.Registration;
import vn.edu.crs.registrationservice.service.RegistrationService;

import java.util.List;

@RestController
@RequestMapping("/registrations")
@RequiredArgsConstructor
public class RegistrationController {

    private final RegistrationService registrationService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Registration register(
            @RequestBody RegistrationRequestDTO dto
    ) {

        return registrationService.register(dto);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void cancel(
            @PathVariable Long id
    ) {

        registrationService.cancel(id);
    }

    @GetMapping("/my")
    public List<Registration> getMyRegistrations(
            Authentication authentication
    ) {

        Long studentId =
                (Long) authentication.getCredentials();

        return registrationService
                .getMyRegistrations(studentId);
    }
}