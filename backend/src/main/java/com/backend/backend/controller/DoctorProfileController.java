package com.backend.backend.controller;

import com.backend.backend.model.DoctorProfile;
import com.backend.backend.service.DoctorProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
@CrossOrigin(origins = "http://localhost:3000")
public class DoctorProfileController {

    @Autowired
    private DoctorProfileService doctorProfileService;

    @GetMapping("/{userId}")
    public DoctorProfile getProfileById(@PathVariable Long userId) {
        return doctorProfileService.getProfileById(userId);
    }

    @PostMapping
    public DoctorProfile createProfile(@RequestBody DoctorProfile doctorProfile) {
        return doctorProfileService.createProfile(doctorProfile);
    }

    @PutMapping("/{userId}")
    public DoctorProfile updateProfile(
            @PathVariable Long userId,
            @RequestBody DoctorProfile doctorProfile
    ) {
        return doctorProfileService.updateProfile(userId, doctorProfile);
    }
}