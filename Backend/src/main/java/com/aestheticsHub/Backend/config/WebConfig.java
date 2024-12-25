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
                        .allowedOrigins("http://192.168.0.238:5173") // Replace with your frontend URL
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*")
                        .allowCredentials(true) // Allow credentials (cookies)
                        .exposedHeaders("Set-Cookie"); // Expose the Set-Cookie header
            }
        };
    }

     @Bean
    public WebServerFactoryCustomizer<ConfigurableServletWebServerFactory> webServerFactoryCustomizer() {
        return factory -> factory.addInitializers(servletContext -> {
            servletContext.getSessionCookieConfig().setName("SESSIONID");
            servletContext.getSessionCookieConfig().setHttpOnly(true);
            servletContext.getSessionCookieConfig().setSecure(false); // HTTPS only
            // Unfortunately, SameSite cannot be directly configured here in standard Java APIs.
        });
    }
    

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        // Register the interceptor for all requests or specific ones
        registry.addInterceptor(authInterceptor)
                .addPathPatterns("/api/**") // Ensure this path matches your endpoint
                .excludePathPatterns("/api/login", "/api/register"); // Exclude public endpoints if needed
    }
}
