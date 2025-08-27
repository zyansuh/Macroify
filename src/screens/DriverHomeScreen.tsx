import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Switch,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import * as Location from "expo-location";

export default function DriverHomeScreen() {
  const [isOnline, setIsOnline] = useState(false);
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [earnings, setEarnings] = useState({
    today: 125000,
    thisWeek: 850000,
    thisMonth: 3200000,
  });

  useEffect(() => {
    getLocationPermission();
  }, []);

  const getLocationPermission = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "위치 권한 필요",
          "대리운전 서비스를 위해 위치 권한이 필요합니다.",
          [{ text: "확인" }]
        );
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
    } catch (error) {
      console.error("위치 가져오기 오류:", error);
    }
  };

  const toggleOnlineStatus = () => {
    if (!location) {
      Alert.alert("위치 정보 없음", "위치 정보를 먼저 확인해주세요.");
      return;
    }

    setIsOnline(!isOnline);

    if (!isOnline) {
      Alert.alert(
        "운행 시작",
        "이제 고객의 대리운전 요청을 받을 수 있습니다.",
        [{ text: "확인" }]
      );
    } else {
      Alert.alert("운행 종료", "대리운전 요청 받기를 중단합니다.", [
        { text: "확인" },
      ]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      {/* 헤더 */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>운전자 대시보드</Text>
        <TouchableOpacity style={styles.notificationButton}>
          <Ionicons name="notifications-outline" size={24} color="#ffffff" />
        </TouchableOpacity>
      </View>

      {/* 온라인 상태 토글 */}
      <View style={styles.statusCard}>
        <View style={styles.statusHeader}>
          <Text style={styles.statusTitle}>운행 상태</Text>
          <View style={styles.statusToggle}>
            <Text
              style={[
                styles.statusText,
                { color: isOnline ? "#27ae60" : "#e74c3c" },
              ]}
            >
              {isOnline ? "온라인" : "오프라인"}
            </Text>
            <Switch
              trackColor={{ false: "#e74c3c", true: "#27ae60" }}
              thumbColor={isOnline ? "#ffffff" : "#ffffff"}
              ios_backgroundColor="#e74c3c"
              onValueChange={toggleOnlineStatus}
              value={isOnline}
            />
          </View>
        </View>

        {isOnline && (
          <View style={styles.onlineInfo}>
            <Ionicons name="location" size={16} color="#27ae60" />
            <Text style={styles.locationText}>
              위치 추적 중 - 고객 요청 대기
            </Text>
          </View>
        )}
      </View>

      {/* 수익 정보 */}
      <View style={styles.earningsSection}>
        <Text style={styles.sectionTitle}>수익 현황</Text>

        <View style={styles.earningsGrid}>
          <View style={styles.earningCard}>
            <Text style={styles.earningAmount}>
              {earnings.today.toLocaleString()}원
            </Text>
            <Text style={styles.earningLabel}>오늘</Text>
          </View>

          <View style={styles.earningCard}>
            <Text style={styles.earningAmount}>
              {earnings.thisWeek.toLocaleString()}원
            </Text>
            <Text style={styles.earningLabel}>이번 주</Text>
          </View>

          <View style={styles.earningCard}>
            <Text style={styles.earningAmount}>
              {earnings.thisMonth.toLocaleString()}원
            </Text>
            <Text style={styles.earningLabel}>이번 달</Text>
          </View>
        </View>
      </View>

      {/* 빠른 액션 */}
      <View style={styles.quickActions}>
        <Text style={styles.sectionTitle}>빠른 액션</Text>

        <View style={styles.actionGrid}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="map-outline" size={30} color="#2E8B57" />
            <Text style={styles.actionText}>근처 요청</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="time-outline" size={30} color="#2E8B57" />
            <Text style={styles.actionText}>운행 내역</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="settings-outline" size={30} color="#2E8B57" />
            <Text style={styles.actionText}>설정</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="help-circle-outline" size={30} color="#2E8B57" />
            <Text style={styles.actionText}>고객센터</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#2E8B57",
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingTop: 50,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
  },
  notificationButton: {
    padding: 5,
  },
  statusCard: {
    backgroundColor: "#ffffff",
    margin: 20,
    padding: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statusHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2c3e50",
  },
  statusToggle: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  statusText: {
    fontSize: 16,
    fontWeight: "600",
  },
  onlineInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
    gap: 8,
  },
  locationText: {
    fontSize: 14,
    color: "#27ae60",
    fontWeight: "500",
  },
  earningsSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2c3e50",
    marginBottom: 15,
  },
  earningsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  earningCard: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  earningAmount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2E8B57",
    marginBottom: 5,
  },
  earningLabel: {
    fontSize: 12,
    color: "#7f8c8d",
  },
  quickActions: {
    paddingHorizontal: 20,
  },
  actionGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 15,
  },
  actionButton: {
    width: "48%",
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionText: {
    fontSize: 14,
    color: "#2c3e50",
    marginTop: 8,
    fontWeight: "500",
  },
});
