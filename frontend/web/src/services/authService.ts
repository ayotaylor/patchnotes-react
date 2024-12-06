import axios, { AxiosError } from "axios";
import {
  LoginCredentials,
  RegisterCredentials,
  LoginResponse,
  UserDto,
  // ApiError,
  // ERROR_MESSAGES,
  createApiError,
} from "../types/auth";
// import { useCallback } from "react";

// Define custom error types for better error handling
export class AuthError extends Error {
  constructor(message: string, public code?: string, public status?: number) {
    super(message);
    this.name = "AuthError";
  }
}

const API_URL =
  import.meta.env.VITE_AUTH_SERVICE_URL || "http://localhost:8080";

// Create an axios instance with default configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_AUTH_SERVICE_URL || "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

export const authService = {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      const response = await api.post<LoginResponse>(
        `${API_URL}/api/auth/authenticate`,
        credentials
      );
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user.username));
      }
      return response.data;
    } catch (error) {
      // Handle different types of errors
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<{ message?: string }>;

        switch (axiosError.response?.status) {
          case 400:
            throw createApiError('User Not Found', 'BAD_REQUEST', 400);
          case 401:
            throw createApiError('Invalid credentials', 'INVALID_CREDENTIALS', 401);
          case 404:
            throw createApiError('Authentication service not found', 'SERVICE_NOT_FOUND', 404);
          case 422:
            throw createApiError('Invalid input data', 'INVALID_INPUT', 422);
          default:
            throw createApiError(
              axiosError.response?.data?.message || 'Authentication failed',
              'AUTH_ERROR',
              axiosError.response?.status
            );
        }
      }

      throw new AuthError('Network error occurred', 'NETWORK_ERROR');
    }

  },

  async register(credentials: RegisterCredentials): Promise<UserDto> {
    try {
      const response = await api.post<UserDto>(
        `${API_URL}/api/auth/register`,
        credentials
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<{ message?: string }>;

        switch (axiosError.response?.status) {
          case 400:
            throw createApiError('Email already exists', 'EMAIL_EXISTS', 400);
          case 422:
            throw createApiError('Invalid registration data', 'INVALID_INPUT', 422);
          default:
            throw createApiError(
              axiosError.response?.data?.message || 'Registration failed',
              'REGISTRATION_ERROR',
              axiosError.response?.status
            );
        }
      }

      throw new AuthError('Network error occurred', 'NETWORK_ERROR');
    }

  },

  logout(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  getCurrentUser(): UserDto | null {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      return JSON.parse(userStr);
    }
    return null;
  },

  getToken(): string | null {
    return localStorage.getItem("token");
  },
};
