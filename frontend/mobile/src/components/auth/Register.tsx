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
import { RegisterCredentials } from "../../types/auth";

export const Register: React.FC = () => {
  const [credentials, setCredentials] = useState<RegisterCredentials>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { register, loading, errors } = useAuth();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const handleRegister = async () => {
    Keyboard.dismiss();
    if (credentials.password !== credentials.confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    try {
      await register(credentials);
    } catch (error) {
      Alert.alert("Error", "Failed to create account. Please try again.");
    }
  };

  return (
    <AuthContainer>
      <ScrollContainer keyboardShouldPersistTaps="handled">
        <AuthCard>
          <AuthHeader>Create Account</AuthHeader>

          <FormGroup>
            <Label>Username</Label>
            <Input
              value={credentials.username}
              onChangeText={(text) =>
                setCredentials((prev) => ({ ...prev, username: text }))
              }
              placeholder="Choose a username"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </FormGroup>

          <FormGroup>
            <Label>Email</Label>
            <Input
              value={credentials.email}
              onChangeText={(text) =>
                setCredentials((prev) => ({ ...prev, email: text }))
              }
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
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
              placeholder="Create a password"
              secureTextEntry
              autoCapitalize="none"
            />
          </FormGroup>

          <FormGroup>
            <Label>Confirm Password</Label>
            <Input
              value={credentials.confirmPassword}
              onChangeText={(text) =>
                setCredentials((prev) => ({ ...prev, confirmPassword: text }))
              }
              placeholder="Confirm your password"
              secureTextEntry
              autoCapitalize="none"
            />
          </FormGroup>

          {errors.general && <ErrorText>{errors.general}</ErrorText>}

          <Button onPress={handleRegister} disabled={loading}>
            <ButtonText>
              {loading ? "Creating account..." : "Create Account"}
            </ButtonText>
          </Button>

          <AuthLinkContainer>
            <AuthLinkText>Already have an account?</AuthLinkText>
            <AuthLinkButton onPress={() => navigation.navigate("Login")}>
              Sign in
            </AuthLinkButton>
          </AuthLinkContainer>
        </AuthCard>
      </ScrollContainer>
    </AuthContainer>
  );
};
