package com.backend.backend.service;

import com.backend.backend.model.DoctorProfile;
import com.backend.backend.repo.DoctorProfileRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class DoctorProfileService {

    @Autowired
    private DoctorProfileRepo doctorProfileRepo;

    // Fetch a doctor's profile by their user account ID
    public DoctorProfile getByUserId(Long userId) {

        DoctorProfile profile = doctorProfileRepo.findByUserId(userId);

        if (profile == null) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "Doctor profile not found for userId: " + userId
            );
        }

        return profile;
    }

    // Create a brand-new profile record
    public DoctorProfile createProfile(DoctorProfile doctorProfile) {
        return doctorProfileRepo.save(doctorProfile);
    }

    // Update an existing profile (UPSERT behaviour)
    public DoctorProfile updateProfile(Long userId, DoctorProfile incoming) {

        DoctorProfile profile = doctorProfileRepo.findByUserId(userId);

        if (profile == null) {
            profile = new DoctorProfile();
            profile.setUserId(userId);
        }

        profile.setName(incoming.getName());
        profile.setSpecialization(incoming.getSpecialization());
        profile.setHospital(incoming.getHospital());
        profile.setStatus(incoming.getStatus());

        return doctorProfileRepo.save(profile);
    }

    // ⭐ Get all doctor profiles (for insurance provider dashboard)
    public List<DoctorProfile> getAllProfiles() {
        return doctorProfileRepo.findAll();
    }
}