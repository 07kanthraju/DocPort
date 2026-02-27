package com.backend.backend.repo;

import com.backend.backend.model.DoctorLogin;
import com.backend.backend.service.DoctorLoginService;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DoctorLoginRepo extends JpaRepository<DoctorLogin, Long> {
}
