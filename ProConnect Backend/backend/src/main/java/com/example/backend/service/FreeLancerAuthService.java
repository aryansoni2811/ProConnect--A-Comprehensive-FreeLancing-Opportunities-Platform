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

import com.example.backend.entity.Skill;
import com.example.backend.repository.SkillRepository;
import java.util.List;

import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class FreeLancerAuthService {

    @Autowired
    private FreelancerRepository freelancerRepository;

    @Autowired
    private SkillRepository skillRepository;

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

    public List<Skill> getFreelancerSkills(Long freelancerId) {
        return skillRepository.findByFreelancerId(freelancerId);
    }

    public Skill addSkillToFreelancer(Long freelancerId, String name, String proficiency) {
        Freelancer freelancer = freelancerRepository.findById(freelancerId)
                .orElseThrow(() -> new RuntimeException("Freelancer not found"));

        Skill skill = new Skill();
        skill.setName(name);
        skill.setProficiency(proficiency);
        skill.setFreelancer(freelancer);

        return skillRepository.save(skill);
    }

    public void removeSkillFromFreelancer(Long freelancerId, Long skillId) {
        Skill skill = skillRepository.findById(skillId)
                .orElseThrow(() -> new RuntimeException("Skill not found"));

        if (!skill.getFreelancer().getId().equals(freelancerId)) {
            throw new RuntimeException("Skill does not belong to this freelancer");
        }

        skillRepository.delete(skill);
    }

    public List<Freelancer> findFreelancersBySkill(String skillName) {
        List<Skill> skills = skillRepository.findByNameContainingIgnoreCase(skillName);
        return skills.stream()
                .map(Skill::getFreelancer)
                .distinct()
                .collect(Collectors.toList());
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