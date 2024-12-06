export interface LoginCredentials {
  username?: string;
  email?: string;
  password: string;
}

export interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface UserDto {
  id: string;
  username: string;
  email: string;
  avatarUrl?: string;
  bio?: string;
  createdAt: string;
}

export interface LoginResponse {
  user: UserDto;
  token: string;
}

// Form error states
export interface AuthFormErrors {
  email?: string;
  password?: string;
  username?: string;
  confirmPassword?: string;
  general?: string;
}

export interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
    status: number;
  };
  message: string;
}
