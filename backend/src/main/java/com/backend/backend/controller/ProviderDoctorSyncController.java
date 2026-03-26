package com.backend.backend.controller;

import com.backend.backend.model.ProviderDoctorSync;
import com.backend.backend.service.ProviderDoctorSyncService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/provider-doctor-sync")
@CrossOrigin(origins = "http://localhost:3000")
public class ProviderDoctorSyncController {

    @Autowired
    private ProviderDoctorSyncService service;

    @GetMapping
    public List<ProviderDoctorSync> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public ProviderDoctorSync getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @GetMapping("/doctor/{doctorId}")
    public List<ProviderDoctorSync> getByDoctor(@PathVariable Long doctorId) {
        return service.getByDoctor(doctorId);
    }

    @GetMapping("/provider/{providerId}")
    public List<ProviderDoctorSync> getByProvider(@PathVariable Long providerId) {
        return service.getByProvider(providerId);
    }

    @PostMapping
    public ProviderDoctorSync create(@RequestBody ProviderDoctorSync sync) {
        return service.save(sync);
    }

    @PutMapping("/{id}")
    public ProviderDoctorSync update(
            @PathVariable Long id,
            @RequestBody ProviderDoctorSync sync) {

        sync.setId(id);
        return service.save(sync);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}