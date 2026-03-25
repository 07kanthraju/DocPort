package com.backend.backend.repo;

import com.backend.backend.model.Appointments;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AppointmentRepo extends JpaRepository<Appointments, Long> {
}
