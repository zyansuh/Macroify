import React, { createContext, useContext, useReducer, useEffect } from "react";
import {
  User,
  AuthState,
  LoginCredentials,
  SignupData,
} from "../types";
import AuthService from "../services/AuthService";

// 액션 타입 정의
type AuthAction =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "LOGIN_SUCCESS"; payload: { user: User; token: string } }
  | { type: "LOGIN_FAILURE" }
  | { type: "LOGOUT" }
  | { type: "UPDATE_USER"; payload: User };

// 초기 상태
const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
  isLoading: true,
};

// 리듀서
function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        isLoading: false,
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        isLoading: false,
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        isLoading: false,
      };
    case "UPDATE_USER":
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
}

// 컨텍스트 타입
interface AuthContextType {
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
  // 헬퍼 함수들
  login: (credentials: LoginCredentials) => Promise<boolean>;
  loginWithKakao: () => Promise<boolean>;
  signup: (signupData: SignupData) => Promise<boolean>;
  logout: () => Promise<void>;
  checkAutoLogin: () => Promise<void>;
  updateUser: (user: User) => void;
}

// 컨텍스트 생성
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 프로바이더 컴포넌트
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const authService = AuthService.getInstance();

  // 앱 시작 시 자동 로그인 체크
  useEffect(() => {
    checkAutoLogin();
  }, []);

  /**
   * 자동 로그인 체크
   */
  const checkAutoLogin = async () => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      
      const result = await authService.checkAutoLogin();
      
      if (result.isAuthenticated && result.user && result.token) {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: { user: result.user, token: result.token },
        });
      } else {
        dispatch({ type: "LOGIN_FAILURE" });
      }
    } catch (error) {
      console.error("자동 로그인 체크 오류:", error);
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };

  /**
   * 일반 로그인
   */
  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      
      const result = await authService.login(credentials);
      
      if (result.success && result.user && result.token) {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: { user: result.user, token: result.token },
        });
        return true;
      } else {
        dispatch({ type: "LOGIN_FAILURE" });
        return false;
      }
    } catch (error) {
      console.error("로그인 오류:", error);
      dispatch({ type: "LOGIN_FAILURE" });
      return false;
    }
  };

  /**
   * 카카오 로그인
   */
  const loginWithKakao = async (): Promise<boolean> => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      
      const result = await authService.loginWithKakao();
      
      if (result.success && result.user && result.token) {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: { user: result.user, token: result.token },
        });
        return true;
      } else {
        dispatch({ type: "LOGIN_FAILURE" });
        return false;
      }
    } catch (error) {
      console.error("카카오 로그인 오류:", error);
      dispatch({ type: "LOGIN_FAILURE" });
      return false;
    }
  };

  /**
   * 회원가입
   */
  const signup = async (signupData: SignupData): Promise<boolean> => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      
      const result = await authService.signup(signupData);
      
      if (result.success && result.user && result.token) {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: { user: result.user, token: result.token },
        });
        return true;
      } else {
        dispatch({ type: "LOGIN_FAILURE" });
        return false;
      }
    } catch (error) {
      console.error("회원가입 오류:", error);
      dispatch({ type: "LOGIN_FAILURE" });
      return false;
    }
  };

  /**
   * 로그아웃
   */
  const logout = async (): Promise<void> => {
    try {
      await authService.logout();
      dispatch({ type: "LOGOUT" });
    } catch (error) {
      console.error("로그아웃 오류:", error);
    }
  };

  /**
   * 사용자 정보 업데이트
   */
  const updateUser = (user: User): void => {
    dispatch({ type: "UPDATE_USER", payload: user });
    authService.storeUser(user);
  };

  const contextValue: AuthContextType = {
    state,
    dispatch,
    login,
    loginWithKakao,
    signup,
    logout,
    checkAutoLogin,
    updateUser,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

// 커스텀 훅
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export default AuthContext;
