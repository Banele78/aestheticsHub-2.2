package com.aestheticsHub.Backend.utility;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

public class PasswordUtil {

    private static final PasswordEncoder encoder = new BCryptPasswordEncoder();

    public static String hashPassword(String password){
        return encoder.encode(password);
    }

    public static boolean matchPassword(String rawPassword, String hashedPassword){
        return encoder.matches(rawPassword, hashedPassword);
    }

}
