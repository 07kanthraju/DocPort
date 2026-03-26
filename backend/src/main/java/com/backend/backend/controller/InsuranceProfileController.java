package com.backend.backend.controller;


import com.backend.backend.model.InsuranceProfile;
import com.backend.backend.service.InsuranceProfileService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/insurance/profile")
@CrossOrigin(origins = "http://localhost:3000")
public class InsuranceProfileController {

    private final InsuranceProfileService service;

    public InsuranceProfileController(InsuranceProfileService service) {
        this.service = service;
    }

    /** GET /api/insurance/profile/{userId} */
    @GetMapping("/{userId}")
    public ResponseEntity<InsuranceProfile> getProfile(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getByUserId(userId));
    }

    /** POST /api/insurance/profile */
    @PostMapping
    public ResponseEntity<InsuranceProfile> createProfile(@RequestBody InsuranceProfile profile) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(profile));
    }

    /** PUT /api/insurance/profile/{userId} */
    @PutMapping("/{userId}")
    public ResponseEntity<InsuranceProfile> updateProfile(
            @PathVariable Long userId,
            @RequestBody InsuranceProfile profile) {
        return ResponseEntity.ok(service.update(userId, profile));
    }
}
