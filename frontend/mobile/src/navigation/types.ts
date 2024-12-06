import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
  AuthStack: undefined;
  MainStack: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type MainStackParamList = {
  TabNavigator: undefined;
  Dashboard: undefined;
  GameDetails: { gameId: string };
  UserProfile: { userId: string };
  GameCollection: { userId: string };
  Wishlist: { userId: string };
  Lists: { userId: string };
  ListDetails: { listId: string };
};

// might remove if not needed
export type TabParamList = {
  Login: undefined;
  Register: undefined;
  Profile: undefined;
  Dashboard: undefined;
  GameDetails: { gameId: string };
  UserProfile: { userId: string };
  GameCollection: { userId: string };
  Wishlist: { userId: string };
  Lists: { userId: string };
  ListDetails: { listId: string };
  // ... other tab routes
};
export type NavigationProps = NativeStackNavigationProp<RootStackParamList>;
