import { RegionReleaseDate } from "./regionReleaseDate";
import { SimilarGame } from "./similarGame";

export interface Game {
    id: number;
    igdbId: number;
    name: string;
    alternativeNames: string[];
    summary: string;
    storyLine: string;
    firstReleaseDate: string;
    releaseStatus: string;
    regionReleaseDates: RegionReleaseDate[];
    developer: string;
    publisher: string;
    platforms: string[];
    genres: string[];
    bundles: string[];
    remakes: string[];
    remasters: string[];
    similarGames: SimilarGame[];
    category: string;
    franchise: string;
    franchises: string[];
    collections: string[];
    cover: string;
    url: string;
    versionParent: string;
    parentGame: string;
    versionTitle: string;
    keywords: string[];
    languages: string[];
    multiplayerModes: string[];
    playerPerspectives: string[];
    averageRating: number;
    backlogCount: number;
    playingCount: number;
    completedCount: number;
}