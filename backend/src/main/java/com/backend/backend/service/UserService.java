package com.backend.backend.service;

import com.backend.backend.model.Users;
import com.backend.backend.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepo;

    public Users register(String email, String password, String role, String name) {

        Users user = new Users();
        user.setEmail(email);
        user.setName(name);
        user.setPassword(password);
        user.setRole(role);

        return userRepo.save(user);
    }

    public Users login(String email, String password) {

        Users user = userRepo.findByEmail(email);

        if (user == null) {
            return null;
        }

        if (user.getPassword().equals(password)) {
            return user;
        }

        return null;
    }
}