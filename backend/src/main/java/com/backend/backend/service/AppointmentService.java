package com.backend.backend.service;

import com.backend.backend.model.Appointments;
import com.backend.backend.repo.AppointmentRepo;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class AppointmentService {

    private final AppointmentRepo appointmentRepo;

    public AppointmentService(AppointmentRepo appointmentRepo) {
        this.appointmentRepo = appointmentRepo;
    }

    // CREATE
    public Appointments saveAppointment(Appointments appointment) {
        return appointmentRepo.save(appointment);
    }

    // READ ALL
    public List<Appointments> getAllAppointments() {
        return appointmentRepo.findAll();
    }

    // READ BY ID
    public Appointments getAppointmentById(Long id) {
        return appointmentRepo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Appointment not found: " + id));
    }

    // UPDATE
    public Appointments updateAppointment(Long id, Appointments appointmentDetails) {
        Appointments appointment = appointmentRepo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Appointment not found: " + id));

        appointment.setAppointmentTime(appointmentDetails.getAppointmentTime());
        appointment.setStatus(appointmentDetails.getStatus());
        appointment.setPatientReference(appointmentDetails.getPatientReference());
        appointment.setFees(appointmentDetails.getFees());
        appointment.setDoctor(appointmentDetails.getDoctor());

        return appointmentRepo.save(appointment);
    }

    // DELETE
    public void deleteAppointment(Long id) {
        if (!appointmentRepo.existsById(id)) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Appointment not found: " + id);
        }
        appointmentRepo.deleteById(id);
    }
}