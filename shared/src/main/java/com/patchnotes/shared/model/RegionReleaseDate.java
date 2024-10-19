package com.patchnotes.shared.model;

import java.time.LocalDate;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegionReleaseDate {
    private Region region;
    private LocalDate date;

    public RegionReleaseDate(Region region, LocalDate date) {
        this.region = region;
        this.date = date;
    }
}
