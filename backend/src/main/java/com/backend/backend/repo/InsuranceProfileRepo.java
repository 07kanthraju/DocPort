package com.backend.backend.repo;



import com.backend.backend.model.InsuranceProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface InsuranceProfileRepo extends JpaRepository<InsuranceProfile, Long> {

    Optional<InsuranceProfile> findByUserId(Long userId);

    boolean existsByUserId(Long userId);
}
