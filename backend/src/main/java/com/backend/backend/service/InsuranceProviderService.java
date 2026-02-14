package com.backend.backend.service;

import com.backend.backend.model.InsuranceProvider;
import com.backend.backend.repo.InsuranceProviderRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InsuranceProviderService {

    @Autowired
    private InsuranceProviderRepo insuranceProviderRepo;

    // Create a new InsuranceProvider
    public InsuranceProvider createProvider(InsuranceProvider provider) {
        return insuranceProviderRepo.save(provider);
    }

    // Get all InsuranceProviders
    public List<InsuranceProvider> getAllProviders() {
        return insuranceProviderRepo.findAll();
    }

    // Get InsuranceProvider by ID
    public InsuranceProvider getProviderById(Long id) {
        return insuranceProviderRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("InsuranceProvider not found with id: " + id));
    }

    // Update InsuranceProvider
    public InsuranceProvider updateProvider(Long id, InsuranceProvider providerDetails) {
        InsuranceProvider provider = getProviderById(id);

        provider.setProviderName(providerDetails.getProviderName());
        provider.setPolicyType(providerDetails.getPolicyType());

        return insuranceProviderRepo.save(provider);
    }

    // Delete InsuranceProvider
    public void deleteProvider(Long id) {
        InsuranceProvider provider = getProviderById(id);
        insuranceProviderRepo.delete(provider);
    }
}
