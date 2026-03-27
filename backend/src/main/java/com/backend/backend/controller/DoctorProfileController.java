package com.backend.backend.controller;

import com.backend.backend.model.DoctorProfile;
import com.backend.backend.service.DoctorProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/profile")
@CrossOrigin(origins = "http://localhost:3000")
public class DoctorProfileController {

    @Autowired
    private DoctorProfileService doctorProfileService;

    // GET /api/profile/{userId}
    // Fetch a doctor's profile by their user account ID
    @GetMapping("/{userId}")
    public DoctorProfile getProfile(@PathVariable Long userId) {
        return doctorProfileService.getByUserId(userId);
    }

    // POST /api/profile
    // Manually create a profile (normally auto-created on signup for doctor role)
    @PostMapping
    public DoctorProfile createProfile(@RequestBody DoctorProfile doctorProfile) {
        return doctorProfileService.createProfile(doctorProfile);
    }

    // PUT /api/profile/{userId}
    // Update a doctor's profile details
    @PutMapping("/{userId}")
    public DoctorProfile updateProfile(
            @PathVariable Long userId,
            @RequestBody DoctorProfile doctorProfile) {
        return doctorProfileService.updateProfile(userId, doctorProfile);
    }

    @GetMapping("/all")
    public List<DoctorProfile> getAllProfiles(){
        return doctorProfileService.getAllProfiles();
    }
}