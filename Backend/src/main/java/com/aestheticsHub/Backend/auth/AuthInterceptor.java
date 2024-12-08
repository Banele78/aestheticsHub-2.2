package com.aestheticsHub.Backend.auth;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import com.aestheticsHub.Backend.DTO.UserLoginDTO;
import com.aestheticsHub.Backend.service.loginService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.util.Arrays;

@Component
public class AuthInterceptor implements HandlerInterceptor {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private loginService loginService;

    private Long id;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        System.out.println("AuthInterceptor: preHandle called");

       
//     // Log all incoming headers
//     request.getHeaderNames().asIterator().forEachRemaining(headerName -> 
//     System.out.println(headerName + ": " + request.getHeader(headerName))
// );

// Log cookies
//Cookie[] cookies = request.getCookies();
        // Extract auth token from cookies
        //String authToken = extractAuthTokenFromCookies(request);
        String auToken =loginService.getToken();
        String id = jwtService.extractUsername(auToken);

        setId(Long.valueOf(id));
        if (auToken == null) {
            System.out.println("No auth token found in cookies." + auToken);
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.getWriter().write("Unauthorized: Please log in.");
        response.getWriter().flush();
            return false;
        }

        // // Validate the token
        //  if (!isTokenValid(authToken)) {
        //     System.out.println("Invalid or expired auth token.");
        // //     response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized: Invalid or expired token.");
        //   return false;
        //  }

        System.out.println("Auth token is valid. Access granted." + id);
        return true;
    }

    public void setId(Long id){
        this.id=id;
    }

    public Long getId(){
        return id;
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
