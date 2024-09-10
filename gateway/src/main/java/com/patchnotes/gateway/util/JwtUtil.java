package com.patchnotes.gateway.util;

import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.Collection;
import java.util.stream.Collectors;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtUtil {
    @Value("${jwt.secret}")
    private String secretKey;

    @Value("${jwt.expiration}")
    private long jwtExpiration;


    public String extractUsername(Claims claims) {
        return claims.getSubject();
    }

    public Collection<GrantedAuthority> extractAuthorities(Claims claims) {
        return Arrays.stream(claims.get("roles", String.class).split(","))
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
    }

    public Claims validateTokenAndGetClaims(String token) {
        return extractAllClaims(token);
    }

    public Claims extractAllClaims(String token) {
        return Jwts
                .parser()
                .verifyWith(getSignInKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    private SecretKey getSignInKey() {
        byte[] keyBytes = secretKey.getBytes(StandardCharsets.UTF_8);
        return Keys.hmacShaKeyFor(keyBytes);
        // return new SecretKeySpec(bytes, "HmacSHA256");
    }
/*
    // public String extractUsername(String token) {
    //     return extractClaim(token, Claims::getSubject);
    // }

    // public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
    //     final Claims claims = extractAllClaims(token);
    //     return claimsResolver.apply(claims);
    // }

    // public long getExpirationTime() {
    //     return jwtExpiration;
    // }

    // public boolean isTokenValid(String token, String username) {
    //     final String extractedUsername = extractUsername(token);
    //     return (extractedUsername.equals(username) && !isTokenExpired(token));
    // }

    // public boolean validateToken(String token) {
    //     try {
    //         Jwts
    //             .parser()
    //             .verifyWith(getSignInKey())
    //             .build()
    //             .parseSignedClaims(token);
    //         return true;
    //     } catch (SignatureException | ExpiredJwtException e) {
    //         return false;
    //     }
    // }

    // // Extract Authentication from JWT Token
    // public Authentication getAuthenticationFromToken(String token) {
    //     Claims claims = extractAllClaims(token);

    //     String username = claims.getSubject();
    //     List<String> roles = (List<String>) claims.get("roles");

    //     var authorities = roles.stream()
    //                            .map(SimpleGrantedAuthority::new)
    //                            .collect(Collectors.toList());

    //     return new UsernamePasswordAuthenticationToken(username, null, authorities);
    // }

    // private boolean isTokenExpired(String token) {
    //     return extractExpiration(token).before(new Date());
    // }

    // private Date extractExpiration(String token) {
    //     return extractClaim(token, Claims::getExpiration);
    // }
    */
}
