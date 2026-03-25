package com.backend.backend.controller;

import com.backend.backend.model.Appointments;
import com.backend.backend.service.AppointmentService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/doctor/appointment")
@CrossOrigin(origins = "http://localhost:3000")
public class AppointmentController {

    private final AppointmentService appointmentService;

    public AppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    // CREATE APPOINTMENT
    @PostMapping
    public Appointments createAppointment(@RequestBody Appointments appointment) {
        return appointmentService.saveAppointment(appointment);
    }

    // GET ALL APPOINTMENTS
    @GetMapping
    public List<Appointments> getAllAppointments() {
        return appointmentService.getAllAppointments();
    }

    // GET APPOINTMENT BY ID
    @GetMapping("/{id}")
    public Appointments getAppointmentById(@PathVariable Long id) {
        return appointmentService.getAppointmentById(id);
    }

    // UPDATE APPOINTMENT
    @PutMapping("/{id}")
    public Appointments updateAppointment(
            @PathVariable Long id,
            @RequestBody Appointments appointment
    ) {
        return appointmentService.updateAppointment(id, appointment);
    }

    // DELETE APPOINTMENT
    @DeleteMapping("/{id}")
    public String deleteAppointment(@PathVariable Long id) {

        appointmentService.deleteAppointment(id);

        return "Appointment deleted successfully";
    }
}