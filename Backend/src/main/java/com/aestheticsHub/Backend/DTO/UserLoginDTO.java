package com.aestheticsHub.Backend.DTO;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;


public class UserLoginDTO {

    @Email(message = "Invalid email format")
    @NotBlank(message = "Email is required")
    private String email;

    @NotBlank(message = "Password is required")
    private String password;

    private static String token;

    public static String getToken() {
        return token;
    }

    public  void setToken(String token) {
        this.token = token;
    }

    // Constructors
    public UserLoginDTO() {}

    public UserLoginDTO(String email, String password) {
        this.email = email;
        this.password = password;
    }

    // Getters and Setters
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}

