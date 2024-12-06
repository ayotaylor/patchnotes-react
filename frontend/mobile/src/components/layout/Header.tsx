import React from "react";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../hooks/useAuth";
import {
  HeaderContainer,
  HeaderContent,
  HeaderTitle,
  UserAvatar,
} from "./styles";

export const Header: React.FC = () => {
  const navigation = useNavigation();
  const { user } = useAuth();

  return (
    <HeaderContainer>
      <HeaderContent>
        <HeaderTitle>PatchNotes</HeaderTitle>
        {user && (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("UserProfile", { userId: user.id })
            }
          >
            <UserAvatar
              source={{
                uri: user.avatarUrl || "https://via.placeholder.com/32",
              }}
            />
          </TouchableOpacity>
        )}
      </HeaderContent>
    </HeaderContainer>
  );
};
