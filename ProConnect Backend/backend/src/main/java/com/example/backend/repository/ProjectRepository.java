package com.example.backend.repository;

import com.example.backend.entity.Project;
import com.example.backend.entity.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    List<Project> findByClient(Client client);
    List<Project> findByClientOrderByCreatedAtDesc(Client client);
    List<Project> findByRequiredSkillsContainingIgnoreCase(String skill);
}