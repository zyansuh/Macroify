import { Alert, Platform, Linking } from "react-native";
import * as Notifications from "expo-notifications";

/**
 * 안드로이드 오버레이 권한 및 알림 관리 서비스
 * 대리운전 중 다른 앱 위에 표시되는 기능들을 관리
 */
class OverlayService {
  private static instance: OverlayService;

  static getInstance(): OverlayService {
    if (!OverlayService.instance) {
      OverlayService.instance = new OverlayService();
    }
    return OverlayService.instance;
  }

  /**
   * 오버레이 권한 요청 (SYSTEM_ALERT_WINDOW)
   */
  async requestOverlayPermission(): Promise<boolean> {
    if (Platform.OS !== "android") {
      console.log("오버레이 권한은 Android에서만 필요합니다.");
      return true;
    }

    try {
      // Android에서 오버레이 권한 안내
      Alert.alert(
        "화면 위에 표시 권한",
        "대리운전 중 중요한 정보를 다른 앱 위에 표시하기 위해 권한이 필요합니다.",
        [
          {
            text: "취소",
            style: "cancel",
            onPress: () => false,
          },
          {
            text: "설정으로 이동",
            onPress: () => {
              // Android 설정으로 이동
              Linking.openSettings();
            },
          },
        ]
      );

      return true;
    } catch (error) {
      console.error("오버레이 권한 요청 오류:", error);
      return false;
    }
  }

  /**
   * 대리운전 중 상태 알림 표시
   */
  async showDrivingStatusNotification(
    title: string,
    body: string,
    data?: any
  ): Promise<void> {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body,
          data,
          priority: Notifications.AndroidNotificationPriority.HIGH,
          categoryIdentifier: "driving_status",
        },
        trigger: null, // 즉시 표시
      });
    } catch (error) {
      console.error("알림 표시 오류:", error);
    }
  }

  /**
   * 운행 시작 알림
   */
  async notifyRideStart(
    customerName: string,
    destination: string
  ): Promise<void> {
    await this.showDrivingStatusNotification(
      "운행 시작",
      `${customerName}님을 ${destination}로 모시고 있습니다.`,
      {
        type: "ride_start",
        customer: customerName,
        destination,
      }
    );
  }

  /**
   * 운행 완료 알림
   */
  async notifyRideComplete(fare: number): Promise<void> {
    await this.showDrivingStatusNotification(
      "운행 완료",
      `운행이 완료되었습니다. 요금: ${fare.toLocaleString()}원`,
      {
        type: "ride_complete",
        fare,
      }
    );
  }

  /**
   * 고객 요청 알림
   */
  async notifyNewRequest(
    distance: number,
    estimatedFare: number,
    pickupAddress: string
  ): Promise<void> {
    await this.showDrivingStatusNotification(
      "새로운 대리운전 요청",
      `${distance.toFixed(
        1
      )}km 거리 • 예상요금 ${estimatedFare.toLocaleString()}원\n출발지: ${pickupAddress}`,
      {
        type: "new_request",
        distance,
        estimatedFare,
        pickupAddress,
      }
    );
  }

  /**
   * 긴급 상황 알림
   */
  async notifyEmergency(message: string): Promise<void> {
    await this.showDrivingStatusNotification("긴급 알림", message, {
      type: "emergency",
      message,
    });
  }

  /**
   * 포그라운드 서비스 시뮬레이션 (실제 구현은 네이티브 모듈 필요)
   */
  startForegroundService(title: string, content: string): void {
    if (Platform.OS !== "android") return;

    console.log("포그라운드 서비스 시작:", title, content);

    // 실제 Android 앱에서는 네이티브 모듈을 통해 구현
    // 여기서는 지속적인 알림으로 시뮬레이션
    this.showDrivingStatusNotification(title, content, {
      type: "foreground_service",
      persistent: true,
    });
  }

  /**
   * 포그라운드 서비스 중지
   */
  stopForegroundService(): void {
    if (Platform.OS !== "android") return;

    console.log("포그라운드 서비스 중지");

    // 관련 알림 취소
    Notifications.cancelAllScheduledNotificationsAsync();
  }

  /**
   * 운전 모드 시작
   */
  async startDrivingMode(): Promise<void> {
    try {
      // 오버레이 권한 확인
      await this.requestOverlayPermission();

      // 포그라운드 서비스 시작
      this.startForegroundService(
        "Macrofy 대리운전",
        "운행 대기 중입니다. 고객 요청을 기다리고 있어요."
      );

      console.log("운전 모드가 시작되었습니다.");
    } catch (error) {
      console.error("운전 모드 시작 오류:", error);
    }
  }

  /**
   * 운전 모드 종료
   */
  async stopDrivingMode(): Promise<void> {
    try {
      // 포그라운드 서비스 중지
      this.stopForegroundService();

      console.log("운전 모드가 종료되었습니다.");
    } catch (error) {
      console.error("운전 모드 종료 오류:", error);
    }
  }

  /**
   * 백그라운드에서 위치 추적 시작 안내
   */
  async requestBackgroundLocationTracking(): Promise<void> {
    Alert.alert(
      "백그라운드 위치 추적",
      '대리운전 서비스를 위해 앱이 백그라운드에서도 위치를 추적해야 합니다. 설정에서 위치 권한을 "항상 허용"으로 변경해주세요.',
      [
        { text: "나중에", style: "cancel" },
        {
          text: "설정으로 이동",
          onPress: () => Linking.openSettings(),
        },
      ]
    );
  }
}

export default OverlayService;
