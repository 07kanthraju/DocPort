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

    @PutMapping("/add")
    public Patient bookAppointment(Patient patient){
        return patientService.savePatient(patient);
    }

    @GetMapping("/remove")
    public List<Patient> getPatients() {
        return patientService.getAllPatients();
    }


}

