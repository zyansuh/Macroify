import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Alert,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import * as Location from "expo-location";

export default function CustomerHomeScreen() {
  const [currentLocation, setCurrentLocation] =
    useState<Location.LocationObject | null>(null);
  const [pickupAddress, setPickupAddress] = useState("");
  const [destinationAddress, setDestinationAddress] = useState("");
  const [estimatedFare, setEstimatedFare] = useState(0);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = async () => {
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

      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location);

      // 현재 위치 주소로 변환 (임시)
      setPickupAddress("현재 위치를 가져오는 중...");
    } catch (error) {
      console.error("위치 가져오기 오류:", error);
    }
  };

  const calculateFare = () => {
    // 간단한 요금 계산 (실제로는 거리와 시간을 기반으로)
    const baseFare = 15000;
    const randomAddition = Math.floor(Math.random() * 20000);
    setEstimatedFare(baseFare + randomAddition);
  };

  const requestRide = () => {
    if (!pickupAddress || !destinationAddress) {
      Alert.alert("입력 확인", "출발지와 목적지를 모두 입력해주세요.");
      return;
    }

    Alert.alert(
      "대리운전 요청",
      `예상 요금: ${estimatedFare.toLocaleString()}원\n\n대리운전을 요청하시겠습니까?`,
      [
        { text: "취소", style: "cancel" },
        {
          text: "요청하기",
          onPress: () => {
            Alert.alert("요청 완료", "근처 운전자를 찾고 있습니다...");
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      {/* 헤더 */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Macrofy</Text>
        <TouchableOpacity style={styles.notificationButton}>
          <Ionicons name="notifications-outline" size={24} color="#ffffff" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* 현재 위치 카드 */}
        <View style={styles.locationCard}>
          <View style={styles.locationHeader}>
            <Ionicons name="location" size={20} color="#1E90FF" />
            <Text style={styles.locationTitle}>현재 위치</Text>
            <TouchableOpacity onPress={getCurrentLocation}>
              <Ionicons name="refresh" size={20} color="#1E90FF" />
            </TouchableOpacity>
          </View>
          <Text style={styles.locationText}>
            {currentLocation ? "위치 확인됨" : "위치를 가져오는 중..."}
          </Text>
        </View>

        {/* 대리운전 요청 폼 */}
        <View style={styles.requestCard}>
          <Text style={styles.cardTitle}>대리운전 요청</Text>

          {/* 출발지 */}
          <View style={styles.inputContainer}>
            <View style={styles.inputIcon}>
              <Ionicons name="radio-button-on" size={16} color="#27ae60" />
            </View>
            <TextInput
              style={styles.textInput}
              placeholder="출발지를 입력하세요"
              value={pickupAddress}
              onChangeText={setPickupAddress}
              multiline
            />
          </View>

          {/* 목적지 */}
          <View style={styles.inputContainer}>
            <View style={styles.inputIcon}>
              <Ionicons name="location" size={16} color="#e74c3c" />
            </View>
            <TextInput
              style={styles.textInput}
              placeholder="목적지를 입력하세요"
              value={destinationAddress}
              onChangeText={setDestinationAddress}
              onEndEditing={calculateFare}
              multiline
            />
          </View>

          {/* 예상 요금 */}
          {estimatedFare > 0 && (
            <View style={styles.fareContainer}>
              <Text style={styles.fareLabel}>예상 요금</Text>
              <Text style={styles.fareAmount}>
                {estimatedFare.toLocaleString()}원
              </Text>
            </View>
          )}

          {/* 요청 버튼 */}
          <TouchableOpacity
            style={styles.requestButton}
            onPress={requestRide}
            activeOpacity={0.8}
          >
            <Ionicons name="car" size={24} color="#ffffff" />
            <Text style={styles.requestButtonText}>대리운전 요청하기</Text>
          </TouchableOpacity>
        </View>

        {/* 빠른 바로가기 */}
        <View style={styles.quickLinksCard}>
          <Text style={styles.cardTitle}>빠른 바로가기</Text>

          <View style={styles.quickLinksGrid}>
            <TouchableOpacity style={styles.quickLinkButton}>
              <Ionicons name="home-outline" size={30} color="#1E90FF" />
              <Text style={styles.quickLinkText}>집으로</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.quickLinkButton}>
              <Ionicons name="business-outline" size={30} color="#1E90FF" />
              <Text style={styles.quickLinkText}>회사로</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.quickLinkButton}>
              <Ionicons name="time-outline" size={30} color="#1E90FF" />
              <Text style={styles.quickLinkText}>이용내역</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.quickLinkButton}>
              <Ionicons name="star-outline" size={30} color="#1E90FF" />
              <Text style={styles.quickLinkText}>즐겨찾기</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 최근 이용 내역 */}
        <View style={styles.recentRidesCard}>
          <Text style={styles.cardTitle}>최근 이용 내역</Text>

          <TouchableOpacity style={styles.rideItem}>
            <View style={styles.rideInfo}>
              <Text style={styles.rideDestination}>강남역 → 집</Text>
              <Text style={styles.rideDate}>2024.08.26</Text>
            </View>
            <Text style={styles.rideFare}>25,000원</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.rideItem}>
            <View style={styles.rideInfo}>
              <Text style={styles.rideDestination}>회사 → 홍대입구역</Text>
              <Text style={styles.rideDate}>2024.08.25</Text>
            </View>
            <Text style={styles.rideFare}>18,000원</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    backgroundColor: "#1E90FF",
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingTop: 50,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
  },
  notificationButton: {
    padding: 5,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  locationCard: {
    backgroundColor: "#ffffff",
    marginTop: 20,
    padding: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  locationHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  locationTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2c3e50",
    flex: 1,
    marginLeft: 8,
  },
  locationText: {
    fontSize: 14,
    color: "#7f8c8d",
    marginLeft: 28,
  },
  requestCard: {
    backgroundColor: "#ffffff",
    marginTop: 15,
    padding: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2c3e50",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#f8f9fa",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  inputIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: "#2c3e50",
    minHeight: 20,
  },
  fareContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#e8f5e8",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  fareLabel: {
    fontSize: 16,
    color: "#27ae60",
    fontWeight: "600",
  },
  fareAmount: {
    fontSize: 18,
    color: "#27ae60",
    fontWeight: "bold",
  },
  requestButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1E90FF",
    borderRadius: 12,
    padding: 18,
    gap: 10,
  },
  requestButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
  },
  quickLinksCard: {
    backgroundColor: "#ffffff",
    marginTop: 15,
    padding: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quickLinksGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 15,
  },
  quickLinkButton: {
    width: "48%",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#f8f9fa",
    borderRadius: 10,
  },
  quickLinkText: {
    fontSize: 14,
    color: "#2c3e50",
    marginTop: 8,
    fontWeight: "500",
  },
  recentRidesCard: {
    backgroundColor: "#ffffff",
    marginTop: 15,
    marginBottom: 20,
    padding: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  rideItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ecf0f1",
  },
  rideInfo: {
    flex: 1,
  },
  rideDestination: {
    fontSize: 16,
    color: "#2c3e50",
    fontWeight: "500",
    marginBottom: 4,
  },
  rideDate: {
    fontSize: 14,
    color: "#7f8c8d",
  },
  rideFare: {
    fontSize: 16,
    color: "#1E90FF",
    fontWeight: "600",
  },
});
