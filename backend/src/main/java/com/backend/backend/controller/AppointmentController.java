package com.backend.backend.controller;

import com.backend.backend.model.Appointments;
import com.backend.backend.service.AppointmentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    // POST /api/doctor/appointment
    // Books an appointment — consent guard + availability guard applied inside the service
    @PostMapping
    public ResponseEntity<Appointments> createAppointment(@RequestBody Appointments appointment) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(appointmentService.saveAppointment(appointment));
    }

    // GET /api/doctor/appointment
    @GetMapping
    public List<Appointments> getAllAppointments() {
        return appointmentService.getAllAppointments();
    }

    // GET /api/doctor/appointment/{id}
    @GetMapping("/{id}")
    public Appointments getAppointmentById(@PathVariable Long id) {
        return appointmentService.getAppointmentById(id);
    }

    // PUT /api/doctor/appointment/{id}
    @PutMapping("/{id}")
    public Appointments updateAppointment(
            @PathVariable Long id,
            @RequestBody Appointments appointment) {
        return appointmentService.updateAppointment(id, appointment);
    }

    // DELETE /api/doctor/appointment/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteAppointment(@PathVariable Long id) {
        appointmentService.deleteAppointment(id);
        return ResponseEntity.ok("Appointment deleted successfully");
    }
}