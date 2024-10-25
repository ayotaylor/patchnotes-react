package com.patchnotes.gameservice.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.patchnotes.gameservice.entity.GameEntity;
import com.patchnotes.gameservice.exception.GameServiceException;
import com.patchnotes.gameservice.repo.GameRepository;
import com.patchnotes.gameservice.util.GameDtoConverter;
import com.patchnotes.shared.dto.GameDto;
import com.patchnotes.shared.model.game.SimilarGames;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class GameService {

    private final GameRepository gameRepo;
    //private final UserGameStatusRepository userGameStatusRepo;
    private final GameDtoConverter gameConverter;

    public GameService(GameRepository gameRepo, GameDtoConverter gameConverter) {
        this.gameRepo = gameRepo;
        //this.userGameStatusRepo = userGameStatusRepo;
        this.gameConverter = gameConverter;
    }

    public GameDto getGameById(Long id) {
        Optional<GameEntity> game = gameRepo.findById(id);

        return game.isPresent() ? convertToGameResponse(game.get()) : null;
    }

    public List<GameDto> getGamesById(List<Long> gameIds) {
        try {
            List<GameDto> gamesDto = new ArrayList<>();
            List<GameEntity> games = gameRepo.findAllByIdIn(gameIds);
            games.forEach(g -> {
                GameDto dto = convertToGameResponse(g);
                // Create defensive copies of lists
                if (dto.getRegionReleaseDates() != null) {
                    dto.setRegionReleaseDates(new ArrayList<>(dto.getRegionReleaseDates()));
                }
                if (dto.getSimilarGames() != null) {
                    dto.setSimilarGames(new ArrayList<>(dto.getSimilarGames()));
                }
                log.debug("DTO before adding to list - Similar Games: {}",
                    dto.getSimilarGames());
                log.debug("DTO before adding to list - Region Release Dates: {}",
                    dto.getRegionReleaseDates());
                gamesDto.add(new GameDto(dto));

                int index = gamesDto.size() - 1;
                log.debug("DTO after adding to list - Similar Games: {}",
                    gamesDto.get(index).getSimilarGames());
                log.debug("DTO after adding to list - Region Release Dates: {}",
                    gamesDto.get(index).getRegionReleaseDates());
            });

            return gamesDto;
        } catch (GameServiceException e) {
            log.error("Error processing request for game ids {}: {}", gameIds, e.getMessage());
            throw new GameServiceException("Failed to fetch games", e);
            //return ResponseEntity.internalServerError().build();
        }
    }

    public GameDto convertToGameResponse(GameEntity game)
    {
        GameDto dto = gameConverter.convertToDTO(game);
        List<SimilarGames> similarGames = new ArrayList<>(dto.getSimilarGames());
        if (dto.getSimilarGames() != null) {
            for (SimilarGames similarGame : similarGames) {
                Entry<Long, String> idCover = fetchGameCoverAndId(similarGame.getIgdbId());
                similarGame.setId(idCover.getKey());
                similarGame.setCover(idCover.getValue());
            }
            dto.setSimilarGames(similarGames);
        }

        return dto;
    }

    public Entry<Long, String> fetchGameCoverAndId(Long igdbId) {
        Entry<Long, String> gameIdCover = null;
        GameEntity game = gameRepo.findByIgdbId(igdbId);
        if (game!=null) {
            gameIdCover = Map.entry(game.getId(), game.getCover());
            return gameIdCover;
        }
        return gameIdCover;
    }
}
