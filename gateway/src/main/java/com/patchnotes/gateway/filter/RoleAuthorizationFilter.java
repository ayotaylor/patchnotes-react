// package com.patchnotes.gateway.filter;

// import org.springframework.security.access.AccessDeniedException;
// import org.springframework.stereotype.Component;
// import org.springframework.web.server.ServerWebExchange;
// import org.springframework.web.server.WebFilter;
// import org.springframework.web.server.WebFilterChain;

// import io.jsonwebtoken.lang.Arrays;
// import reactor.core.publisher.Mono;

// @Component
// public class RoleAuthorizationFilter implements WebFilter{
//     private final String[] allowedRoles;

//     public RoleAuthorizationFilter(String... allowedRoles) {
//         this.allowedRoles = allowedRoles;
//     }

//     @Override
//     public Mono<Void> filter(ServerWebExchange exchange, WebFilterChain chain) {
//         String role = exchange.getRequest().getHeaders().getFirst("X-User-Role");

//         if (role == null || !Arrays.asList(allowedRoles).contains(role)) {
//             return Mono.error(new AccessDeniedException("You do not have the required role"));
//         }

//         return chain.filter(exchange);
//     }
// }
