package com.backend.backend.repo;

import com.backend.backend.model.DoctorProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DoctorProfileRepo extends JpaRepository<DoctorProfile, Long> {
    DoctorProfile findByUserId(Long userId);
}