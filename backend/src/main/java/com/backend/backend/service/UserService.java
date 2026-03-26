package com.backend.backend.service;

import com.backend.backend.model.InsuranceProfile;
import com.backend.backend.model.Users;
import com.backend.backend.model.DoctorProfile;
import com.backend.backend.repo.InsuranceProfileRepo;
import com.backend.backend.repo.UserRepo;
import com.backend.backend.repo.DoctorProfileRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private DoctorProfileRepo doctorProfileRepo;

    @Autowired
    private InsuranceProfileRepo insuranceProfileRepo ;

    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public Users register(String email, String password, String role, String name) {

        // Guard: check if email already exists
        if (userRepo.findByEmail(email) != null) {
            throw new RuntimeException("Email already registered: " + email);
        }

        Users user = new Users();
        user.setEmail(email);
        user.setName(name);
        user.setPassword(passwordEncoder.encode(password));
        user.setRole(role);
        Users savedUser = userRepo.save(user);
        DoctorProfile doctorProfile = new DoctorProfile();


        if (role.equals("doctor") ){

            doctorProfile.setUserId(savedUser.getId());
            doctorProfile.setName(name);
            doctorProfile.setStatus("active");
            doctorProfileRepo.save(doctorProfile);
        }
//
//        else {
//
//            System.out.println("Entering insurance loop");
//            InsuranceProfile insuranceProfile = new InsuranceProfile();
//
//            insuranceProfileRepo.save(insuranceProfile);
//
//        }

        return savedUser;
    }
    public Users login(String email, String password) {
        Users user = userRepo.findByEmail(email);
        if (user == null) return null;
        if (passwordEncoder.matches(password, user.getPassword())) return user;
        return null;
    }
}