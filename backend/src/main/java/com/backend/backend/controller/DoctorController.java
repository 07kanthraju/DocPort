package com.backend.backend.controller;

import com.backend.backend.model.Doctor;
import com.backend.backend.service.DoctorService;

import jakarta.annotation.PostConstruct;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/doctors")
@CrossOrigin(origins = "http://localhost:3000")
public class DoctorController {

    private final DoctorService service;

    public DoctorController(DoctorService service) {
        this.service = service;
    }


    @GetMapping("/{id}")
    public void getDoctor(@PathVariable Long id) {
        service.getDoctor(id);
    }

    @GetMapping("")
    public void getAllDoctor(){
        service.getAllDoctors();
    }

    @PostMapping
    public Doctor createDoctor(@RequestBody Doctor doctor) {
        return service.createDoctor(doctor);
    }

    @PutMapping("/{id}")
    public Doctor updateDoctor(
            @PathVariable Long id,
            @RequestBody Doctor doctor
    ) {
        return service.updateDoctor(id, doctor);
    }

    @DeleteMapping("/{id}")
    public void deleteDoctor(@PathVariable Long id) {
        service.deleteDoctor(id);
    }
}