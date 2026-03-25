package com.backend.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.util.List;

@Entity
public class Doctor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long doctorId;

    private String name;
    private String specialization;
    private String hospital;
    private String status;

    @OneToMany(mappedBy = "doctor")
    @JsonIgnore
    private List<Appointments> appointments;

    public Doctor() {}

    public Doctor(String name, String specialization, String hospital) {
        this.name = name;
        this.specialization = specialization;
        this.hospital = hospital;
    }

    public Long getDoctorId() {
        return doctorId;
    }

    public String getName() {
        return name;
    }

    public String getSpecialization() {
        return specialization;
    }

    public String getHospital() {
        return hospital;
    }

    public String getStatus() {
        return status;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setSpecialization(String specialization) {
        this.specialization = specialization;
    }

    public void setHospital(String hospital) {
        this.hospital = hospital;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public List<Appointments> getAppointments() {
        return appointments;
    }

    public void setAppointments(List<Appointments> appointments) {
        this.appointments = appointments;
    }

    @Override
    public String toString() {
        return "Doctor{" +
                "doctorId=" + doctorId +
                ", name='" + name + '\'' +
                ", specialization='" + specialization + '\'' +
                ", hospital='" + hospital + '\'' +
                ", status='" + status + '\'' +
                '}';
    }
}