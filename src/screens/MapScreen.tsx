import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import * as Location from "expo-location";

export default function MapScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = async () => {
    try {
      setIsLoading(true);
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "위치 권한 필요",
          "지도 서비스를 위해 위치 권한이 필요합니다.",
          [{ text: "확인" }]
        );
        setIsLoading(false);
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      setLocation(currentLocation);
      setIsLoading(false);
    } catch (error) {
      console.error("위치 가져오기 오류:", error);
      setIsLoading(false);
      Alert.alert("오류", "위치 정보를 가져올 수 없습니다.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      {/* 헤더 */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>실시간 지도</Text>
        <TouchableOpacity
          onPress={getCurrentLocation}
          style={styles.refreshButton}
        >
          <Ionicons name="refresh" size={24} color="#2c3e50" />
        </TouchableOpacity>
      </View>

      {/* 지도 영역 (실제 지도 컴포넌트 대신 플레이스홀더) */}
      <View style={styles.mapContainer}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <Ionicons name="location-outline" size={60} color="#bdc3c7" />
            <Text style={styles.loadingText}>위치 정보를 가져오는 중...</Text>
          </View>
        ) : location ? (
          <View style={styles.mapPlaceholder}>
            <Ionicons name="map" size={80} color="#3498db" />
            <Text style={styles.mapText}>지도 영역</Text>
            <Text style={styles.locationInfo}>
              위도: {location.coords.latitude.toFixed(6)}
            </Text>
            <Text style={styles.locationInfo}>
              경도: {location.coords.longitude.toFixed(6)}
            </Text>
            <Text style={styles.accuracyInfo}>
              정확도: {location.coords.accuracy?.toFixed(0)}m
            </Text>
          </View>
        ) : (
          <View style={styles.errorContainer}>
            <Ionicons name="alert-circle-outline" size={60} color="#e74c3c" />
            <Text style={styles.errorText}>위치 정보를 가져올 수 없습니다</Text>
            <TouchableOpacity
              style={styles.retryButton}
              onPress={getCurrentLocation}
            >
              <Text style={styles.retryButtonText}>다시 시도</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* 하단 컨트롤 */}
      <View style={styles.bottomControls}>
        <TouchableOpacity style={styles.controlButton}>
          <Ionicons name="layers-outline" size={24} color="#2c3e50" />
          <Text style={styles.controlText}>레이어</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.controlButton}>
          <Ionicons name="navigation-outline" size={24} color="#2c3e50" />
          <Text style={styles.controlText}>내 위치</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.controlButton}>
          <Ionicons name="search-outline" size={24} color="#2c3e50" />
          <Text style={styles.controlText}>검색</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.controlButton}>
          <Ionicons name="car-outline" size={24} color="#2c3e50" />
          <Text style={styles.controlText}>경로</Text>
        </TouchableOpacity>
      </View>

      {/* 플로팅 액션 버튼 */}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={getCurrentLocation}
      >
        <Ionicons name="locate" size={24} color="#ffffff" />
      </TouchableOpacity>
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
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#ecf0f1",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2c3e50",
  },
  refreshButton: {
    padding: 5,
  },
  mapContainer: {
    flex: 1,
    margin: 20,
    borderRadius: 15,
    overflow: "hidden",
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
  },
  loadingText: {
    fontSize: 16,
    color: "#7f8c8d",
    fontWeight: "500",
  },
  mapPlaceholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#ecf0f1",
  },
  mapText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#3498db",
    marginBottom: 20,
  },
  locationInfo: {
    fontSize: 14,
    color: "#2c3e50",
    fontFamily: "monospace",
  },
  accuracyInfo: {
    fontSize: 12,
    color: "#7f8c8d",
    marginTop: 10,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
  },
  errorText: {
    fontSize: 16,
    color: "#e74c3c",
    fontWeight: "500",
    textAlign: "center",
  },
  retryButton: {
    backgroundColor: "#3498db",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  retryButtonText: {
    color: "#ffffff",
    fontWeight: "600",
  },
  bottomControls: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#ffffff",
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: "#ecf0f1",
  },
  controlButton: {
    alignItems: "center",
    gap: 5,
  },
  controlText: {
    fontSize: 12,
    color: "#2c3e50",
    fontWeight: "500",
  },
  floatingButton: {
    position: "absolute",
    right: 30,
    bottom: 100,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#3498db",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
});
