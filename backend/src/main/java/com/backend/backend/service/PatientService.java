package com.backend.backend.service;

import com.backend.backend.model.Doctor;
import com.backend.backend.model.InsuranceProvider;
import com.backend.backend.model.Patient;
import com.backend.backend.repo.DoctorRepo;
import com.backend.backend.repo.InsuranceProviderRepo;
import com.backend.backend.repo.PatientRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PatientService {

    @Autowired
    private PatientRepo patientRepo;

    @Autowired
    private DoctorRepo doctorRepo;

    @Autowired
    private InsuranceProviderRepo insuranceProviderRepository;

    public Patient createPatient(Long doctorId, Long insuranceId, Patient patient) {

        Doctor doctor = doctorRepo.findById(doctorId)
                .orElseThrow(() -> new RuntimeException("Doctor not found"));

        InsuranceProvider insurance = insuranceProviderRepository.findById(insuranceId)
                .orElseThrow(() -> new RuntimeException("Insurance not found"));

        patient.setDoctor(doctor);
        patient.setInsuranceProvider(insurance);

        return patientRepo.save(patient);
    }

    public List<Patient> getAllPatients() {
        return patientRepo.findAll();
    }
}

