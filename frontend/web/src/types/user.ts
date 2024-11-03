export interface User {
    bannerUrl: string | undefined;
    avatarUrl: string | undefined;
    name: string | undefined;
    bio: string;
    email: string;
    gamesThisYear: number;
    followers: number;
    following: number;
}