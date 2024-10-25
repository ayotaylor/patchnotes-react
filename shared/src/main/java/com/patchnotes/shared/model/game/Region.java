package com.patchnotes.shared.model.game;

public enum Region {
    EUROPE(1, "Europe"),
    NORTH_AMERICA(2, "North America"),
    AUSTRALIA(3, "Australia"),
    NEW_ZEALAND(4, "New Zealand"),
    JAPAN(5, "Japan"),
    CHINA(6, "China"),
    ASIA(7, "Asia"),
    WORLDWIDE(8, "Worldwide"),
    SOUTH_KOREA(8, "South Korea"),
    BRAZIL(8, "Brazil"),
    UNKNOWN(0, "Unknown");

    private final int code;
    private final String name;

    Region(int code, String name) {
        this.code = code;
        this.name = name;
    }

    public int getCode() {
        return code;
    }

    public String getName() {
        return name;
    }

    public static Region fromCode(int code) {
        for (Region region : Region.values()) {
            if (region.code == code) {
                return region;
            }
        }
        return UNKNOWN;
    }
}
