import * as Location from "expo-location";
import { Alert } from "react-native";

export interface LocationCoords {
  latitude: number;
  longitude: number;
  accuracy?: number;
  timestamp?: number;
}

class LocationService {
  private static instance: LocationService;
  private watchId: Location.LocationSubscription | null = null;
  private isTracking: boolean = false;

  static getInstance(): LocationService {
    if (!LocationService.instance) {
      LocationService.instance = new LocationService();
    }
    return LocationService.instance;
  }

  /**
   * 위치 권한 요청
   */
  async requestPermissions(): Promise<boolean> {
    try {
      // 포그라운드 권한 요청
      const { status: foregroundStatus } =
        await Location.requestForegroundPermissionsAsync();

      if (foregroundStatus !== "granted") {
        Alert.alert(
          "위치 권한 필요",
          "대리운전 서비스를 위해 위치 권한이 필요합니다.",
          [{ text: "확인" }]
        );
        return false;
      }

      // 백그라운드 권한 요청 (Android용)
      const { status: backgroundStatus } =
        await Location.requestBackgroundPermissionsAsync();

      if (backgroundStatus !== "granted") {
        Alert.alert(
          "백그라운드 위치 권한",
          '앱이 백그라운드에서도 위치를 추적하려면 "항상 허용"을 선택해주세요.',
          [{ text: "확인" }]
        );
      }

      return true;
    } catch (error) {
      console.error("위치 권한 요청 오류:", error);
      return false;
    }
  }

  /**
   * 현재 위치 가져오기
   */
  async getCurrentLocation(): Promise<LocationCoords | null> {
    try {
      const hasPermission = await this.requestPermissions();
      if (!hasPermission) return null;

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
        maximumAge: 60000, // 1분 이내 캐시된 위치 사용
      });

      return {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        accuracy: location.coords.accuracy,
        timestamp: location.timestamp,
      };
    } catch (error) {
      console.error("현재 위치 가져오기 오류:", error);
      Alert.alert("오류", "위치 정보를 가져올 수 없습니다.");
      return null;
    }
  }

  /**
   * 실시간 위치 추적 시작
   */
  async startTracking(
    callback: (location: LocationCoords) => void
  ): Promise<boolean> {
    try {
      const hasPermission = await this.requestPermissions();
      if (!hasPermission) return false;

      if (this.isTracking) {
        console.log("이미 위치 추적 중입니다.");
        return true;
      }

      this.watchId = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 5000, // 5초마다 업데이트
          distanceInterval: 10, // 10미터 이동 시 업데이트
        },
        (location) => {
          const coords: LocationCoords = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            accuracy: location.coords.accuracy,
            timestamp: location.timestamp,
          };
          callback(coords);
        }
      );

      this.isTracking = true;
      console.log("위치 추적을 시작했습니다.");
      return true;
    } catch (error) {
      console.error("위치 추적 시작 오류:", error);
      Alert.alert("오류", "위치 추적을 시작할 수 없습니다.");
      return false;
    }
  }

  /**
   * 실시간 위치 추적 중지
   */
  stopTracking(): void {
    if (this.watchId) {
      this.watchId.remove();
      this.watchId = null;
      this.isTracking = false;
      console.log("위치 추적을 중지했습니다.");
    }
  }

  /**
   * 위치 추적 상태 확인
   */
  isLocationTracking(): boolean {
    return this.isTracking;
  }

  /**
   * 두 좌표 간 거리 계산 (미터 단위)
   */
  calculateDistance(coord1: LocationCoords, coord2: LocationCoords): number {
    const R = 6371e3; // 지구 반지름 (미터)
    const φ1 = (coord1.latitude * Math.PI) / 180;
    const φ2 = (coord2.latitude * Math.PI) / 180;
    const Δφ = ((coord2.latitude - coord1.latitude) * Math.PI) / 180;
    const Δλ = ((coord2.longitude - coord1.longitude) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // 거리 (미터)
  }

  /**
   * 좌표를 주소로 변환 (역지오코딩)
   */
  async reverseGeocode(coords: LocationCoords): Promise<string | null> {
    try {
      const result = await Location.reverseGeocodeAsync({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });

      if (result.length > 0) {
        const address = result[0];
        return `${address.city || ""} ${address.district || ""} ${
          address.street || ""
        } ${address.streetNumber || ""}`.trim();
      }

      return null;
    } catch (error) {
      console.error("역지오코딩 오류:", error);
      return null;
    }
  }

  /**
   * 주소를 좌표로 변환 (지오코딩)
   */
  async geocode(address: string): Promise<LocationCoords | null> {
    try {
      const result = await Location.geocodeAsync(address);

      if (result.length > 0) {
        const coords = result[0];
        return {
          latitude: coords.latitude,
          longitude: coords.longitude,
        };
      }

      return null;
    } catch (error) {
      console.error("지오코딩 오류:", error);
      return null;
    }
  }
}

export default LocationService;
