package com.backend.backend.controller;

import com.backend.backend.model.LoginRequest;
import com.backend.backend.model.SignupRequest;
import com.backend.backend.model.Users;
import com.backend.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
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
    public ResponseEntity<?> signup(@RequestBody SignupRequest request) {
        try {
            Users saved = userService.register(
                    request.getEmail(),
                    request.getPassword(),
                    request.getRole(),
                    request.getName()
            );
            return ResponseEntity.ok(saved);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}