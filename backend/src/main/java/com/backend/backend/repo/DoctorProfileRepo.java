package com.backend.backend.repo;

import com.backend.backend.model.DoctorProfile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DoctorProfileRepo extends JpaRepository<DoctorProfile, Long> {

    DoctorProfile findByUserId(Long userId);

}