package com.backend.backend.controller;

import com.backend.backend.service.DoctorLoginService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/doctor/login")
public class DoctorLoginController {

    public final DoctorLoginService doctorLoginService;

    public DoctorLoginController(DoctorLoginService doctorLoginService) {
        this.doctorLoginService = doctorLoginService;
    }
}
