package com.aestheticsHub.Backend.service;

import org.springframework.stereotype.Service;

import com.aestheticsHub.Backend.DTO.UserLoginDTO;

@Service
public class loginService {

    public static String getToken() {
        // Validate or process the DTO data as needed
        return UserLoginDTO.getToken();
    }
}

