import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

const { width, height } = Dimensions.get("window");

interface Props {
  navigation: any;
}

export default function UserTypeSelectionScreen({ navigation }: Props) {
  const selectCustomerSignup = () => {
    navigation.navigate("CustomerSignup");
  };

  const selectDriverSignup = () => {
    navigation.navigate("DriverSignup");
  };

  const goBackToLogin = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      {/* 뒤로가기 버튼 */}
      <TouchableOpacity style={styles.backButton} onPress={goBackToLogin}>
        <Ionicons name="chevron-back" size={24} color="#2c3e50" />
      </TouchableOpacity>

      <View style={styles.header}>
        <Text style={styles.title}>회원가입</Text>
        <Text style={styles.subtitle}>가입할 계정 유형을 선택해주세요</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.buttonContainer}>
          {/* 일반 사용자 회원가입 */}
          <TouchableOpacity
            style={[styles.typeButton, styles.customerButton]}
            onPress={selectCustomerSignup}
            activeOpacity={0.8}
          >
            <View style={styles.buttonContent}>
              <Ionicons name="person" size={60} color="#ffffff" />
              <Text style={styles.typeButtonTitle}>일반 사용자</Text>
              <Text style={styles.typeButtonDescription}>
                대리운전 서비스를{"\n"}이용하고 싶어요
              </Text>

              <View style={styles.featureList}>
                <View style={styles.featureItem}>
                  <Ionicons name="checkmark-circle" size={16} color="#ffffff" />
                  <Text style={styles.featureText}>대리운전 요청</Text>
                </View>
                <View style={styles.featureItem}>
                  <Ionicons name="checkmark-circle" size={16} color="#ffffff" />
                  <Text style={styles.featureText}>결제 및 이용내역</Text>
                </View>
                <View style={styles.featureItem}>
                  <Ionicons name="checkmark-circle" size={16} color="#ffffff" />
                  <Text style={styles.featureText}>즐겨찾기 관리</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>

          {/* 기사 회원가입 */}
          <TouchableOpacity
            style={[styles.typeButton, styles.driverButton]}
            onPress={selectDriverSignup}
            activeOpacity={0.8}
          >
            <View style={styles.buttonContent}>
              <Ionicons name="car" size={60} color="#ffffff" />
              <Text style={styles.typeButtonTitle}>대리운전 기사</Text>
              <Text style={styles.typeButtonDescription}>
                대리운전 서비스를{"\n"}제공하고 싶어요
              </Text>

              <View style={styles.featureList}>
                <View style={styles.featureItem}>
                  <Ionicons name="checkmark-circle" size={16} color="#ffffff" />
                  <Text style={styles.featureText}>운행 요청 수락</Text>
                </View>
                <View style={styles.featureItem}>
                  <Ionicons name="checkmark-circle" size={16} color="#ffffff" />
                  <Text style={styles.featureText}>수익 관리</Text>
                </View>
                <View style={styles.featureItem}>
                  <Ionicons name="checkmark-circle" size={16} color="#ffffff" />
                  <Text style={styles.featureText}>면허 인증 필요</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* 안내 메시지 */}
        <View style={styles.infoContainer}>
          <Ionicons
            name="information-circle-outline"
            size={20}
            color="#7f8c8d"
          />
          <Text style={styles.infoText}>
            회원가입 후에도 계정 유형을 변경할 수 있습니다.
          </Text>
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
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 1,
    padding: 10,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    alignItems: "center",
    paddingTop: 80,
    paddingBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#7f8c8d",
    fontWeight: "500",
    textAlign: "center",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    gap: 20,
    marginBottom: 30,
  },
  typeButton: {
    borderRadius: 20,
    padding: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  customerButton: {
    backgroundColor: "#1E90FF", // 고객 - 파란색
  },
  driverButton: {
    backgroundColor: "#2E8B57", // 기사 - 녹색
  },
  buttonContent: {
    alignItems: "center",
  },
  typeButtonTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
    marginTop: 15,
    marginBottom: 8,
  },
  typeButtonDescription: {
    fontSize: 14,
    color: "#ffffff",
    textAlign: "center",
    opacity: 0.9,
    lineHeight: 20,
    marginBottom: 20,
  },
  featureList: {
    alignSelf: "stretch",
    gap: 8,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  featureText: {
    fontSize: 14,
    color: "#ffffff",
    opacity: 0.9,
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 12,
    gap: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: "#7f8c8d",
    lineHeight: 20,
  },
});
