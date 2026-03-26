package com.backend.backend.service;

import com.backend.backend.model.DoctorAvailability;
import com.backend.backend.repo.DoctorAvailabilityRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DoctorAvailabilityService {

    @Autowired
    private DoctorAvailabilityRepo availabilityRepo;

    // Save availability
    public DoctorAvailability saveAvailability(DoctorAvailability availability){
        return availabilityRepo.save(availability);
    }

    // Get availability by doctor
    public List<DoctorAvailability> getAvailabilityByDoctorId(Long doctorId){
        return availabilityRepo.findByDoctorId(doctorId);
    }

    // Get all availability
    public List<DoctorAvailability> getAllAvailability(){
        return availabilityRepo.findAll();
    }

}