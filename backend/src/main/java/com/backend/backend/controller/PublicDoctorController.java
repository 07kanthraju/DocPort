package com.backend.backend.controller;

import com.backend.backend.model.Doctor;
import com.backend.backend.model.DoctorAvailability;
import com.backend.backend.model.DoctorInsuranceConsent;
import com.backend.backend.repo.DoctorAvailabilityRepo;
import com.backend.backend.repo.DoctorInsuranceConsentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Public, read-only endpoints consumed by third-party patient apps (e.g. insurer's patient portal).
 * No authentication required — these routes must be explicitly permitted in your Security config.
 *
 * Security config example (Spring Security):
 *   .requestMatchers("/api/public/**").permitAll()
 */
@RestController
@RequestMapping("/api/public")
@CrossOrigin(origins = "*")
public class PublicDoctorController {

    @Autowired
    private DoctorInsuranceConsentRepo consentRepo;

    @Autowired
    private DoctorAvailabilityRepo availabilityRepo;

    /**
     * GET /api/public/doctors/available?providerId={id}
     *
     * Returns all doctors who:
     *  1. Have an ACTIVE consent with the given insurance provider
     *  2. Have at least one slot where isAvailable = true
     *
     * The patient app calls this to build its "choose a doctor" list.
     */
    @GetMapping("/doctors/available")
    public List<Doctor> getAvailableDoctors(@RequestParam Long providerId) {
        return consentRepo.findByProvider_Id(providerId)
                .stream()
                .filter(c -> "ACTIVE".equals(c.getStatus()))
                .map(DoctorInsuranceConsent::getDoctor)
                .filter(doctor -> {
                    List<DoctorAvailability> slots =
                            availabilityRepo.findByDoctorId(doctor.getDoctorId());
                    return slots.stream().anyMatch(DoctorAvailability::isAvailable);
                })
                .collect(Collectors.toList());
    }

    /**
     * GET /api/public/doctors/{doctorId}/slots?providerId={id}
     *
     * Returns the available time slots for a specific doctor,
     * but only if that doctor has an ACTIVE tie-up with the given provider.
     * The patient app uses this to show bookable slots.
     */
    @GetMapping("/doctors/{doctorId}/slots")
    public List<DoctorAvailability> getAvailableSlots(
            @PathVariable Long doctorId,
            @RequestParam Long providerId) {

        // Verify the tie-up is ACTIVE before exposing any slot data
        boolean consented = consentRepo.findByDoctor_DoctorId(doctorId)
                .stream()
                .anyMatch(c -> c.getProvider().getId().equals(providerId)
                        && "ACTIVE".equals(c.getStatus()));

        if (!consented) {
            return List.of(); // return empty — do not expose slot data for unlinked doctors
        }

        return availabilityRepo.findByDoctorId(doctorId)
                .stream()
                .filter(DoctorAvailability::isAvailable)
                .collect(Collectors.toList());
    }
}