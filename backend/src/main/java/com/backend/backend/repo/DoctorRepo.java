package com.backend.backend.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.backend.model.Doctor;

public interface DoctorRepo extends JpaRepository<Doctor, Long> {
}


