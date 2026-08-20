package vn.edu.crs.registrationservice.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import vn.edu.crs.registrationservice.dto.RegistrationRequestDTO;
import vn.edu.crs.registrationservice.entity.Registration;
import vn.edu.crs.registrationservice.service.RegistrationService;

import java.util.Map;

@RestController
@RequestMapping("/registrations")
@RequiredArgsConstructor
public class RegistrationController {

    private final RegistrationService registrationService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Registration register(
            @Valid @RequestBody RegistrationRequestDTO dto
    ) {
        return registrationService.register(dto);
    }

    @DeleteMapping("/{id}")
    public Map<String, String> cancel(
            @PathVariable Long id
    ) {
        registrationService.cancel(id);

        return Map.of(
                "message",
                "Da huy dang ky thanh cong"
        );
    }
}