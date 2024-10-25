package com.patchnotes.shared.model.game;

import java.time.LocalDate;
import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Game {
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
    private List<SimilarGames> similarGames;  // come back to this
    public Category category;
    public List<String> franchises;
    public List<String> collections;
    public String cover;
    public String url;
    public List<String> keywords;
    public List<String> languages;
    public List<String> multiplayerModes;
    public List<String> playerPerspectives;
    private double averageRating;
    private int totalReviews;
    private int backlogCount;
    private int playingCount;
    private int completedCount;

     // Business logic methods
    // public boolean isNewRelease() { /* implementation */ }
    // public String getRatingCategory() { /* implementation */ }
    // public boolean isMultiPlatform() { /* implementation */ }
    // public boolean isCrossGenre() { /* implementation */ }
}
