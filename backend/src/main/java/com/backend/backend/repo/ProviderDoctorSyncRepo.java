package com.backend.backend.repo;

import com.backend.backend.model.ProviderDoctorSync;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProviderDoctorSyncRepo extends JpaRepository<ProviderDoctorSync, Long> {

    List<ProviderDoctorSync> findByDoctorId(Long doctorId);

    List<ProviderDoctorSync> findByProviderId(Long providerId);

}