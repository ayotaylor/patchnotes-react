package com.patchnotes.gameservice.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.patchnotes.gameservice.dto.GameDto;
import com.patchnotes.gameservice.dto.SimilarGamesDto;
import com.patchnotes.gameservice.model.Game;
import com.patchnotes.gameservice.repo.GameRepository;
import com.patchnotes.gameservice.util.GameDtoConverter;

@Service
public class GameService {

    private GameRepository gameRepo;
    private GameDtoConverter gameConverter;

    public GameService(GameRepository gameRepo, GameDtoConverter gameConverter) {
        this.gameRepo = gameRepo;
        this.gameConverter = gameConverter;
    }

    public GameDto getGameById(Long id) {
        Optional<Game> game = gameRepo.findById(id);

        return game.isPresent() ? convertToGameResponse(game.get()) : null;
    }

    public GameDto convertToGameResponse(Game game)
    {
        GameDto dto = gameConverter.convertToDTO(game);
        if (dto.getSimilarGames() != null) {
            for (SimilarGamesDto similarGame : dto.getSimilarGames()) {
                similarGame.setCover(fetchGameCover(similarGame.getIgbdId()));
            }
        }

        return dto;
    }

    public String fetchGameCover(Long id) {

        Game game = gameRepo.findByIgdbId(id);

        return game!= null ? game.getCover() : null;
    }
}
