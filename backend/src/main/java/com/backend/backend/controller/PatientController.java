package com.backend.backend.controller;

import com.backend.backend.model.Patient;
import com.backend.backend.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/patients")
public class PatientController {

    @Autowired
    private PatientService patientService;

    @PostMapping("/doctor/{doctorId}/insurance/{insuranceId}")
    public Patient createPatient(
            @PathVariable Long doctorId,
            @PathVariable Long insuranceId,
            @RequestBody Patient patient) {

        return patientService.createPatient(doctorId, insuranceId, patient);
    }

    @GetMapping
    public List<Patient> getPatients() {
        return patientService.getAllPatients();
    }
}

