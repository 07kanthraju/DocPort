package com.backend.backend.model;


import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;

import java.util.List;

@Getter
@Entity
public class InsuranceProvider {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String providerName;
    private String policyType;

    @OneToMany(mappedBy = "insuranceProvider")
    private List<Patient> patients;

    public String getProviderName() {
        return providerName;
    }

    public Long getId() {
        return id;
    }

    public String getPolicyType() {
        return policyType;
    }

    public List<Patient> getPatients() {
        return patients;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setProviderName(String providerName) {
        this.providerName = providerName;
    }

    public void setPolicyType(String policyType) {
        this.policyType = policyType;
    }

    public void setPatients(List<Patient> patients) {
        this.patients = patients;
    }
}
