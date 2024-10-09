package com.patchnotes.gameservice.service;

import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;
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
                Entry<Long, String> idCover = fetchGameCoverAndId(similarGame.getIgdbId());
                similarGame.setId(idCover.getKey());
                similarGame.setCover(idCover.getValue());
            }
        }

        return dto;
    }

    public Entry<Long, String> fetchGameCoverAndId(Long igdbId) {
        Entry<Long, String> gameIdCover = null;
        Game game = gameRepo.findByIgdbId(igdbId);
        if (game!=null) {
            gameIdCover = Map.entry(game.getId(), game.getCover());
        }
        return gameIdCover.getKey() != null ? gameIdCover : null;
    }
}
