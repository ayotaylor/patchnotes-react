package com.patchnotes.gameservice.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.retry.annotation.Backoff;
import org.springframework.retry.annotation.Retryable;
import org.springframework.stereotype.Component;
import org.springframework.web.client.HttpStatusCodeException;
import org.springframework.web.client.ResourceAccessException;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.JsonNode;

@Component
public class GameApiClient {
    private static final Logger logger = LoggerFactory.getLogger(GameApiClient.class);

    private final String clientId = "bh9zke91pvzr3e6hsb0giy596xorw9";
    private final String accessToken = "hekt8ci8kx98kw7sg5vxmmtj5jqnv2";
    private final String apiUrl = "https://api.igdb.com/v4/games";

    private final RestTemplate restTemplate;

    public GameApiClient(RestTemplate restTemplate)
    {
        this.restTemplate = restTemplate;
    }

    @Retryable(
        value = {ResourceAccessException.class, HttpStatusCodeException.class},
        maxAttempts = 3,
        backoff = @Backoff(delay = 5000)
    )
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

            if (response.getStatusCode() == HttpStatus.OK) {
                JsonNode body = response.getBody();
                if (body == null || body.isEmpty()) {
                    logger.warn("Received empty response body from IGDB API");
                } else {
                    logger.info("Successfully parsed response body");
                }
                return body;
            } else {
                logger.error("Unexpected status code: {}", response.getStatusCode());
                throw new RuntimeException("Unexpected status code: " + response.getStatusCode());
            }
        } catch (HttpStatusCodeException e) {
            logger.error("HTTP error occurred: {} - {}", e.getStatusCode(), e.getResponseBodyAsString());
            throw e;
        } catch (ResourceAccessException e) {
            logger.error("Network error occurred", e);
            throw e;
        } catch (Exception e) {
            logger.error("Unexpected error occurred while calling IGDB API", e);
            throw new RuntimeException("Failed to get games from IGDB API", e);
        }
    }
}
