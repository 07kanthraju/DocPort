package com.backend.backend.service;

import com.backend.backend.model.Doctor;
import com.backend.backend.repo.DoctorRepo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DoctorService {

    private final DoctorRepo repository;

    public DoctorService(DoctorRepo repository) {
        this.repository = repository;
    }

    public List<Doctor> getAllDoctors() {
        return repository.findAll();
    }


    public Doctor getDoctorById(Long id) {
        return repository.findById(id).orElseThrow();

    }

    public Doctor createDoctor(Doctor doctor) {
        return repository.save(doctor);
    }

    public Doctor updateDoctor(Long id, Doctor updatedDoctor) {
        Doctor doctor = repository.findById(id).orElseThrow();

        doctor.setName(updatedDoctor.getName());
        doctor.setSpecialization(updatedDoctor.getSpecialization());
        doctor.setHospital(updatedDoctor.getHospital());

        return repository.save(doctor);
    }

    public void deleteDoctor(Long id) {
        repository.deleteById(id);
    }

    public Doctor getDoctor(Long id) {
       return repository.getReferenceById(id);
    }

}