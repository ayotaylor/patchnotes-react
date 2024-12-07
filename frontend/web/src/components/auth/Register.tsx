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

export const Register: React.FC = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const { register, loading, errors, validateForm } = useAuth();

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
    if (credentials.password !== credentials.confirmPassword) {
      return; // Add password validation error handling
    }

    try {
      await register(credentials);
    } catch (error) {
      // Error is already handled in useAuth
      console.error("Login failed:", error);
    }
  };

  return (
    <AuthContainer>
      <AuthCard>
        <AuthHeader>Create Account</AuthHeader>
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
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              required
            />
            {validationErrors.email &&
              <ErrorMessage>{validationErrors.email}</ErrorMessage>
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
          <FormGroup>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={credentials.confirmPassword}
              onChange={handleChange}
              required
            />
            {validationErrors.password &&
              <ErrorMessage>{validationErrors.password}</ErrorMessage>
            }
          </FormGroup>
          {errors.general && <ErrorMessage>{errors.general}</ErrorMessage>}
          <Button type="submit" disabled={loading}>
            {loading ? "Creating account..." : "Create Account"}
          </Button>
        </AuthForm>
        <AuthLink>
          Already have an account? <Link to="/login">Sign in</Link>
        </AuthLink>
      </AuthCard>
    </AuthContainer>
  );
};
