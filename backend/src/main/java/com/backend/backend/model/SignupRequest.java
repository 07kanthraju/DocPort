package com.backend.backend.model;

public class SignupRequest {

    private String email;
    private String name;
    private String password;
    private String role;

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public String getRole() {
        return role;
    }
    public String getName(){
        return name;
    }
}