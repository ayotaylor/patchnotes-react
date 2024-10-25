package com.patchnotes.userservice.model;

import java.time.LocalDateTime;

import com.patchnotes.shared.entity.UserGameStatusId;
import com.patchnotes.shared.enums.GameStatus;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "user_game_status")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserGameStatusEntity {
    @EmbeddedId
    private UserGameStatusId id;

    @MapsId("userId")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private UserEntity user;

    // @Column(name = "game_id", insertable = false, updatable = false)
    // private Long gameId;

    public Long getGameId() {
        return id != null ? id.getGameId() : null;
    }

    @Enumerated(EnumType.STRING)
    private GameStatus status;

    // private Integer rating;

    // TODO: come back to this. should i include the ability to add status for each game platform?
    // @ManyToOne(fetch = FetchType.LAZY)
    // @JoinColumn(name = "platform_id")
    // private Platform platform;

    private LocalDateTime lastUpdated;

    // private String notes;
}
