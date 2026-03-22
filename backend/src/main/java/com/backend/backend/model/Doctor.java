package com.backend.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.List;

import jakarta.persistence.*;

@Entity
public class Doctor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String specialization;
    private String hospital;

    public Doctor() {}

    public Doctor(String name, String specialization, String hospital) {
        this.name = name;
        this.specialization = specialization;
        this.hospital = hospital;
    }

    public Long getId() { return id; }

    public String getName() { return name; }

    public String getSpecialization() { return specialization; }

    public String getHospital() { return hospital; }

    public void setName(String name) { this.name = name; }

    public void setSpecialization(String specialization) {
        this.specialization = specialization;
    }

    public void setHospital(String hospital) { this.hospital = hospital; }
}