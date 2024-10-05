package com.patchnotes.gameservice.dto;

import com.patchnotes.gameservice.model.Category;
import com.patchnotes.gameservice.model.Region;
import com.patchnotes.gameservice.model.RegionReleaseDate;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
public class GameDto {

    private Long id;
    private Long igdbId;
    private String name;
    private List<String> alternativeNames;
    private String summary;
    private String storyLine;
    private LocalDate firstReleaseDate;
    private String releaseStatus;
    private List<RegionReleaseDate> regionReleaseDates;
    private String developer;
    private String publisher;
    private List<String> platforms;
    private List<String> genres;
    private List<String> bundles;
    private List<String> remakes;
    private List<String> remasters;
    private List<SimilarGamesDto> similarGames;  // come back to this
    public Category category;
    public String franchise;
    public List<String> franchises;
    public List<String> collections;
    public String cover;
    public String url;
    public String versionParent;
    public String parentGame;
    public String versionTitle;
    public List<String> keywords;
    public List<String> languages;
    public List<String> multiplayerModes;
    public List<String> playerPerspectives;
    private Double averageRating;
    private Integer backlogCount;
    private Integer playingCount;
    private Integer completedCount;
}
