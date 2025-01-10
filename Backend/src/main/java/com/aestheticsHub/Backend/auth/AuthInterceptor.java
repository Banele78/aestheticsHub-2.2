package com.aestheticsHub.Backend.auth;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import com.aestheticsHub.Backend.DTO.UserLoginDTO;
import com.aestheticsHub.Backend.service.loginService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.util.Arrays;
import java.util.Collections;

@Component
public class AuthInterceptor implements HandlerInterceptor {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private loginService loginService;

    private String userid;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        System.out.println("AuthInterceptor: preHandle called");
    
        // Extract auth token from cookies
        String authToken = extractAuthTokenFromCookies(request);
    
        if (authToken == null) {
            System.out.println("No auth token found in cookies.");
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("Unauthorized: Please log in.");
            response.getWriter().flush();
            return false; // Stop request processing
        }
    
        // Validate the token
        if (!isTokenValid(authToken)) {
            System.out.println("Invalid or expired auth token.");
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("Unauthorized: Invalid or expired token.");
            response.getWriter().flush();
            return false; // Stop request processing
        }
    
        // Extract the user ID from the valid token
        String userId = jwtService.extractUsername(authToken);
        if (userId == null) {
            System.out.println("Token does not contain valid user ID.");
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("Unauthorized: Invalid token.");
            response.getWriter().flush();
            return false; // Stop request processing
        }
    
        // Set user ID for later use in the handler
        this.userid = userId;
        System.out.println("Auth token is valid. Access granted for user ID: " + userId);

        // Create an authentication token and set it in the SecurityContext
        // Here we assume the user has ROLE_USER authority, you can add more roles/authorities if needed
        UsernamePasswordAuthenticationToken authentication = 
            new UsernamePasswordAuthenticationToken(userId, null, Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER")));

        // Set the authentication object in the SecurityContext
        SecurityContextHolder.getContext().setAuthentication(authentication);
    
        return true; // Continue processing the request
    }
    

    public void setId(String userid){
        this.userid=userid;
    }

    public String getId(){
        return userid;
    }

    private String extractAuthTokenFromCookies(HttpServletRequest request) {
        // Check if any cookies are present in the request
        Cookie[] cookies = request.getCookies();
        
        if (cookies == null || cookies.length == 0) {
            System.out.println("No cookies found in the request.");
            return null;
        }
    
        // Log all cookies to verify if they are being received
        Arrays.stream(cookies).forEach(cookie ->
            System.out.println("Cookie Name: " + cookie.getName() + ", Value: " + cookie.getValue())
        );
    
        // Filter to find the 'authToken' cookie
        return Arrays.stream(cookies)
                     .filter(cookie -> "authToken".equals(cookie.getName()))
                     .map(Cookie::getValue)
                     .findFirst()
                     .orElse(null);
    }
    

    private boolean isTokenValid(String token) {
        try {
            String username = jwtService.extractUsername(token);
            return jwtService.validateToken(token, username);
        } catch (Exception e) {
            System.err.println("Error validating token: " + e.getMessage());
            return false;
        }
    }
}
