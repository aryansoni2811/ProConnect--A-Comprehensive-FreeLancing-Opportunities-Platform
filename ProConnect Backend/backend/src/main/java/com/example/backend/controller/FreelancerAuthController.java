package com.example.backend.controller;

import com.example.backend.entity.Freelancer;
import com.example.backend.service.FreeLancerAuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.backend.dto.AuthResponseDTO;
import com.example.backend.dto.FreelancerLoginDTO;
import com.example.backend.dto.FreelancerSignupDTO;

import com.example.backend.entity.Skill;
import java.util.List;
import java.util.logging.Logger;

@RestController
@RequestMapping("/api/auth/freelancer")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class FreelancerAuthController {

    @Autowired
    private FreeLancerAuthService authService;

    // Fix: Properly initialize the logger
    private static final Logger logger = Logger.getLogger(FreelancerAuthController.class.getName());

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

    @GetMapping("/freelancer")
    public ResponseEntity<?> getFreelancerByEmail(@RequestParam String email) {
        try {
            Freelancer freelancer = authService.findFreelancerByEmail(email);
            if (freelancer == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Freelancer not found");
            }
            return ResponseEntity.ok(freelancer);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error fetching freelancer: " + e.getMessage());
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

    @GetMapping("/{freelancerId}/skills")
    public ResponseEntity<List<Skill>> getFreelancerSkills(@PathVariable Long freelancerId) {
        try {
            List<Skill> skills = authService.getFreelancerSkills(freelancerId);
            return ResponseEntity.ok(skills);
        } catch (Exception e) {
            logger.severe("Error getting freelancer skills: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/{freelancerId}/skills")
    public ResponseEntity<Skill> addSkill(
            @PathVariable Long freelancerId,
            @RequestParam String name,
            @RequestParam String proficiency) {
        try {
            Skill skill = authService.addSkillToFreelancer(freelancerId, name, proficiency);
            return ResponseEntity.ok(skill);
        } catch (Exception e) {
            logger.severe("Error adding skill: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/{freelancerId}/skills/{skillId}")
    public ResponseEntity<Void> removeSkill(
            @PathVariable Long freelancerId,
            @PathVariable Long skillId) {
        try {
            authService.removeSkillFromFreelancer(freelancerId, skillId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            logger.severe("Error removing skill: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/search")
    public ResponseEntity<?> searchFreelancersBySkill(@RequestParam String skill) {
        logger.info("Searching freelancers with skill: " + skill);
        try {
            if (skill == null || skill.trim().isEmpty()) {
                return ResponseEntity.badRequest().body("Skill parameter cannot be empty");
            }

            List<Freelancer> freelancers = authService.findFreelancersBySkill(skill);
            logger.info("Found " + freelancers.size() + " freelancers with skill: " + skill);
            return ResponseEntity.ok(freelancers);
        } catch (Exception e) {
            logger.severe("Error searching freelancers by skill: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error searching freelancers: " + e.getMessage());
        }
    }
}