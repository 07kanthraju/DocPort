package com.backend.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

@Entity
@Table(name = "doctor_insurance_consent")
public class DoctorInsuranceConsent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "doctor_id", nullable = false)
    @JsonIgnoreProperties({"appointments", "hibernateLazyInitializer"})
    private Doctor doctor;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "provider_id", nullable = false)
    @JsonIgnoreProperties({"patients", "hibernateLazyInitializer"})
    private InsuranceProvider provider;

    // Lifecycle: PENDING → ACTIVE or REJECTED
    // Set to PENDING automatically when insurance sends an invite
    @Column(nullable = false)
    private String status = "PENDING";  // "PENDING" | "ACTIVE" | "REJECTED"

    // ─── Constructors ────────────────────────────────────────────────────────

    public DoctorInsuranceConsent() {}

    public DoctorInsuranceConsent(Doctor doctor, InsuranceProvider provider) {
        this.doctor = doctor;
        this.provider = provider;
        this.status = "PENDING";
    }

    // ─── Getters & Setters ───────────────────────────────────────────────────

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Doctor getDoctor() {
        return doctor;
    }

    public void setDoctor(Doctor doctor) {
        this.doctor = doctor;
    }

    public InsuranceProvider getProvider() {
        return provider;
    }

    public void setProvider(InsuranceProvider provider) {
        this.provider = provider;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}