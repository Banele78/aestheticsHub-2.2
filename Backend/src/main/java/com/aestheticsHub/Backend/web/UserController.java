package com.aestheticsHub.Backend.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import org.springframework.web.bind.annotation.RestController;

import com.aestheticsHub.Backend.DTO.UserLoginDTO;
import com.aestheticsHub.Backend.auth.AuthInterceptor;
import com.aestheticsHub.Backend.auth.JwtService;
import com.aestheticsHub.Backend.model.User;
import com.aestheticsHub.Backend.model.UserProfile;
import com.aestheticsHub.Backend.service.UserService;
import com.aestheticsHub.Backend.utility.PasswordUtil;
import jakarta.servlet.http.Cookie;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;

@RestController


public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtService jwtService;

     @Autowired
    private AuthInterceptor authInterceptor;

    @GetMapping
    public List<User> getAllUsers(){
        return userService.getAllUsers();
    }

    // @GetMapping("/{id}")
    // public User getUserById(@PathVariable Long id){
    //     return userService.getUserById(id);
    // }

    @GetMapping("/api/getUser")    
    public ResponseEntity<User> getUserprofile(){
       String userId = authInterceptor.getId();
        User user= userService.getUserById(Long.valueOf(userId));
         
        return ResponseEntity.ok(user);
    }

    // @GetMapping("/{email}")
    // public User getUserByEmail(@PathVariable String  email){
    //     return userService.getUserByEmail(email);
    // }
    @PostMapping("/api/login")
    public ResponseEntity<String> loginUser(@RequestBody UserLoginDTO loginDTO, HttpServletResponse response) {
        // Fetch the user by email
        User user = userService.getUserByEmail(loginDTO.getEmail());
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
    
        // Check if the password matches
        if (!PasswordUtil.matchPassword(loginDTO.getPassword(), user.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid password");
        }

// Authenticate user and generate JWT token
String token = jwtService.generateToken(String.valueOf(user.getId()));
loginDTO.setToken(token);

// Create the cookie
Cookie cookie = new Cookie("authToken", token);
cookie.setHttpOnly(true);
cookie.setSecure(true); // 'true' for HTTPS in production
cookie.setPath("/");
cookie.setMaxAge(17 * 24 * 60 * 60); // 1 week expiry

// Add the cookie (basic attributes)
response.addCookie(cookie);

// Manually add SameSite=None
String sameSiteCookie = String.format(
    "%s=%s; Path=%s; HttpOnly; Secure; SameSite=None; Max-Age=%d",
    cookie.getName(),
    cookie.getValue(),
    cookie.getPath(),
    cookie.getMaxAge()
);
response.addHeader("Set-Cookie", sameSiteCookie);
        return ResponseEntity.ok("Login successful " );
    }
    
//Register user
      @PostMapping("/api/register")
    public ResponseEntity<String> creatUser(@Valid @RequestBody User user, BindingResult result) {
        if (result.hasErrors()) {
            return ResponseEntity.badRequest().body("Invalid user data");
        }

      // Check if a user with the given email already exists
    if (userService.getUserByEmail(user.getEmail()) != null) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body("Email already exists");
    }

        userService.saveUser(user);
        return ResponseEntity.ok("User registered successfully");
    }



    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id){
        userService.deleteUser(id);
    }

    @GetMapping("/api/auth")
public ResponseEntity<String> getProtectedData() {

   // authInterceptor.preHandle(request, response, authInterceptor);
    return ResponseEntity.ok("You are authenticated!");
}

}
