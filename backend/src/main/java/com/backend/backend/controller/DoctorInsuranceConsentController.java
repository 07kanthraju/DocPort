package com.backend.backend.controller;

import com.backend.backend.model.DoctorInsuranceConsent;
import com.backend.backend.service.DoctorInsuranceConsentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/doctor-insurance-consent")
@CrossOrigin(origins = "http://localhost:3000")
public class DoctorInsuranceConsentController {

    @Autowired
    private DoctorInsuranceConsentService service;

    @GetMapping
    public List<DoctorInsuranceConsent> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public DoctorInsuranceConsent getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @GetMapping("/doctor/{doctorId}")
    public List<DoctorInsuranceConsent> getByDoctor(@PathVariable Long doctorId) {
        return service.getByDoctor(doctorId);
    }

    @GetMapping("/provider/{providerId}")
    public List<DoctorInsuranceConsent> getByProvider(@PathVariable Long providerId) {
        return service.getByProvider(providerId);
    }

    @PostMapping
    public DoctorInsuranceConsent create(@RequestBody DoctorInsuranceConsent consent) {
        return service.save(consent);
    }

    @PutMapping("/{id}")
    public DoctorInsuranceConsent update(
            @PathVariable Long id,
            @RequestBody DoctorInsuranceConsent consent) {

        consent.setId(id);
        return service.save(consent);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}