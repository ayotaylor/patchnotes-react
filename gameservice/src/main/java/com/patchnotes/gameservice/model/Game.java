package com.patchnotes.gameservice.model;

import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "game")
public class Game {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private Long igdbId;

    private String name;

    @Column(columnDefinition = "JSON")
    private String alternativeNames;

    @Column(columnDefinition = "TEXT")
    private String summary;
    @Column(columnDefinition = "TEXT")
    private String storyLine;

    private LocalDate firstReleaseDate;
    private String releaseStatus;

    @Enumerated(EnumType.STRING)
    private Region region;
    private LocalDate releaseDate;

    private String developer;
    private String publisher;

    @Column(columnDefinition = "JSON")
    private String platforms;

    @Column(columnDefinition = "JSON")
    private String genres;

    @Column(columnDefinition = "JSON")
    private String bundles;

    @Column(columnDefinition = "JSON")
    private String remakes;

    @Column(columnDefinition = "JSON")
    private String remasters;

    @Column(columnDefinition = "JSON")
    private String similarGames;

    @Enumerated(EnumType.STRING)
    public Category category;

    //TODO: deccide if you need main or all possible franchises
    public String franchise;
    @Column(columnDefinition = "JSON")
    public String franchises;

    @Column(columnDefinition = "JSON")
    public String collections;

    // come back to this. what's the best datatype
    public String cover;

    public String url;

    // TODO: get from version_parent.name/parent_game.name. parentGame!=null?parentGame:versionParent
    public String versionParent;
    public String parentGame;
    public String versionTitle;

    @Column(columnDefinition = "JSON")
    public String keywords;

    @Column(columnDefinition = "JSON")
    public String languages;

    @Column(columnDefinition = "JSON")
    public String multiplayerModes;

    @Column(columnDefinition = "JSON")
    public String playerPerspectives;

    private Double averageRating;
    private Integer backlogCount;
    private Integer playingCount;
    private Integer completedCount;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // @Column(columnDefinition = "JSON")
    // private String dlcs;

    // @Column(columnDefinition = "JSON")
    // private String expansions;
}
