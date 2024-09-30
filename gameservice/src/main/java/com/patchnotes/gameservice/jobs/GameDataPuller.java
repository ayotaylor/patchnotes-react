package com.patchnotes.gameservice.jobs;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.patchnotes.gameservice.service.GameApiService;

@Component
public class GameDataPuller implements CommandLineRunner{

    private final GameApiService gameApiService;

    public GameDataPuller(GameApiService gameApiService) {
        this.gameApiService = gameApiService;
    }

    // public void fetchAndStoreGames(int limit, int offset) {
    //     String requestBody = buildRequestBody(limit, offset);
    //     JsonNode response = callIgdbApi(requestBody);
    //     List<Game> games = mapResponseToGames(response);
    //     storeGames(games);
    // }

    @Scheduled(fixedDelay = 24 * 60 * 60 * 1000) // Run every 24 hours
    public void fetchGamesFromApi()
    {
        gameApiService.fetchAllGames();
    }

    @Override
    @Profile("!production")
    public void run(String... args) {
        if (args.length > 0 && args[0].equals("--sync-igdb")) {
            testfetchGames();
        }
    }

    public void testfetchGames() {
        System.out.println("Starting Game sync job...");
        long startTime = System.currentTimeMillis();

        gameApiService.fetchAllGames();

        long endTime = System.currentTimeMillis();
        System.out.println("Game sync job completed in " + (endTime - startTime) + " ms");
    }
}
