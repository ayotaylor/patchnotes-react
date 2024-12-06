import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  LoginCredentials,
  RegisterCredentials,
  UserDto,
  ApiError,
} from "../types/auth";
import { authService } from "../services/authService";
import { FormValues, ValidationErrors, Validator } from "@/utils/validation";

interface AuthState {
  user: UserDto | null;
  loading: boolean;
  initialized: boolean;
}

interface UseAuthReturn {
  user: UserDto | null;
  loading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => Promise<void>;
  validateForm: (
    values: FormValues,
    type: "login" | "register"
  ) => ValidationErrors;
}

export const useAuth = () => {
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true,
    initialized: false,
  });

  const navigate = useNavigate();

  // Initialize auth state from storage
  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = await authService.getToken();
        if (token) {
          const user = await authService.getCurrentUser();
          setState({ user, loading: false, initialized: true });
        } else {
          setState({ user: null, loading: false, initialized: true });
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
        setState({ user: null, loading: false, initialized: true });
      }
    };

    initAuth();
  }, []);

  const validateForm = useCallback(
    (values: FormValues, type: "login" | "register"): ValidationErrors => {
      const rules =
        type === "login"
          ? {
              email: Validator.getDefaultRules().email,
              password: Validator.getDefaultRules().password,
            }
          : Validator.getDefaultRules();

      return Validator.validate(values, rules);
    },
    []
  );

  const handleAuthError = useCallback((error: ApiError) => {
    // Handle different types of errors
    if (error.response) {
      switch (error.response.status) {
        case 401:
          return "Invalid credentials";
        case 409:
          return "Email already exists";
        case 422:
          return "Invalid input data";
        default:
          return "An unexpected error occurred";
      }
    }
    return "Network error. Please try again";
  }, []);

  const login = useCallback(
    async (credentials: LoginCredentials) => {
      try {
        setState((prev) => ({ ...prev, loading: true }));
        const { user, token } = await authService.login(credentials);
        setState({ user, loading: false, initialized: true });
        navigate("/dashboard");
      } catch (error) {
        const apiError = error as ApiError;
        setState((prev) => ({ ...prev, loading: false }));
        throw new Error(handleAuthError(apiError));
      }
    },
    [navigate, handleAuthError]
  );

  const register = useCallback(
    async (credentials: RegisterCredentials) => {
      try {
        setState((prev) => ({ ...prev, loading: true }));
        await authService.register(credentials);
        // Auto-login after successful registration
        await login({
          email: credentials.email,
          password: credentials.password,
        });
      } catch (error) {
        const apiError = error as ApiError;
        setState((prev) => ({ ...prev, loading: false }));
        throw new Error(handleAuthError(apiError));
      }
    },
    [login, handleAuthError]
  );

  const logout = useCallback(async () => {
    try {
      setState((prev) => ({ ...prev, loading: true }));
      await authService.logout();
      setState({ user: null, loading: false, initialized: true });
      navigate("/login");
    } catch (error) {
      setState((prev) => ({ ...prev, loading: false }));
      console.error("Logout error:", error);
    }
  }, [navigate]);

  return {
    user: state.user,
    loading: state.loading,
    login,
    register,
    logout,
    validateForm,
  };
};
