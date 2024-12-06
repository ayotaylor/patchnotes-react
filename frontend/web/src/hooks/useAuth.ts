import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  LoginCredentials,
  RegisterCredentials,
  UserDto,
  ApiError,
  AuthFormErrors,
  ERROR_MESSAGES,
} from "../types/auth";
import { authService } from "../services/authService";
import { FormValues, ValidationErrors, Validator } from "@/utils/validation";

interface AuthState {
  user: UserDto | null;
  loading: boolean;
  initialized: boolean;
  errors: AuthFormErrors;
}

// interface UseAuthReturn {
//   user: UserDto | null;
//   loading: boolean;
//   errors: AuthFormErrors;
//   login: (credentials: LoginCredentials) => Promise<void>;
//   register: (credentials: RegisterCredentials) => Promise<void>;
//   logout: () => Promise<void>;
//   validateForm: (
//     values: FormValues,
//     type: "login" | "register"
//   ) => ValidationErrors;
// }

export const useAuth = () => {
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true,
    initialized: false,
    errors: {},
  });

  const navigate = useNavigate();

  // Initialize auth state from storage
  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = await authService.getToken();
        if (token) {
          const user = await authService.getCurrentUser();
          setState({ user, loading: false, initialized: true, errors: {} });
        } else {
          setState({ user: null, loading: false, initialized: true, errors: {} });
        }
      } catch (error) {
        const apiError = error as AuthFormErrors;
        console.error("Auth initialization error:", error);
        setState({ user: null, loading: false, initialized: true, errors: apiError });
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
    return error.status
      ? ERROR_MESSAGES[error.status as keyof typeof ERROR_MESSAGES] || ERROR_MESSAGES.DEFAULT
      : ERROR_MESSAGES.NETWORK;
  }, []);

  const login = useCallback(async (credentials: LoginCredentials) => {
    try {
      setState(prev => ({ ...prev, loading: true }));
      const { user/*, token */ } = await authService.login(credentials);
      setState({ user, loading: false, initialized: true, errors: {} });
      navigate('/dashboard');
    } catch (error) {
      const apiError = error as ApiError;
      setState(prev => ({ ...prev, loading: false, errors: { general: handleAuthError(apiError) } }));
      throw new Error(handleAuthError(apiError));
    }
  }, [navigate, handleAuthError]);

  const register = useCallback(async (credentials: RegisterCredentials) => {
    try {
      setState(prev => ({ ...prev, loading: true }));
      await authService.register(credentials);
      // Auto-login after successful registration
      await login({
        email: credentials.email,
        password: credentials.password,
      });
    } catch (error) {
      const apiError = error as ApiError;
      setState(prev => ({ ...prev, loading: false, errors: { general: handleAuthError(apiError) } }));
      throw new Error(handleAuthError(apiError));
    }
  }, [login, handleAuthError]);

  const logout = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, loading: true }));
      await authService.logout();
      setState({ user: null, loading: false, initialized: true, errors: {} });
      navigate('/login');
    } catch (error) {
      const apiError = error as ApiError;
      setState(prev => ({ ...prev, loading: false, errors: { general: handleAuthError(apiError) } }));
      console.error('Logout error:', error);
    }
  }, [navigate, handleAuthError]);

  return {
    user: state.user,
    loading: state.loading,
    errors: state.errors,
    login,
    register,
    logout,
    validateForm,
  };
};
