package com.backend.backend.controller;

//package com.backend.backend.controller;

import com.backend.backend.model.DoctorAvailabality;
import com.backend.backend.service.DoctorAvailabilityService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/availability")
@CrossOrigin(origins = "http://localhost:3000")
public class DoctorAvailabilityController {

    private final DoctorAvailabilityService service;

    public DoctorAvailabilityController(DoctorAvailabilityService service) {
        this.service = service;
    }

    // Create availability
    @PostMapping
    public DoctorAvailabality createAvailability(@RequestBody DoctorAvailabality availability) {
        return service.createAvailability(availability);
    }

    // Get availability by doctor
    @GetMapping("/{doctorId}")
    public List<DoctorAvailabality> getByDoctorId(@PathVariable String doctorId) {
        return service.getByDoctorId(doctorId);
    }

    // Get all availability
    @GetMapping
    public List<DoctorAvailabality> getAll() {
        return service.getAll();
    }

    // Update availability
    @PutMapping("/{id}")
    public DoctorAvailabality updateAvailability(
            @PathVariable Long id,
            @RequestBody DoctorAvailabality availability
    ) {
        return service.updateAvailability(id, availability);
    }
}
