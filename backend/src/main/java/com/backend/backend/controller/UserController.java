package com.backend.backend.controller;

import com.backend.backend.model.LoginRequest;
import com.backend.backend.model.SignupRequest;
import com.backend.backend.model.Users;
import com.backend.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public Users login(@RequestBody LoginRequest request) {

        Users user = userService.login(request.getEmail(), request.getPassword());

        if (user == null) {
            throw new RuntimeException("Invalid credentials");
        }

        return user;
    }



    @PostMapping("/signup")
    public Users signup(@RequestBody SignupRequest request) {

        return userService.register(
                request.getEmail(),
                request.getName(),
                request.getPassword(),
                request.getRole()
        );
    }
}