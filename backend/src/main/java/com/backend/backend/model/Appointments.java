package com.backend.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

@Entity
@Table(name = "appointments")
public class Appointments {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "appointment_time")
    private String appointmentTime;

    @Column(nullable = false)
    private String status;

    @Column(name = "patient_reference")
    private String patientReference;

    @Column(name = "fees")
    private String fees;

    @Column(name = "insurance_provider_id")
    private Long insuranceProviderId;

    @ManyToOne
    @JoinColumn(name = "doctor_id")
    @JsonIgnoreProperties({"appointments", "hibernateLazyInitializer"})
    private Doctor doctor;

    // ─── Constructors ────────────────────────────────────────────────────────

    public Appointments() {}

    // ─── Getters & Setters ───────────────────────────────────────────────────

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getAppointmentTime() { return appointmentTime; }
    public void setAppointmentTime(String appointmentTime) { this.appointmentTime = appointmentTime; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getPatientReference() { return patientReference; }
    public void setPatientReference(String patientReference) { this.patientReference = patientReference; }

    public String getFees() { return fees; }
    public void setFees(String fees) { this.fees = fees; }

    public Long getInsuranceProviderId() { return insuranceProviderId; }
    public void setInsuranceProviderId(Long insuranceProviderId) { this.insuranceProviderId = insuranceProviderId; }

    public Doctor getDoctor() { return doctor; }
    public void setDoctor(Doctor doctor) { this.doctor = doctor; }
}