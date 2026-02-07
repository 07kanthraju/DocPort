package com.backend.backend.model;


import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;


import java.util.List;

@Entity
public class Doctor {

    private Long id;

    private String name;
    private String Specialization;

    @OneToMany(mappedBy = "insuranceProvider")
    private List<Patient> patients;

    public List<Patient> getPatients() {
        return patients;
    }

    public void setPatients(List<Patient> patients) {
        this.patients = patients;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setSpecialization(String specialization) {
        this.Specialization = specialization;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getSpecialization() {
        return Specialization;
    }


}
