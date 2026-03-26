package com.backend.backend.repo;

import com.backend.backend.model.DoctorInsuranceConsent;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;



public interface DoctorInsuranceConsentRepo extends JpaRepository<DoctorInsuranceConsent, Long> {

    // Use nested property navigation: doctor.doctorId and provider.id
    List<DoctorInsuranceConsent> findByDoctor_DoctorId(Long doctorId);

    List<DoctorInsuranceConsent> findByProvider_Id(Long providerId);
}