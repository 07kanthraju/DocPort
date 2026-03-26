package com.backend.backend.service;

import com.backend.backend.model.DoctorInsuranceConsent;
import com.backend.backend.repo.DoctorInsuranceConsentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DoctorInsuranceConsentService {

    @Autowired
    private DoctorInsuranceConsentRepo repo;

    public List<DoctorInsuranceConsent> getAll() {
        return repo.findAll();
    }

    public DoctorInsuranceConsent getById(Long id) {
        return repo.findById(id).orElse(null);
    }

    public List<DoctorInsuranceConsent> getByDoctor(Long doctorId) {
        return repo.findByDoctor_DoctorId(doctorId);  // fixed
    }

    public List<DoctorInsuranceConsent> getByProvider(Long providerId) {
        return repo.findByProvider_Id(providerId);    // fixed
    }

    public DoctorInsuranceConsent save(DoctorInsuranceConsent consent) {
        return repo.save(consent);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }
}