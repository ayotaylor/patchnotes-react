import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MainStackParamList, TabParamList } from "./types";
import { Login } from "@/components/auth/Login";
import { Register } from "@/components/auth/Register";
// import { Dashboard } from "../components/dashboard/Dashboard";
// import { GameDetails } from "../components/games/GameDetails";
// import { UserProfile } from "../components/user/UserProfile";
// import { GameCollection } from "../components/games/GameCollection";
// import { Wishlist } from "../components/games/Wishlist";
// import { Lists } from "../components/lists/Lists";
// import { ListDetails } from "../components/lists/ListDetails";
// import { MainStackParamList } from "./types";

const Stack = createNativeStackNavigator<MainStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();//createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator>
        /* temp */
        <Tab.Screen name="Login" component={Login} />
        <Tab.Screen name="Profile" component={Register} />
      {/* <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Collection" component={GameCollection} />
      <Tab.Screen name="Lists" component={Lists} />
      <Tab.Screen name="Profile" component={UserProfile} /> */}
    </Tab.Navigator>
  );
};

export const MainNavigator: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TabNavigator"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen name="GameDetails" component={GameDetails} />
      <Stack.Screen name="ListDetails" component={ListDetails} />
      <Stack.Screen name="Wishlist" component={Wishlist} /> */}
    </Stack.Navigator>
  );
};
