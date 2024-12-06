import React, { useState } from "react";
import { Alert, Keyboard } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  AuthContainer,
  ScrollContainer,
  AuthCard,
  AuthHeader,
  FormGroup,
  Label,
  Input,
  Button,
  ButtonText,
  ErrorText,
  AuthLinkContainer,
  AuthLinkText,
  AuthLinkButton,
} from "./styles";
import { useAuth } from "../../hooks/useAuth";
import { LoginCredentials } from "../../types/auth";

export const Login: React.FC = () => {
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: "",
    password: "",
  });
  const { login, loading, errors } = useAuth();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const handleLogin = async () => {
    Keyboard.dismiss();
    try {
      await login(credentials);
    } catch (error) {
      Alert.alert("Error", "Failed to sign in. Please try again.");
    }
  };

  return (
    <AuthContainer>
      <ScrollContainer keyboardShouldPersistTaps="handled">
        <AuthCard>
          <AuthHeader>Sign In</AuthHeader>

          <FormGroup>
            <Label>Email</Label>
            <Input
              value={credentials.email}
              onChangeText={(text) =>
                setCredentials((prev) => ({ ...prev, email: text }))
              }
              placeholder="Enter your email"
              autoCapitalize="none"
              keyboardType="email-address"
              autoCorrect={false}
            />
          </FormGroup>

          <FormGroup>
            <Label>Password</Label>
            <Input
              value={credentials.password}
              onChangeText={(text) =>
                setCredentials((prev) => ({ ...prev, password: text }))
              }
              placeholder="Enter your password"
              secureTextEntry
              autoCapitalize="none"
            />
          </FormGroup>

          {errors.general && <ErrorText>{errors.general}</ErrorText>}

          <Button onPress={handleLogin} disabled={loading}>
            <ButtonText>{loading ? "Signing in..." : "Sign In"}</ButtonText>
          </Button>

          <AuthLinkContainer>
            <AuthLinkText>Don't have an account?</AuthLinkText>
            <AuthLinkButton onPress={() => navigation.navigate("Register")}>
              Sign up
            </AuthLinkButton>
          </AuthLinkContainer>
        </AuthCard>
      </ScrollContainer>
    </AuthContainer>
  );
};
