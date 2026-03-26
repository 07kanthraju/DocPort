package com.backend.backend.service;


import com.backend.backend.model.InsuranceProfile;
import com.backend.backend.repo.InsuranceProfileRepo;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class InsuranceProfileService {

    private final InsuranceProfileRepo repo;

    public InsuranceProfileService(InsuranceProfileRepo repo) {
        this.repo = repo;
    }

    /** Fetch a profile by userId — 404 if not found. */
    public InsuranceProfile getByUserId(Long userId) {
        return repo.findByUserId(userId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Insurance profile not found for userId: " + userId));
    }

    /** Create a new profile — 409 if one already exists for this user. */
    public InsuranceProfile create(InsuranceProfile profile) {
        if (repo.existsByUserId(profile.getUserId())) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT, "Profile already exists for userId: " + profile.getUserId());
        }
        return repo.save(profile);
    }

    /** Update an existing profile — 404 if not found. */
    public InsuranceProfile update(Long userId, InsuranceProfile incoming) {
        InsuranceProfile existing = getByUserId(userId);

        existing.setCompanyName(incoming.getCompanyName());
        existing.setEmail(incoming.getEmail());
        existing.setPhone(incoming.getPhone());
        existing.setAddress(incoming.getAddress());

        return repo.save(existing);
    }
}
