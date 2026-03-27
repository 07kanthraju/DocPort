package com.backend.backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "doctor_availability")
public class DoctorAvailability {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // repo uses: findByDoctorId(doctorId) → flat Long field, not a @ManyToOne join
    // This is the doctor's own ID stored directly (matches DoctorAvailabilityRepo.findByDoctorId)
    @Column(name = "doctor_id", nullable = false)
    private Long doctorId;

    // Start of this availability slot
    // Used by AppointmentService.coversTime() → getStartTime()
    @Column(name = "start_time", nullable = false)
    private LocalDateTime startTime;

    // End of this availability slot
    // Used by AppointmentService.coversTime() → getEndTime()
    @Column(name = "end_time", nullable = false)
    private LocalDateTime endTime;

    // Whether this slot is currently open for booking
    // false = doctor has marked themselves unavailable for this slot
    // Defaults to true — every newly created slot is bookable
    // Used by: AppointmentService guard, PublicDoctorController filter
    @Column(name = "is_available", nullable = false)
    private boolean isAvailable = true;

    // ─── Constructors ────────────────────────────────────────────────────────

    public DoctorAvailability() {}

    public DoctorAvailability(Long doctorId, LocalDateTime startTime, LocalDateTime endTime) {
        this.doctorId = doctorId;
        this.startTime = startTime;
        this.endTime = endTime;
        this.isAvailable = true;
    }

    // ─── Getters & Setters ───────────────────────────────────────────────────

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getDoctorId() {
        return doctorId;
    }

    public void setDoctorId(Long doctorId) {
        this.doctorId = doctorId;
    }

    public LocalDateTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalDateTime startTime) {
        this.startTime = startTime;
    }

    public LocalDateTime getEndTime() {
        return endTime;
    }

    public void setEndTime(LocalDateTime endTime) {
        this.endTime = endTime;
    }

    public boolean isAvailable() {
        return isAvailable;
    }

    public void setAvailable(boolean available) {
        this.isAvailable = available;
    }
}