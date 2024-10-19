package com.patchnotes.gameservice;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Profile;
import org.springframework.retry.annotation.EnableRetry;
import org.springframework.scheduling.annotation.EnableScheduling;

import com.patchnotes.gameservice.jobs.GameDataPuller;

@SpringBootApplication
@EnableDiscoveryClient
@EnableScheduling
@EnableRetry
public class GameserviceApplication {

	public static void main(String[] args) {
		SpringApplication.run(GameserviceApplication.class, args);
	}

	@Bean
    @Profile("!production")
    public CommandLineRunner syncCommand(GameDataPuller gameDataPuller) {
        return args -> {
            if (args.length > 0 && args[0].equals("--test-game-fetch")) {
                gameDataPuller.testfetchGames();
                // Exit after sync is complete
                System.exit(0);
            }
        };
    }
}
