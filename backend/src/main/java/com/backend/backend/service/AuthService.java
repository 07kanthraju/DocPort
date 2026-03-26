package com.backend.backend.service;

import com.backend.backend.model.DoctorProfile;
import com.backend.backend.repo.DoctorProfileRepo;
import com.backend.backend.repo.UserRepo;
import com.backend.backend.model.Users;
//import org.apache.catalina.User;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private UserRepo userRepo;

    private DoctorProfileRepo doctorProfileRepo;

    public Users signup(Users users){
        Users savedUser = userRepo.save(users);

        DoctorProfile doctorProfile = new DoctorProfile();
        doctorProfile.setUserId(savedUser.getId());
        doctorProfile.setStatus("INCOMPLETE");

        doctorProfileRepo.save(doctorProfile);

        return savedUser;
    }
}
