package com.backend.backend.repo;

import com.backend.backend.model.DoctorAvailabality;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DoctorAvailabalityRepo extends JpaRepository<DoctorAvailabality,Long> {
    List<DoctorAvailabality> findByDoctor_id(String doctor_id);
}
