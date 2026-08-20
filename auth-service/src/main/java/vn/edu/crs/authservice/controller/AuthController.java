package vn.edu.crs.authservice.controller;

import vn.edu.crs.authservice.dto.LoginRequestDTO;
import vn.edu.crs.authservice.dto.LoginResponseDTO;
import vn.edu.crs.authservice.service.AuthService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(
            @RequestBody LoginRequestDTO request
    ) {
        return ResponseEntity.ok(
                authService.login(request)
        );
    }
}