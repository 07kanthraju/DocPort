package com.backend.backend.service;

import com.backend.backend.model.ProviderDoctorSync;
import com.backend.backend.repo.ProviderDoctorSyncRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProviderDoctorSyncService {

    @Autowired
    private ProviderDoctorSyncRepo repo;

    public List<ProviderDoctorSync> getAll() {
        return repo.findAll();
    }

    public ProviderDoctorSync getById(Long id) {
        return repo.findById(id).orElse(null);
    }

    public List<ProviderDoctorSync> getByDoctor(Long doctorId) {
        return repo.findByDoctorId(doctorId);
    }

    public List<ProviderDoctorSync> getByProvider(Long providerId) {
        return repo.findByProviderId(providerId);
    }

    public ProviderDoctorSync save(ProviderDoctorSync sync) {
        return repo.save(sync);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }
}