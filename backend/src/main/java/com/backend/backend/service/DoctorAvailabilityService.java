package com.backend.backend.service;

import com.backend.backend.model.DoctorAvailability;
import com.backend.backend.repo.DoctorAvailabilityRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class DoctorAvailabilityService {

    @Autowired
    private DoctorAvailabilityRepo availabilityRepo;

    // Save / create a new availability slot (isAvailable defaults to true in the model)
    public DoctorAvailability saveAvailability(DoctorAvailability availability) {
        return availabilityRepo.save(availability);
    }

    // Fetch a single slot by its own ID
    public DoctorAvailability getById(Long id) {
        return availabilityRepo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Availability slot not found: " + id));
    }

    // Get all slots for a doctor
    public List<DoctorAvailability> getAvailabilityByDoctorId(Long doctorId) {
        return availabilityRepo.findByDoctorId(doctorId);
    }

    // Get all slots across all doctors
    public List<DoctorAvailability> getAllAvailability() {
        return availabilityRepo.findAll();
    }

    // Doctor marks a slot as unavailable (e.g. going on leave)
    // This is what blocks bookings in the patient-facing / third-party apps
    public DoctorAvailability markUnavailable(Long id) {
        DoctorAvailability slot = getById(id);
        slot.setAvailable(false);
        return availabilityRepo.save(slot);
    }

    // Doctor reopens a slot that was previously blocked
    public DoctorAvailability markAvailable(Long id) {
        DoctorAvailability slot = getById(id);
        slot.setAvailable(true);
        return availabilityRepo.save(slot);
    }
}