package com.backend.backend.controller;

import com.backend.backend.model.Doctor;
import com.backend.backend.service.DoctorService;

import jakarta.annotation.PostConstruct;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/doctor")
public class DoctorController {

    public final DoctorService doctorService;

    public DoctorController(DoctorService doctorService) {
        this.doctorService = doctorService;
    }


    @PutMapping("/add")
    public Doctor createDoctor(@RequestBody Doctor doctor) {
        return doctorService.saveDoctor(doctor);
    }

    // GET: fetch all users from DB
    @GetMapping("/all")
    public List<Doctor> getDoctor() {
        return doctorService.getAllDoctors();
    }
}
