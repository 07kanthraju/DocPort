package com.backend.backend.controller;

import com.backend.backend.model.Patient;
import com.backend.backend.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/patients")
@CrossOrigin(origins = "http://localhost:3000")
public class PatientController {

    @Autowired
    private PatientService patientService;

    // POST /api/patients
    // Register a patient and link them to a doctor and insurance provider
    // Pass doctorId and insuranceId as request params so the service can resolve the relationships
    @PostMapping
    public ResponseEntity<Patient> createPatient(
            @RequestParam Long doctorId,
            @RequestParam Long insuranceId,
            @RequestBody Patient patient) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(patientService.createPatient(doctorId, insuranceId, patient));
    }

    // GET /api/patients
    // Returns all registered patients
    @GetMapping
    public List<Patient> getAllPatients() {
        return patientService.getAllPatients();
    }
}