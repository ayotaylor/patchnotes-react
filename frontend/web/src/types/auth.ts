export interface AuthUser {
    id: string;
    username: string;
    email: string;
    avatar?: string;
  }

  export interface AuthState {
    user: AuthUser | null;
    token: string | null;
    loading: boolean;
    error: string | null;
  }