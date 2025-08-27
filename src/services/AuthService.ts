import AsyncStorage from "@react-native-async-storage/async-storage";
import * as WebBrowser from "expo-web-browser";
import * as AuthSession from "expo-auth-session";
import { Alert } from "react-native";
import {
  User,
  LoginCredentials,
  SignupData,
  KakaoUserInfo,
  AuthState,
} from "../types";

// 카카오 API 엔드포인트
const KAKAO_API_BASE = "https://kapi.kakao.com";
const KAKAO_AUTH_BASE = "https://kauth.kakao.com";

class AuthService {
  private static instance: AuthService;
  private readonly ACCESS_TOKEN = process.env.EXPO_PUBLIC_KAKAO_ACCESS_TOKEN;
  private readonly KAKAO_APP_KEY = process.env.EXPO_PUBLIC_KAKAO_APP_KEY;
  private readonly REDIRECT_URI = process.env.EXPO_PUBLIC_KAKAO_REDIRECT_URI;

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  /**
   * 로컬 스토리지에서 토큰 가져오기
   */
  async getStoredToken(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem("auth_token");
    } catch (error) {
      console.error("토큰 가져오기 오류:", error);
      return null;
    }
  }

  /**
   * 로컬 스토리지에 토큰 저장
   */
  async storeToken(token: string): Promise<void> {
    try {
      await AsyncStorage.setItem("auth_token", token);
    } catch (error) {
      console.error("토큰 저장 오류:", error);
    }
  }

  /**
   * 로컬 스토리지에서 토큰 삭제
   */
  async removeToken(): Promise<void> {
    try {
      await AsyncStorage.removeItem("auth_token");
    } catch (error) {
      console.error("토큰 삭제 오류:", error);
    }
  }

  /**
   * 사용자 정보 저장
   */
  async storeUser(user: User): Promise<void> {
    try {
      await AsyncStorage.setItem("user_info", JSON.stringify(user));
    } catch (error) {
      console.error("사용자 정보 저장 오류:", error);
    }
  }

  /**
   * 저장된 사용자 정보 가져오기
   */
  async getStoredUser(): Promise<User | null> {
    try {
      const userString = await AsyncStorage.getItem("user_info");
      return userString ? JSON.parse(userString) : null;
    } catch (error) {
      console.error("사용자 정보 가져오기 오류:", error);
      return null;
    }
  }

  /**
   * 저장된 사용자 정보 삭제
   */
  async removeStoredUser(): Promise<void> {
    try {
      await AsyncStorage.removeItem("user_info");
    } catch (error) {
      console.error("사용자 정보 삭제 오류:", error);
    }
  }

  /**
   * 카카오 로그인 (임시 비활성화)
   */
  async loginWithKakao(): Promise<{
    success: boolean;
    user?: User;
    token?: string;
  }> {
    try {
      // 임시로 목업 카카오 로그인
      Alert.alert(
        "카카오 로그인",
        "카카오 로그인 기능은 현재 개발 중입니다. 일반 로그인을 이용해주세요.",
        [{ text: "확인" }]
      );
      
      return { success: false };
    } catch (error) {
      console.error("카카오 로그인 오류:", error);
      Alert.alert("로그인 오류", "카카오 로그인 중 문제가 발생했습니다.");
      return { success: false };
    }
  }

  /**
   * URL에서 인증 코드 추출
   */
  private extractCodeFromUrl(url: string): string | null {
    const regex = /code=([^&]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  }

  /**
   * 카카오 액세스 토큰 요청
   */
  private async getKakaoAccessToken(code: string): Promise<any> {
    try {
      const response = await fetch(`${KAKAO_AUTH_BASE}/oauth/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `grant_type=authorization_code&client_id=${this.KAKAO_APP_KEY}&redirect_uri=${this.REDIRECT_URI}&code=${code}`,
      });

      return await response.json();
    } catch (error) {
      console.error("카카오 토큰 요청 오류:", error);
      throw error;
    }
  }

  /**
   * 카카오 사용자 정보 가져오기
   */
  private async getKakaoUserInfo(
    accessToken: string
  ): Promise<KakaoUserInfo | null> {
    try {
      const response = await fetch(`${KAKAO_API_BASE}/v2/user/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      });

      if (response.ok) {
        return await response.json();
      }

      return null;
    } catch (error) {
      console.error("카카오 사용자 정보 요청 오류:", error);
      return null;
    }
  }

  /**
   * 카카오 사용자 생성/로그인 (목업)
   */
  private async createOrLoginKakaoUser(
    kakaoUser: KakaoUserInfo
  ): Promise<User> {
    // 실제로는 백엔드 서버에 요청해야 함
    // 여기서는 목업 데이터 반환
    return {
      id: kakaoUser.id,
      email: kakaoUser.kakao_account.email || "",
      name: kakaoUser.kakao_account.profile?.nickname || "카카오 사용자",
      profileImage: kakaoUser.kakao_account.profile?.profile_image_url,
      userType: "customer", // 기본값은 일반 사용자
      isVerified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  /**
   * 일반 로그인
   */
  async login(
    credentials: LoginCredentials
  ): Promise<{ success: boolean; user?: User; token?: string }> {
    try {
      // 실제로는 백엔드 API 호출
      // 여기서는 목업 로그인
      const mockUser: User = {
        id: "user_001",
        email: credentials.email,
        name: "일반 사용자",
        userType: "customer",
        isVerified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const mockToken = "mock_jwt_token_" + Date.now();

      await this.storeToken(mockToken);
      await this.storeUser(mockUser);

      return { success: true, user: mockUser, token: mockToken };
    } catch (error) {
      console.error("로그인 오류:", error);
      return { success: false };
    }
  }

  /**
   * 회원가입
   */
  async signup(
    signupData: SignupData
  ): Promise<{ success: boolean; user?: User; token?: string }> {
    try {
      // 실제로는 백엔드 API 호출
      // 여기서는 목업 회원가입
      const newUser: User = {
        id: "user_" + Date.now(),
        email: signupData.email,
        name: signupData.name,
        phone: signupData.phone,
        userType: signupData.userType,
        isVerified: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const mockToken = "mock_jwt_token_" + Date.now();

      await this.storeToken(mockToken);
      await this.storeUser(newUser);

      return { success: true, user: newUser, token: mockToken };
    } catch (error) {
      console.error("회원가입 오류:", error);
      return { success: false };
    }
  }

  /**
   * 로그아웃
   */
  async logout(): Promise<void> {
    try {
      await this.removeToken();
      await this.removeStoredUser();
    } catch (error) {
      console.error("로그아웃 오류:", error);
    }
  }

  /**
   * 자동 로그인 체크
   */
  async checkAutoLogin(): Promise<{
    isAuthenticated: boolean;
    user?: User;
    token?: string;
  }> {
    try {
      const token = await this.getStoredToken();
      const user = await this.getStoredUser();

      if (token && user) {
        return { isAuthenticated: true, user, token };
      }

      return { isAuthenticated: false };
    } catch (error) {
      console.error("자동 로그인 체크 오류:", error);
      return { isAuthenticated: false };
    }
  }

  /**
   * 토큰 유효성 검증
   */
  async validateToken(token: string): Promise<boolean> {
    try {
      // 실제로는 백엔드에서 토큰 검증
      // 여기서는 단순히 토큰 존재 여부만 체크
      return token.length > 0;
    } catch (error) {
      console.error("토큰 검증 오류:", error);
      return false;
    }
  }
}

export default AuthService;
