package com.patchnotes.shared.dto;

import com.patchnotes.shared.model.Category;
import com.patchnotes.shared.model.RegionReleaseDate;
import com.patchnotes.shared.model.SimilarGames;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

@Getter
@Setter
public class GameDto {

    private Long id;
    private Long igdbId;
    private String name;
    private Set<String> alternativeNames;
    private String summary;
    private String storyLine;
    private LocalDate firstReleaseDate;
    private String releaseStatus;
    private List<RegionReleaseDate> regionReleaseDates;
    private String developer;
    private String publisher;
    private Set<String> platforms;
    private Set<String> genres;
    private List<String> bundles;
    private List<String> remakes;
    private List<String> remasters;
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
}
