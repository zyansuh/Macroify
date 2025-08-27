import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Platform, Alert } from "react-native";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { activateKeepAwake, deactivateKeepAwake } from "expo-keep-awake";

import AppNavigator from "./src/navigation/AppNavigator";
import { AppProvider } from "./src/contexts/AppContext";
import { AuthProvider } from "./src/contexts/AuthContext";

// 알림 설정
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  useEffect(() => {
    // 앱 초기화
    initializeApp();

    // 화면 항상 켜짐 설정 (대리운전 특성상 필요)
    if (Platform.OS === "android") {
      activateKeepAwake();
    }

    return () => {
      // 정리 작업
      if (Platform.OS === "android") {
        deactivateKeepAwake();
      }
    };
  }, []);

  const initializeApp = async () => {
    try {
      // 푸시 알림 권한 요청
      await requestNotificationPermissions();

      // 디바이스 정보 확인
      checkDeviceCapabilities();
    } catch (error) {
      console.error("앱 초기화 오류:", error);
    }
  };

  const requestNotificationPermissions = async () => {
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== "granted") {
        Alert.alert(
          "알림 권한",
          "대리운전 요청 및 알림을 받으려면 알림 권한이 필요합니다.",
          [{ text: "확인" }]
        );
      }
    } else {
      Alert.alert(
        "알림",
        "실제 디바이스에서만 푸시 알림을 사용할 수 있습니다."
      );
    }
  };

  const checkDeviceCapabilities = () => {
    if (Platform.OS === "android") {
      console.log("Android 디바이스에서 실행 중");
      console.log("디바이스 모델:", Device.modelName);
      console.log("안드로이드 버전:", Device.osVersion);
    }
  };

  return (
    <AuthProvider>
      <AppProvider>
        <StatusBar style="auto" />
        <AppNavigator />
      </AppProvider>
    </AuthProvider>
  );
}
