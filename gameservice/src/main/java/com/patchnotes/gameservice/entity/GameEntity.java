package com.patchnotes.gameservice.entity;

import com.patchnotes.shared.model.game.Category;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Set;
import java.util.HashSet;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "game")
public class GameEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "game_sequence")
    @SequenceGenerator(name = "game_sequence", sequenceName = "game_seq")
    private Long id;

    @Column(unique = true, nullable = false)
    private Long igdbId;

    private String name;

    @OneToMany(mappedBy = "game", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<AlternativeNameEntity> alternativeNames;

    @Column(columnDefinition = "TEXT")
    private String summary;
    @Column(columnDefinition = "TEXT")
    private String storyLine;

    private LocalDate firstReleaseDate;
    private String releaseStatus;

    @Column(columnDefinition = "JSON")
    private String regionReleaseDate;

    private String developer;
    private String publisher;

    @ManyToMany(cascade = { CascadeType.PERSIST, CascadeType.MERGE })
    @JoinTable(name = "game_platforms", joinColumns = @JoinColumn(name = "game_id"), inverseJoinColumns = @JoinColumn(name = "platform_id"))
    private Set<PlatformEntity> platforms;

    @ManyToMany(cascade = { CascadeType.PERSIST, CascadeType.MERGE })
    @JoinTable(name = "game_genres", joinColumns = @JoinColumn(name = "game_id"), inverseJoinColumns = @JoinColumn(name = "genre_id"))
    private Set<GenreEntity> genres;

    @Column(columnDefinition = "JSON")
    private String bundles;

    @Column(columnDefinition = "JSON")
    private String remakes;

    @Column(columnDefinition = "JSON")
    private String remasters;

    // TODO: come back to this
    @Column(columnDefinition = "JSON")
    private String similarGames;

    @Enumerated(EnumType.STRING)
    public Category category;

    @ManyToMany(cascade = { CascadeType.PERSIST, CascadeType.MERGE })
    @JoinTable(name = "game_franchises", joinColumns = @JoinColumn(name = "game_id"), inverseJoinColumns = @JoinColumn(name = "franchise_id"))
    public Set<FranchiseEntity> franchises;

    @ManyToMany(cascade = { CascadeType.PERSIST, CascadeType.MERGE })
    @JoinTable(name = "game_collections", joinColumns = @JoinColumn(name = "game_id"), inverseJoinColumns = @JoinColumn(name = "collection_id"))
    private Set<GameCollectionEntity> collections;

    public String cover;

    public String url;

    @ManyToMany(cascade = { CascadeType.PERSIST, CascadeType.MERGE })
    @JoinTable(name = "game_keywords", joinColumns = @JoinColumn(name = "game_id"), inverseJoinColumns = @JoinColumn(name = "keyword_id"))
    public Set<KeywordEntity> keywords;

    @ManyToMany(cascade = { CascadeType.PERSIST, CascadeType.MERGE })
    @JoinTable(name = "game_languages", joinColumns = @JoinColumn(name = "game_id"), inverseJoinColumns = @JoinColumn(name = "language_id"))
    public Set<LanguageEntity> languages;

    @OneToMany(mappedBy = "game")
    private Set<UserGameStatusEntity> userStatuses;

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

    public void addAlternativeName(AlternativeNameEntity alternativeName) {
        if (this.alternativeNames == null) {
            this.alternativeNames = new HashSet<>();
        }
        this.alternativeNames.add(alternativeName);
        alternativeName.setGame(this);
    }

    public void setAlternativeNames(Set<AlternativeNameEntity> alternativeNames) {
        if (this.alternativeNames != null) {
            this.alternativeNames.clear();
        }
        this.alternativeNames = new HashSet<>();
        if (alternativeNames != null) {
            for (AlternativeNameEntity altName : alternativeNames) {
                altName.setGame(this);
                this.alternativeNames.add(altName);
            }
        }
    }
}
