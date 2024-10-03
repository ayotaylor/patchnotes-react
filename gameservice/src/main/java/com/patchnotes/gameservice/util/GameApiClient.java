package com.patchnotes.gameservice.util;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.JsonNode;

@Component
public class GameApiClient {

    private final String clientId = "bh9zke91pvzr3e6hsb0giy596xorw9";
    private final String accessToken = "hekt8ci8kx98kw7sg5vxmmtj5jqnv2";
    private final String apiUrl = "https://api.igdb.com/v4/games";

    private final RestTemplate restTemplate;

    public GameApiClient(RestTemplate restTemplate)
    {
        this.restTemplate = restTemplate;
    }

    public JsonNode getGames(String requestBody) {

        try {
            HttpHeaders headers = new HttpHeaders();
            headers.set("Client-ID", clientId);
            headers.set("Authorization", "Bearer " + accessToken);
            headers.setContentType(MediaType.TEXT_PLAIN);

            HttpEntity<String> entity = new HttpEntity<>(requestBody, headers);

            ResponseEntity<JsonNode> response = restTemplate.exchange(
                apiUrl,
                HttpMethod.POST,
                entity,
                JsonNode.class
            );

            return response.getBody();
        } catch (Exception e) {
            throw new RuntimeException("Failed to parse game API response", e);
        }
    }
}
