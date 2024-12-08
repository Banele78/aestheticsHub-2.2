package com.aestheticsHub.Backend.auth;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Date;

import javax.crypto.SecretKey;

@Service
public class JwtService {

    @Value("${jwt.secret.key}")
    private String secretKey;

     // Generate a secure key of 256 bits using the Keys utility for HS256
     SecretKey key = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    // Set JWT expiration time (e.g., 1 hour)
    private static final long EXPIRATION_TIME = 3600000L;

    // Generate a JWT token
    public  String generateToken(String username) {
       
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                 .signWith(key)
                .compact();
    }

    // Extract the username from the token (usually the "subject")
    public   String extractUsername(String token) {
        return extractClaims(token).getSubject();
    }

    // Validate the JWT token
    public  boolean validateToken(String token, String username) {
        String extractedUsername = extractUsername(token);
        return (extractedUsername.equals(username) && !isTokenExpired(token));
    }

    // Check if the token has expired
    private   boolean isTokenExpired(String token) {
        return extractClaims(token).getExpiration().before(new Date());
    }

    // Extract claims (payload) from the token
    private  Claims extractClaims(String token) {
            
        return Jwts.parser()
                .setSigningKey(key)
                .parseClaimsJws(token)
                .getBody();
    }
}

