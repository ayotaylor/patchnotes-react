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

export const Login: React.FC = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const { login, loading, errors } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(credentials);
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
