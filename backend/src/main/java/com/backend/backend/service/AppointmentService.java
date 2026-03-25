package com.backend.backend.service;

import com.backend.backend.model.Appointments;
import com.backend.backend.repo.AppointmentRepo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppointmentService {

    private final AppointmentRepo appointmentRepo;

    public AppointmentService(AppointmentRepo appointmentRepo) {
        this.appointmentRepo= appointmentRepo;
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
        return appointmentRepo.findById(id).orElse(null);
    }

    // UPDATE
    public Appointments updateAppointment(Long id, Appointments appointmentDetails) {

        Appointments appointment = appointmentRepo.findById(id).orElse(null);

        if (appointment != null) {
            appointment.setAppointmentTime(appointmentDetails.getAppointmentTime());
            appointment.setStatus(appointmentDetails.getStatus());
            appointment.setPatientReference(appointmentDetails.getPatientReference());
            appointment.setDoctor(appointmentDetails.getDoctor());

            return appointmentRepo.save(appointment);
        }

        return null;
    }

    // DELETE
    public void deleteAppointment(Long id) {
        appointmentRepo.deleteById(id);
    }
}