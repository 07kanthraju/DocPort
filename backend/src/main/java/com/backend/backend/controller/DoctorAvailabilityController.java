package com.backend.backend.controller;

import com.backend.backend.model.DoctorAvailability;
import com.backend.backend.service.DoctorAvailabilityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/availability")
@CrossOrigin(origins = "http://localhost:3000")
public class DoctorAvailabilityController {

    @Autowired
    private DoctorAvailabilityService availabilityService;

    // Create availability
    @PostMapping
    public DoctorAvailability createAvailability(@RequestBody DoctorAvailability availability){
        return availabilityService.saveAvailability(availability);
    }

    // Get doctor availability
    @GetMapping("/{doctorId}")
    public List<DoctorAvailability> getDoctorAvailability(@PathVariable Long doctorId){
        return availabilityService.getAvailabilityByDoctorId(doctorId);
    }

    // Get all availability
    @GetMapping
    public List<DoctorAvailability> getAllAvailability(){
        return availabilityService.getAllAvailability();
    }

}