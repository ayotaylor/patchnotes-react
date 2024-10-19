package com.patchnotes.shared.model;

public enum Category {
    MAIN_GAME(0, "Main Game"),
    DLC(1, "DLC"),
    EXPANSION(2, "Expansion"),
    BUNDLE(3, "Bundle"),
    STANDALONE_EXPANSION(4, "Standalone Expansion"),
    MOD(5, "Mod"),
    EPISODE(6, "Episode"),
    SEASON(7, "Season"),
    REMAKE(8, "Remake"),
    REMASTER(9, "Remaster"),
    EXPANDED_GAME(10, "Expanded Game"),
    PORT(11, "Port"),
    FORK(12, "Fork"),
    PACK(12, "Pack"),
    UPDATE(12, "Update"),
    UNKNOWN(99, "Unknown");

    private final int code;
    private final String name;

    Category(int code, String name) {
        this.code = code;
        this.name = name;
    }

    public int getCode() {
        return code;
    }

    public String getName() {
        return name;
    }

    public static Category fromCode(int code) {
        for (Category category : Category.values()) {
            if (category.code == code) {
                return category;
            }
        }
        return UNKNOWN;
    }
}
