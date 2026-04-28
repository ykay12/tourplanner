package org.tour.tourplannerbackend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

// Der AuthInterceptor wird von Spring automatisch injected, weil er als @Component registriert ist.
// Dieser Interceptor prüft später bei Requests, ob ein gültiger Bearer Token vorhanden ist.

@Configuration
public class WebConfig implements WebMvcConfigurer {
    private final AuthInterceptor authInterceptor;

    public WebConfig(AuthInterceptor authInterceptor) {
        this.authInterceptor = authInterceptor;
    }

    //     Diese Methode registriert Interceptors für Spring MVC.
    //     addPathPatterns("/**") -> Interceptor soll für ALLE Endpoints laufen excludePathPatterns(...) ->
    //     Diese Endpoints bleiben öffentlich erreichbar (Login/Register brauchen noch keinen Token)
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(authInterceptor).addPathPatterns("/**").excludePathPatterns("/auth/login", "/auth/register");
    }
}
