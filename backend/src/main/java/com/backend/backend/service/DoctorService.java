package com.backend.backend.service;

import com.backend.backend.model.Doctor;
import com.backend.backend.repo.DoctorRepo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DoctorService {

    private final DoctorRepo doctorRepo;

    public DoctorService(DoctorRepo doctorRepo)
    {
        this.doctorRepo = doctorRepo;
    }

    public Doctor saveDoctor(Doctor doctor)
    {
        return doctorRepo.save(doctor);
    }

    public List<Doctor> getAllDoctors()
    {
        return doctorRepo.findAll();
    }

}
