package com.backend.backend.service;


import com.backend.backend.model.DoctorAvailabality;
import com.backend.backend.repo.DoctorAvailabalityRepo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DoctorAvailabilityService {

    private final DoctorAvailabalityRepo repo;

    public DoctorAvailabilityService(DoctorAvailabalityRepo repo) {
        this.repo = repo;
    }

    public DoctorAvailabality createAvailability(DoctorAvailabality availability) {
        return repo.save(availability);
    }

    public List<DoctorAvailabality> getByDoctorId(String doctorId) {
        return repo.findByDoctor_id(doctorId);
    }

    public List<DoctorAvailabality> getAll() {
        return repo.findAll();
    }

    public DoctorAvailabality updateAvailability(Long id, DoctorAvailabality updated) {

        DoctorAvailabality existing = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Availability not found"));

        existing.setDay_of_week(updated.getDay_of_week());
        existing.setStart_time(updated.getStart_time());
        existing.setEnd_time(updated.getEnd_time());
        existing.setSlot_duration_minutes(updated.getSlot_duration_minutes());
        existing.setIs_active(updated.isIs_active());

        return repo.save(existing);
    }

}
