package com.backend.backend.service;

import com.backend.backend.model.DoctorInsuranceConsent;
import com.backend.backend.repo.DoctorInsuranceConsentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

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
        return repo.findByDoctor_DoctorId(doctorId);
    }

    public List<DoctorInsuranceConsent> getByProvider(Long providerId) {
        return repo.findByProvider_Id(providerId);
    }

    // Insurance sends an invite to a doctor — always starts as PENDING
    public DoctorInsuranceConsent invite(DoctorInsuranceConsent consent) {
        consent.setStatus("PENDING");
        return repo.save(consent);
    }

    // Doctor responds: status must be "ACTIVE" or "REJECTED"
    public DoctorInsuranceConsent respond(Long id, String status) {
        if (!status.equals("ACTIVE") && !status.equals("REJECTED")) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Status must be ACTIVE or REJECTED");
        }
        DoctorInsuranceConsent consent = repo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Consent record not found: " + id));
        consent.setStatus(status);
        return repo.save(consent);
    }

    // Safe update — only patches the status field, never overwrites doctor/provider links
    public DoctorInsuranceConsent update(Long id, DoctorInsuranceConsent incoming) {
        DoctorInsuranceConsent existing = repo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Consent record not found: " + id));
        existing.setStatus(incoming.getStatus());
        return repo.save(existing);
    }

    public DoctorInsuranceConsent save(DoctorInsuranceConsent consent) {
        return repo.save(consent);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }
}