// 기본 타입 정의
export interface Location {
  latitude: number;
  longitude: number;
  accuracy?: number;
  timestamp?: number;
}

export interface Driver {
  id: string;
  name: string;
  phone: string;
  rating: number;
  carInfo: {
    model: string;
    licensePlate: string;
    color: string;
  };
  location: Location;
  isOnline: boolean;
  totalRides: number;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  rating: number;
  favoriteLocations: {
    home?: string;
    work?: string;
  };
}

export interface RideRequest {
  id: string;
  customerId: string;
  pickupLocation: Location;
  pickupAddress: string;
  destinationLocation: Location;
  destinationAddress: string;
  fare: number;
  status: "pending" | "accepted" | "in_progress" | "completed" | "cancelled";
  createdAt: Date;
  driverId?: string;
  estimatedDuration?: number;
}

export type UserMode = "driver" | "customer";

// 인증 관련 타입
export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  profileImage?: string;
  userType: "customer" | "driver";
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface DriverUser extends User {
  userType: "driver";
  licenseNumber: string;
  licenseExpiry: Date;
  carInfo: {
    model: string;
    licensePlate: string;
    color: string;
    year: number;
  };
  bankAccount: {
    bank: string;
    accountNumber: string;
    accountHolder: string;
  };
  verificationStatus: "pending" | "verified" | "rejected";
  rating: number;
  totalRides: number;
}

export interface CustomerUser extends User {
  userType: "customer";
  favoriteAddresses: {
    home?: string;
    work?: string;
    others: { name: string; address: string }[];
  };
  paymentMethods: {
    id: string;
    type: "card" | "account";
    lastFour: string;
    isDefault: boolean;
  }[];
  rating: number;
  totalRides: number;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  email: string;
  password: string;
  name: string;
  phone: string;
  userType: "customer" | "driver";
  // 기사용 추가 정보
  licenseNumber?: string;
  licenseExpiry?: Date;
  carModel?: string;
  licensePlate?: string;
  carColor?: string;
  carYear?: number;
  bankName?: string;
  accountNumber?: string;
  accountHolder?: string;
}

export interface KakaoUserInfo {
  id: string;
  kakao_account: {
    email?: string;
    profile?: {
      nickname?: string;
      profile_image_url?: string;
    };
  };
}