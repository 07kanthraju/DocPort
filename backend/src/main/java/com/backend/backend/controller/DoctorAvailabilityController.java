package com.backend.backend.controller;

import com.backend.backend.model.DoctorAvailability;
import com.backend.backend.service.DoctorAvailabilityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/availability")
@CrossOrigin(origins = "http://localhost:3000")
public class DoctorAvailabilityController {

    @Autowired
    private DoctorAvailabilityService availabilityService;

    // POST /api/availability
    // Doctor creates a new availability slot — isAvailable is true by default
    @PostMapping
    public DoctorAvailability createAvailability(@RequestBody DoctorAvailability availability) {
        return availabilityService.saveAvailability(availability);
    }

    // GET /api/availability
    // Returns all slots across all doctors
    @GetMapping
    public List<DoctorAvailability> getAllAvailability() {
        return availabilityService.getAllAvailability();
    }

    // GET /api/availability/doctor/{doctorId}
    // Returns all slots for a specific doctor (used by doctor app and third-party patient app)
    @GetMapping("/doctor/{doctorId}")
    public List<DoctorAvailability> getDoctorAvailability(@PathVariable Long doctorId) {
        return availabilityService.getAvailabilityByDoctorId(doctorId);
    }

    // GET /api/availability/{id}
    // Returns a single availability slot by its own ID
    @GetMapping("/{id}")
    public DoctorAvailability getById(@PathVariable Long id) {
        return availabilityService.getById(id);
    }

    // PUT /api/availability/{id}/unavailable
    // Doctor marks a slot as unavailable — this blocks bookings in patient apps for that slot
    @PutMapping("/{id}/unavailable")
    public DoctorAvailability markUnavailable(@PathVariable Long id) {
        return availabilityService.markUnavailable(id);
    }

    // PUT /api/availability/{id}/available
    // Doctor reopens a previously blocked slot
    @PutMapping("/{id}/available")
    public DoctorAvailability markAvailable(@PathVariable Long id) {
        return availabilityService.markAvailable(id);
    }
}