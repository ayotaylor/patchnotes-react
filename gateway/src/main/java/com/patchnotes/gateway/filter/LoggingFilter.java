package com.patchnotes.gateway.filter;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;

import reactor.core.publisher.Mono;

@Component
public class LoggingFilter implements GlobalFilter {
    private static final Logger log = LoggerFactory.getLogger(LoggingFilter.class);

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        log.info("Request: {} {}", exchange.getRequest().getMethod(), exchange.getRequest().getURI());
        exchange.getRequest().getHeaders().forEach((name, values) -> {
            values.forEach(value -> log.info("Header: {}={}", name, value));
        });
        return chain.filter(exchange).then(Mono.fromRunnable(() -> {
            log.info("Response status: {}", exchange.getResponse().getStatusCode());
        }));
    }
}
