import { Game } from "./game";

export interface List {
    id: number | string;
    title: string;
    description: string;
    games: Game[];
    updatedAt: string;
    createdAt?: string;
    userId?: string;
    isPublic?: boolean;
  }