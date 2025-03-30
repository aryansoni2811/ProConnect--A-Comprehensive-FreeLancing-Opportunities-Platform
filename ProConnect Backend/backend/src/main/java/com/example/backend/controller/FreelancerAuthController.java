package com.example.backend.controller;

import com.example.backend.service.FreeLancerAuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.backend.dto.AuthResponseDTO;
import com.example.backend.dto.FreelancerLoginDTO;
import com.example.backend.dto.FreelancerSignupDTO;
import com.example.backend.service.AuthService;

@RestController
@RequestMapping("/api/auth/freelancer")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class FreelancerAuthController {

    @Autowired
    private FreeLancerAuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<AuthResponseDTO> freelancerSignup(@RequestBody FreelancerSignupDTO signupDTO) {
        try {
            AuthResponseDTO response = authService.freelancerSignup(signupDTO);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(500)
                    .body(new AuthResponseDTO(null, "Error during signup: " + e.getMessage(), false));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> freelancerLogin(@RequestBody FreelancerLoginDTO loginDTO) {
        try {
            AuthResponseDTO response = authService.freelancerLogin(loginDTO);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(500)
                    .body(new AuthResponseDTO(null, "Error during login: " + e.getMessage(), false));
        }
    }
}