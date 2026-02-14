package com.backend.backend.controller;

import com.backend.backend.model.InsuranceProvider;
import com.backend.backend.service.InsuranceProviderService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/insuranceprovider")
public class InsuranceProviderController {

    @Autowired
    private InsuranceProviderService insuranceProviderService;

    // Create a new InsuranceProvider
    @PutMapping("/add")
    public InsuranceProvider createProvider(@RequestBody InsuranceProvider provider) {
        return insuranceProviderService.createProvider(provider);
    }

    // Get all InsuranceProviders
    @GetMapping("/all")
    public List<InsuranceProvider> getAllProviders() {
        return insuranceProviderService.getAllProviders();
    }

    // Get InsuranceProvider by ID
    @GetMapping("/{id}")
    public InsuranceProvider getProviderById(@PathVariable Long id) {
        return insuranceProviderService.getProviderById(id);
    }

    // Update InsuranceProvider
    @PutMapping("/{id}")
    public InsuranceProvider updateProvider(@PathVariable Long id, @RequestBody InsuranceProvider provider) {
        return insuranceProviderService.updateProvider(id, provider);
    }

    // Delete InsuranceProvider
    @DeleteMapping("/{id}")
    public String deleteProvider(@PathVariable Long id) {
        insuranceProviderService.deleteProvider(id);
        return "InsuranceProvider deleted with id: " + id;
    }
}
