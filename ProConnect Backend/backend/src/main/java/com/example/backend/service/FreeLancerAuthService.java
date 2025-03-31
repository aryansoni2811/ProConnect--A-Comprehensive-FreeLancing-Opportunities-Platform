package com.example.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.backend.dto.AuthResponseDTO;
import com.example.backend.dto.FreelancerLoginDTO;
import com.example.backend.dto.FreelancerSignupDTO;
import com.example.backend.entity.Freelancer;
import com.example.backend.repository.FreelancerRepository;
import com.example.backend.security.JwtUtil;

import java.util.Optional;

@Service
public class FreeLancerAuthService {

    @Autowired
    private FreelancerRepository freelancerRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    public AuthResponseDTO freelancerSignup(FreelancerSignupDTO signupDTO) {
        if (freelancerRepository.existsByEmail(signupDTO.getEmail())) {
            return new AuthResponseDTO(null, "Email already registered", false);
        }

        Freelancer freelancer = new Freelancer();
        freelancer.setName(signupDTO.getName());
        freelancer.setEmail(signupDTO.getEmail());
        freelancer.setPassword(passwordEncoder.encode(signupDTO.getPassword()));

        freelancerRepository.save(freelancer);

        String token = jwtUtil.generateToken(freelancer.getEmail());
        return new AuthResponseDTO(token, "Freelancer signup successful", true);
    }

    public Freelancer findFreelancerByEmail(String email) {
        return freelancerRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Freelancer not found"));
    }

    public AuthResponseDTO freelancerLogin(FreelancerLoginDTO loginDTO) {
        Optional<Freelancer> optionalFreelancer = freelancerRepository.findByEmail(loginDTO.getEmail());

        if (optionalFreelancer.isEmpty()) {
            return new AuthResponseDTO(null, "Invalid email or password", false);
        }

        Freelancer freelancer = optionalFreelancer.get();

        if (!passwordEncoder.matches(loginDTO.getPassword(), freelancer.getPassword())) {
            return new AuthResponseDTO(null, "Invalid email or password", false);
        }

        String token = jwtUtil.generateToken(freelancer.getEmail());
        return new AuthResponseDTO(token, "Freelancer login successful", true);
    }
}