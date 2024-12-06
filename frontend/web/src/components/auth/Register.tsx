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

export const Register: React.FC = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { register, loading, errors } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (credentials.password !== credentials.confirmPassword) {
      return; // Add password validation error handling
    }
    await register(credentials);
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
