package com.backend.backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(
        name = "doctor_insurance_consent",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {"doctor_id", "provider_id"})
        }
)
public class DoctorInsuranceConsent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "doctor_id", nullable = false)
    private Doctor doctor;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "provider_id", nullable = false)
    private InsuranceProvider provider;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ConsentStatus consentStatus = ConsentStatus.PENDING; // now resolves to the standalone enum

    @Column(updatable = false)
    private LocalDateTime createdAt;

    private LocalDateTime grantedAt;
    private LocalDateTime revokedAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public Doctor getDoctor() { return doctor; }
    public InsuranceProvider getProvider() { return provider; }
    public ConsentStatus getConsentStatus() { return consentStatus; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getGrantedAt() { return grantedAt; }
    public LocalDateTime getRevokedAt() { return revokedAt; }

    public void setId(Long id) { this.id = id; }
    public void setDoctor(Doctor doctor) { this.doctor = doctor; }
    public void setProvider(InsuranceProvider provider) { this.provider = provider; }
    public void setConsentStatus(ConsentStatus consentStatus) { this.consentStatus = consentStatus; }
    public void setGrantedAt(LocalDateTime grantedAt) { this.grantedAt = grantedAt; }
    public void setRevokedAt(LocalDateTime revokedAt) { this.revokedAt = revokedAt; }
}