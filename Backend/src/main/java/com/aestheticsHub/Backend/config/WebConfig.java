package com.aestheticsHub.Backend.config;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.server.WebServerFactoryCustomizer;
import org.springframework.boot.web.servlet.server.ConfigurableServletWebServerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import com.aestheticsHub.Backend.auth.AuthInterceptor;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Autowired
    private AuthInterceptor authInterceptor;

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("https://aesthesticshub.netlify.app") // Replace with your frontend URL
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*")
                        .allowCredentials(true) // Allow credentials (cookies)
                        .exposedHeaders("Set-Cookie"); // Expose the Set-Cookie header
            }
        };
    }

    
    

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        // Register the interceptor for all requests or specific ones
        registry.addInterceptor(authInterceptor)
                .addPathPatterns("/api/**") // Ensure this path matches your endpoint
                .excludePathPatterns("/api/login", "/api/register", "/api/getUserProfile"); // Exclude public endpoints if needed
    }
}
