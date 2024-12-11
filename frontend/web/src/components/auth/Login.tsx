import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import {
  AuthContainer,
  AuthCard,
  AuthHeader,
  AuthForm,
  FormGroup,
  Label,
  Input,
  Button,
  ErrorMessage,
  AuthLink,
} from "./styles";
import { FormValues, ValidationErrors } from "@/utils/validation";

export const Login: React.FC = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const { user, login, loading, errors, validateForm } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear validation error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Validate form before submission
    const validationErrors = validateForm(credentials as FormValues, "login");
    if (Object.keys(validationErrors).length > 0) {
      // Handle validation errors
      setValidationErrors(validationErrors);
      return;
    }

    try {
      await login(credentials);
      console.log(user);
      // No need to handle navigation here as it's handled in useAuth
    } catch (error) {
      // Error is already handled in useAuth
      console.error("Login failed:", error);
    }
  };

  return (
    <AuthContainer>
      <AuthCard>
        <AuthHeader>Sign In</AuthHeader>
        <AuthForm onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="username">Username</Label>
            <Input
              type="text"
              id="username"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              required
            />
            {validationErrors.username &&
              <ErrorMessage>{validationErrors.username}</ErrorMessage>
            }
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
            />
            {validationErrors.password &&
              <ErrorMessage>{validationErrors.password}</ErrorMessage>
            }
          </FormGroup>
          {errors.general && <ErrorMessage>{errors.general}</ErrorMessage>}
          <Button type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </AuthForm>
        <AuthLink>
          Don't have an account? <Link to="/register">Sign up</Link>
        </AuthLink>
      </AuthCard>
    </AuthContainer>
  );
};
