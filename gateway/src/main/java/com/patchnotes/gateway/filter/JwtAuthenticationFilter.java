package com.patchnotes.gateway.filter;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.ReactiveSecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;


import com.patchnotes.gateway.util.JwtUtil;

import io.jsonwebtoken.Claims;
import reactor.core.publisher.Mono;

import java.util.Arrays;
import java.util.List;

@Component
public class JwtAuthenticationFilter implements WebFilter {

    private final JwtUtil jwtUtil;

    private final List<String> excludedPaths = Arrays.asList("/api/auth/authenticate", "/api/auth/register");

    public JwtAuthenticationFilter(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Override
    public @NonNull Mono<Void> filter(
        @NonNull ServerWebExchange exchange,
        @NonNull WebFilterChain chain) {

            ServerHttpRequest request = exchange.getRequest();
            String path = request.getPath().value();

            // Skip authentication for excluded paths
            if (excludedPaths.stream().anyMatch(path::startsWith)) {
                return chain.filter(exchange);
            }

            String authHeader = request.getHeaders().getFirst(HttpHeaders.AUTHORIZATION);

            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                String token = authHeader.substring(7);
                return validateToken(token)
                        .flatMap(claims -> {
                            String username = jwtUtil.extractUsername(claims);
                            UsernamePasswordAuthenticationToken auth =
                                new UsernamePasswordAuthenticationToken(username, null, jwtUtil.extractAuthorities(claims));
                            return chain.filter(exchange)
                                    .contextWrite(ReactiveSecurityContextHolder.withAuthentication(auth));
                        })
                        .onErrorResume(e -> handleAuthenticationError(exchange, e));
            }

            return chain.filter(exchange);
    }

    private Mono<Void> handleAuthenticationError(ServerWebExchange exchange, Throwable error) {
        ServerHttpResponse response = exchange.getResponse();
        response.setStatusCode(HttpStatus.UNAUTHORIZED);
        return response.writeWith(Mono.just(response.bufferFactory()
                .wrap(("Authentication error: " + error.getMessage()).getBytes())));
    }

    private Mono<Claims> validateToken(String token) {
        return Mono.fromCallable(() -> jwtUtil.validateTokenAndGetClaims(token))
                .onErrorMap(e -> new RuntimeException("Invalid token", e));
    }
}
