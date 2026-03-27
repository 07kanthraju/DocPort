package com.backend.backend.controller;

import com.backend.backend.model.InsuranceProvider;
import com.backend.backend.service.InsuranceProviderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/insurance-provider")
@CrossOrigin(origins = "http://localhost:3000")
public class InsuranceProviderController {

    @Autowired
    private InsuranceProviderService insuranceProviderService;

    // POST /api/insurance-provider
    // Create a new insurance provider (was incorrectly @PutMapping("/add"))
    @PostMapping
    public ResponseEntity<InsuranceProvider> createProvider(@RequestBody InsuranceProvider provider) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(insuranceProviderService.createProvider(provider));
    }

    // GET /api/insurance-provider
    @GetMapping
    public List<InsuranceProvider> getAllProviders() {
        return insuranceProviderService.getAllProviders();
    }

    // GET /api/insurance-provider/{id}
    @GetMapping("/{id}")
    public InsuranceProvider getProviderById(@PathVariable Long id) {
        return insuranceProviderService.getProviderById(id);
    }

    // PUT /api/insurance-provider/{id}
    @PutMapping("/{id}")
    public InsuranceProvider updateProvider(
            @PathVariable Long id,
            @RequestBody InsuranceProvider provider) {
        return insuranceProviderService.updateProvider(id, provider);
    }

    // DELETE /api/insurance-provider/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProvider(@PathVariable Long id) {
        insuranceProviderService.deleteProvider(id);
        return ResponseEntity.ok("Insurance provider deleted with id: " + id);
    }
}