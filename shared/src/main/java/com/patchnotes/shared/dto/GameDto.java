package com.patchnotes.shared.dto;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.patchnotes.shared.model.game.Category;
import com.patchnotes.shared.model.game.RegionReleaseDate;
import com.patchnotes.shared.model.game.SimilarGames;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class GameDto {

    private Long id;
    private Long igdbId;
    private String name;
    private Set<String> alternativeNames;
    private String summary;
    private String storyLine;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate firstReleaseDate;
    private String releaseStatus;
    //@JsonDeserialize(using = RegionReleaseDateListDeserializer.class)
    private List<RegionReleaseDate> regionReleaseDates;
    private String developer;
    private String publisher;
    private Set<String> platforms;
    private Set<String> genres;
    private List<String> bundles;
    private List<String> remakes;
    private List<String> remasters;
    //@JsonDeserialize(using = SimilarGamesListDeserializer.class)
    private List<SimilarGames> similarGames;  // come back to this
    public Category category;
    public Set<String> franchises;
    public Set<String> collections;
    public String cover;
    public String url;
    public Set<String> keywords;
    public Set<String> languages;
    public List<String> multiplayerModes;
    public List<String> playerPerspectives;
    private Double averageRating;
    private Integer totalReviews;
    private Integer backlogCount;
    private Integer playingCount;
    private Integer completedCount;

    public GameDto(GameDto other) {
        this.id = other.id;
        this.igdbId = other.igdbId;
        this.name = other.name;
        this.alternativeNames = other.alternativeNames != null ?
            new HashSet<>(other.alternativeNames) : null;
        this.summary = other.summary;
        this.storyLine = other.storyLine;
        this.firstReleaseDate = other.firstReleaseDate;
        this.releaseStatus = other.releaseStatus;
        this.regionReleaseDates = other.regionReleaseDates != null ?
            new ArrayList<>(other.regionReleaseDates) : null;
        this.developer = other.developer;
        this.publisher = other.publisher;
        this.platforms = other.platforms != null ?
            new HashSet<>(other.platforms) : null;
        this.genres = other.genres != null ?
            new HashSet<>(other.genres) : null;
        this.bundles = other.bundles != null ?
            new ArrayList<>(other.bundles) : null;
        this.remakes = other.remakes != null ?
            new ArrayList<>(other.remakes) : null;
        this.remasters = other.remasters != null ?
            new ArrayList<>(other.remasters) : null;
        this.similarGames = other.similarGames != null ?
            new ArrayList<>(other.similarGames) : null;
        this.category = other.category;
        this.franchises = other.franchises != null ?
            new HashSet<>(other.franchises) : null;
        this.collections = other.collections != null ?
            new HashSet<>(other.collections) : null;
        this.cover = other.cover;
        this.url = other.url;
        this.keywords = other.keywords != null ?
            new HashSet<>(other.keywords) : null;
        this.languages = other.languages != null ?
            new HashSet<>(other.languages) : null;
        this.multiplayerModes = other.multiplayerModes != null ?
            new ArrayList<>(other.multiplayerModes) : null;
        this.playerPerspectives = other.playerPerspectives != null ?
            new ArrayList<>(other.playerPerspectives) : null;
        this.averageRating = other.averageRating;
        this.totalReviews = other.totalReviews;
        this.backlogCount = other.backlogCount;
        this.playingCount = other.playingCount;
        this.completedCount = other.completedCount;
    }
}
