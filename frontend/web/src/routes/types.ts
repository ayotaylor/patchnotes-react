export type RootStackParamList = {
    Home: undefined;
    Login: undefined;
    Register: undefined;
    Dashboard: undefined;
    GameDetails: { gameId: string };
    UserProfile: { userId: string };
    GameCollection: { userId: string };
    Wishlist: { userId: string };
    Lists: { userId: string };
    ListDetails: { listId: string };
  };