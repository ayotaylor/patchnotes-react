export interface LoginCredentials {
  username?: string;
  //email?: string;
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
  name: string;
  email: string;
  pfp?: string;
  bio?: string;
  topFive: string;
}

export interface LoginResponse {
  user: UserDto;
  token: string;
  expiration: number;
}

// Form error states
export interface AuthFormErrors {
  email?: string;
  password?: string;
  username?: string;
  confirmPassword?: string;
  general?: string;
}

export interface ApiError extends Error {
  code?: string;
  status?: number;
  name: string;
}

export const createApiError = (
  message: string,
  code?: string,
  status?: number
): ApiError => {
  const error = new Error(message) as ApiError;
  error.name = "AuthError";
  error.code = code;
  error.status = status;
  return error;
};

export const ERROR_MESSAGES = {
  400: 'Bad Request',
  401: 'Invalid credentials',
  404: 'Service Not Found',
  409: 'Email already exists',
  422: 'Invalid input data',
  DEFAULT: 'An unexpected error occurred',
  NETWORK: 'Network error. Please try again'
} as const;
