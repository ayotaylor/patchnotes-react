package com.patchnotes.gameservice.service;

import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.patchnotes.shared.dto.GameDto;
import com.patchnotes.shared.model.SimilarGames;
import com.patchnotes.gameservice.model.GameEntity;
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
        Optional<GameEntity> game = gameRepo.findById(id);

        return game.isPresent() ? convertToGameResponse(game.get()) : null;
    }

    public List<GameDto> getGamesById(List<Long> gameIds) {
        List<GameEntity> games = gameRepo.findAllByIdIn(gameIds);

        return games.stream().map(game -> {
                return convertToGameResponse(game);
            })
            .collect(Collectors.toList());
    }

    public GameDto convertToGameResponse(GameEntity game)
    {
        GameDto dto = gameConverter.convertToDTO(game);
        if (dto.getSimilarGames() != null) {
            for (SimilarGames similarGame : dto.getSimilarGames()) {
                Entry<Long, String> idCover = fetchGameCoverAndId(similarGame.getIgdbId());
                similarGame.setId(idCover.getKey());
                similarGame.setCover(idCover.getValue());
            }
        }

        return dto;
    }

    public Entry<Long, String> fetchGameCoverAndId(Long igdbId) {
        Entry<Long, String> gameIdCover = null;
        GameEntity game = gameRepo.findByIgdbId(igdbId);
        if (game!=null) {
            gameIdCover = Map.entry(game.getId(), game.getCover());
        }
        return gameIdCover.getKey() != null ? gameIdCover : null;
    }
}
