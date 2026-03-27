package com.backend.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

@Entity
public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private int age;

    @ManyToOne
    @JoinColumn(name = "doctor_id")
    @JsonIgnoreProperties({"appointments", "hibernateLazyInitializer"})
    private Doctor doctor;

    @ManyToOne
    @JoinColumn(name = "insurance_provider_id")
    @JsonIgnoreProperties({"patients", "hibernateLazyInitializer"})
    private InsuranceProvider insuranceProvider;

    public Long getId() { return id; }
    public String getName() { return name; }
    public int getAge() { return age; }
    public Doctor getDoctor() { return doctor; }
    public InsuranceProvider getInsuranceProvider() { return insuranceProvider; }

    public void setId(Long id) { this.id = id; }
    public void setName(String name) { this.name = name; }
    public void setAge(int age) { this.age = age; }
    public void setDoctor(Doctor doctor) { this.doctor = doctor; }
    public void setInsuranceProvider(InsuranceProvider insuranceProvider) { this.insuranceProvider = insuranceProvider; }
}