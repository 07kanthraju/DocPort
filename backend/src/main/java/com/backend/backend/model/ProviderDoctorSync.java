package com.backend.backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class ProviderDoctorSync {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long doctorId;

    private Long providerId;

    private LocalDateTime lastProfileSync;

    private LocalDateTime lastAvailabilitySync;

    private String syncStatus;

    private String lastError;

    public Long getId() {
        return id;
    }

    public Long getDoctorId() {
        return doctorId;
    }

    public Long getProviderId() {
        return providerId;
    }

    public LocalDateTime getLastProfileSync() {
        return lastProfileSync;
    }

    public LocalDateTime getLastAvailabilitySync() {
        return lastAvailabilitySync;
    }

    public String getSyncStatus() {
        return syncStatus;
    }

    public String getLastError() {
        return lastError;
    }

    public void setDoctorId(Long doctorId) {
        this.doctorId = doctorId;
    }

    public void setProviderId(Long providerId) {
        this.providerId = providerId;
    }

    public void setLastProfileSync(LocalDateTime lastProfileSync) {
        this.lastProfileSync = lastProfileSync;
    }

    public void setLastAvailabilitySync(LocalDateTime lastAvailabilitySync) {
        this.lastAvailabilitySync = lastAvailabilitySync;
    }

    public void setSyncStatus(String syncStatus) {
        this.syncStatus = syncStatus;
    }

    public void setLastError(String lastError) {
        this.lastError = lastError;
    }

    public void setId(Long id) {
        this.id = id;
    }
}