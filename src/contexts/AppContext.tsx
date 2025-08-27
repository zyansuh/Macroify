import React, { createContext, useContext, useReducer, useEffect } from "react";
import { UserMode, Driver, Customer, RideRequest, Location } from "../types";
import LocationService from "../services/LocationService";
import OverlayService from "../utils/OverlayService";

// 앱 상태 타입 정의
interface AppState {
  userMode: UserMode | null;
  isOnline: boolean;
  currentLocation: Location | null;
  currentUser: Driver | Customer | null;
  activeRide: RideRequest | null;
  nearbyRequests: RideRequest[];
  isLocationTracking: boolean;
}

// 액션 타입 정의
type AppAction =
  | { type: "SET_USER_MODE"; payload: UserMode }
  | { type: "SET_ONLINE_STATUS"; payload: boolean }
  | { type: "SET_CURRENT_LOCATION"; payload: Location }
  | { type: "SET_CURRENT_USER"; payload: Driver | Customer }
  | { type: "SET_ACTIVE_RIDE"; payload: RideRequest | null }
  | { type: "ADD_NEARBY_REQUEST"; payload: RideRequest }
  | { type: "REMOVE_NEARBY_REQUEST"; payload: string }
  | { type: "SET_LOCATION_TRACKING"; payload: boolean }
  | { type: "RESET_APP" };

// 초기 상태
const initialState: AppState = {
  userMode: null,
  isOnline: false,
  currentLocation: null,
  currentUser: null,
  activeRide: null,
  nearbyRequests: [],
  isLocationTracking: false,
};

// 리듀서
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "SET_USER_MODE":
      return { ...state, userMode: action.payload };
    case "SET_ONLINE_STATUS":
      return { ...state, isOnline: action.payload };
    case "SET_CURRENT_LOCATION":
      return { ...state, currentLocation: action.payload };
    case "SET_CURRENT_USER":
      return { ...state, currentUser: action.payload };
    case "SET_ACTIVE_RIDE":
      return { ...state, activeRide: action.payload };
    case "ADD_NEARBY_REQUEST":
      return {
        ...state,
        nearbyRequests: [...state.nearbyRequests, action.payload],
      };
    case "REMOVE_NEARBY_REQUEST":
      return {
        ...state,
        nearbyRequests: state.nearbyRequests.filter(
          (req) => req.id !== action.payload
        ),
      };
    case "SET_LOCATION_TRACKING":
      return { ...state, isLocationTracking: action.payload };
    case "RESET_APP":
      return initialState;
    default:
      return state;
  }
}

// 컨텍스트 타입
interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  // 헬퍼 함수들
  setUserMode: (mode: UserMode) => void;
  toggleOnlineStatus: () => void;
  startLocationTracking: () => void;
  stopLocationTracking: () => void;
  updateLocation: (location: Location) => void;
  acceptRideRequest: (request: RideRequest) => void;
  completeRide: () => void;
}

// 컨텍스트 생성
const AppContext = createContext<AppContextType | undefined>(undefined);

// 프로바이더 컴포넌트
export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const locationService = LocationService.getInstance();
  const overlayService = OverlayService.getInstance();

  // 위치 서비스 초기화
  useEffect(() => {
    initializeLocationService();
  }, []);

  // 온라인 상태 변경 시 처리
  useEffect(() => {
    if (state.userMode === "driver") {
      if (state.isOnline) {
        startLocationTracking();
        overlayService.startDrivingMode();
      } else {
        stopLocationTracking();
        overlayService.stopDrivingMode();
      }
    }
  }, [state.isOnline, state.userMode]);

  const initializeLocationService = async () => {
    try {
      const location = await locationService.getCurrentLocation();
      if (location) {
        dispatch({ type: "SET_CURRENT_LOCATION", payload: location });
      }
    } catch (error) {
      console.error("위치 서비스 초기화 오류:", error);
    }
  };

  const setUserMode = (mode: UserMode) => {
    dispatch({ type: "SET_USER_MODE", payload: mode });

    // 더미 사용자 데이터 설정
    if (mode === "driver") {
      const driverData: Driver = {
        id: "driver_001",
        name: "김운전",
        phone: "010-1234-5678",
        rating: 4.8,
        location: state.currentLocation || {
          latitude: 37.5665,
          longitude: 126.978,
        },
        isAvailable: false,
        carInfo: {
          model: "현대 아반떼",
          licensePlate: "12가3456",
          color: "흰색",
        },
      };
      dispatch({ type: "SET_CURRENT_USER", payload: driverData });
    } else {
      const customerData: Customer = {
        id: "customer_001",
        name: "이고객",
        phone: "010-9876-5432",
        rating: 4.5,
      };
      dispatch({ type: "SET_CURRENT_USER", payload: customerData });
    }
  };

  const toggleOnlineStatus = () => {
    const newStatus = !state.isOnline;
    dispatch({ type: "SET_ONLINE_STATUS", payload: newStatus });

    if (state.userMode === "driver") {
      // 운전자의 온라인 상태를 서버에 업데이트
      console.log(`운전자 온라인 상태: ${newStatus ? "온라인" : "오프라인"}`);
    }
  };

  const startLocationTracking = async () => {
    try {
      const success = await locationService.startTracking((location) => {
        dispatch({ type: "SET_CURRENT_LOCATION", payload: location });
      });

      if (success) {
        dispatch({ type: "SET_LOCATION_TRACKING", payload: true });
        console.log("위치 추적이 시작되었습니다.");
      }
    } catch (error) {
      console.error("위치 추적 시작 오류:", error);
    }
  };

  const stopLocationTracking = () => {
    locationService.stopTracking();
    dispatch({ type: "SET_LOCATION_TRACKING", payload: false });
    console.log("위치 추적이 중지되었습니다.");
  };

  const updateLocation = (location: Location) => {
    dispatch({ type: "SET_CURRENT_LOCATION", payload: location });
  };

  const acceptRideRequest = (request: RideRequest) => {
    dispatch({ type: "SET_ACTIVE_RIDE", payload: request });
    dispatch({ type: "REMOVE_NEARBY_REQUEST", payload: request.id });

    // 운행 시작 알림
    overlayService.notifyRideStart(
      "Customer", // 실제로는 request.customerId로 고객 이름을 가져와야 함
      request.destination.address
    );

    console.log("대리운전 요청을 수락했습니다:", request);
  };

  const completeRide = () => {
    if (state.activeRide) {
      // 운행 완료 알림
      overlayService.notifyRideComplete(state.activeRide.estimatedFare);

      dispatch({ type: "SET_ACTIVE_RIDE", payload: null });
      console.log("운행이 완료되었습니다.");
    }
  };

  const contextValue: AppContextType = {
    state,
    dispatch,
    setUserMode,
    toggleOnlineStatus,
    startLocationTracking,
    stopLocationTracking,
    updateLocation,
    acceptRideRequest,
    completeRide,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
}

// 커스텀 훅
export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}

export default AppContext;
