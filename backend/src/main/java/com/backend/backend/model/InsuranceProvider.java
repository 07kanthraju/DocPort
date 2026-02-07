package com.backend.backend.model;


import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;

import java.awt.*;
import java.util.List;

@Getter
@Entity
public class InsuranceProvider {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String providerName;
    private String policyType;

    @OneToMany(mappedBy = "doctor")
    private List<Patient> patients;

    public void setPolicyType(String policyType) {
        this.policyType = policyType;
    }

    public void setPatients(List<Patient> patients) {
        this.patients = patients;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setProviderName(String providerName) {
        this.providerName = providerName;
    }
}
