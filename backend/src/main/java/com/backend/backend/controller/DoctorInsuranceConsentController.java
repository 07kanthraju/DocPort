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

    // GET /api/doctor-insurance-consent
    @GetMapping
    public List<DoctorInsuranceConsent> getAll() {
        return service.getAll();
    }

    // GET /api/doctor-insurance-consent/{id}
    @GetMapping("/{id}")
    public DoctorInsuranceConsent getById(@PathVariable Long id) {
        return service.getById(id);
    }

    // GET /api/doctor-insurance-consent/doctor/{doctorId}
    // Doctor sees all their tie-ups (PENDING, ACTIVE, REJECTED)
    @GetMapping("/doctor/{doctorId}")
    public List<DoctorInsuranceConsent> getByDoctor(@PathVariable Long doctorId) {
        return service.getByDoctor(doctorId);
    }

    // GET /api/doctor-insurance-consent/provider/{providerId}
    // Insurance sees all their tie-ups
    @GetMapping("/provider/{providerId}")
    public List<DoctorInsuranceConsent> getByProvider(@PathVariable Long providerId) {
        return service.getByProvider(providerId);
    }

    // POST /api/doctor-insurance-consent/invite
    // Insurance sends an invite to a doctor — creates record with status PENDING
    @PostMapping("/invite")
    public DoctorInsuranceConsent invite(@RequestBody DoctorInsuranceConsent consent) {
        return service.invite(consent);
    }

    // PUT /api/doctor-insurance-consent/{id}/respond?status=ACTIVE  (or REJECTED)
    // Doctor accepts or rejects an invite
    @PutMapping("/{id}/respond")
    public DoctorInsuranceConsent respond(
            @PathVariable Long id,
            @RequestParam String status) {
        return service.respond(id, status);
    }

    // PUT /api/doctor-insurance-consent/{id}
    // Generic status update — patches only the status field safely
    @PutMapping("/{id}")
    public DoctorInsuranceConsent update(
            @PathVariable Long id,
            @RequestBody DoctorInsuranceConsent incoming) {
        return service.update(id, incoming);
    }

    // DELETE /api/doctor-insurance-consent/{id}
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}