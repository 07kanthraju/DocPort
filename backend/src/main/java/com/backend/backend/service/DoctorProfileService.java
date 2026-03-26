package com.backend.backend.service;

import com.backend.backend.model.DoctorProfile;
import com.backend.backend.repo.DoctorProfileRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DoctorProfileService {

    @Autowired
    private DoctorProfileRepo doctorProfileRepo;

    public DoctorProfile getProfile(Long userId) {
        return doctorProfileRepo.findByUserId(userId);
    }

    public DoctorProfile getProfileById(Long id){
        return doctorProfileRepo.findByUserId(id);
    }

    public DoctorProfile createProfile(DoctorProfile doctorProfile) {
        return doctorProfileRepo.save(doctorProfile);
    }

    public DoctorProfile updateProfile(Long userId, DoctorProfile doctorProfileDetails) {

        DoctorProfile doctorProfile = doctorProfileRepo.findByUserId(userId);

        if (doctorProfile == null) {
            doctorProfile = new DoctorProfile();
            doctorProfile.setUserId(userId);
        }

        doctorProfile.setName(doctorProfileDetails.getName());
        doctorProfile.setSpecialization(doctorProfileDetails.getSpecialization());
        doctorProfile.setHospital(doctorProfileDetails.getHospital());
        doctorProfile.setStatus(doctorProfileDetails.getStatus());

        return doctorProfileRepo.save(doctorProfile);
    }
}