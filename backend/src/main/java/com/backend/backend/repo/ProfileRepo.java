package com.backend.backend.repo;

import com.backend.backend.model.Profile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProfileRepo extends JpaRepository<Profile, Long> {

    Profile findByUserId(Long userId);
}
