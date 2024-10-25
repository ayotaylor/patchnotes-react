package com.patchnotes.shared.model.game;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class RegionReleaseDate {
    private Region region;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate date;

    public RegionReleaseDate(Region region, LocalDate date) {
        this.region = region;
        this.date = date;
    }
}
