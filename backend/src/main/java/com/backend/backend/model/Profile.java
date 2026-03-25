package com.backend.backend.model;

import jakarta.persistence.*;

@Entity
public class Profile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;

    private String name;

    private String specialization;

    private String hospital;

    private String status;

    public Long getId() {
        return id;
    }

    public Long getUserId() {
        return userId;
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

    public void setUserId(Long userId) {
        this.userId = userId;
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
}