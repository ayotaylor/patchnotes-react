import axios from 'axios';
import { LoginCredentials, RegisterCredentials, LoginResponse, UserDto } from '../types/auth';

const API_URL = import.meta.env.VITE_AUTH_SERVICE_URL || 'http://localhost:8080';

export const authService = {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await axios.post(`${API_URL}/api/auth/authenticate`, credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  async register(credentials: RegisterCredentials): Promise<UserDto> {
    const response = await axios.post(`${API_URL}/api/auth/register`, credentials);
    return response.data;
  },

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser(): UserDto | null {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      return JSON.parse(userStr);
    }
    return null;
  },

  getToken(): string | null {
    return localStorage.getItem('token');
  },
};