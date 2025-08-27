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

export default function ModeSelectionScreen({ navigation }: Props) {
  const selectDriverMode = () => {
    navigation.navigate("DriverTabs");
  };

  const selectCustomerMode = () => {
    navigation.navigate("CustomerTabs");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <View style={styles.header}>
        <Text style={styles.title}>Macrofy</Text>
        <Text style={styles.subtitle}>안전한 대리운전 서비스</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.modeTitle}>모드를 선택해주세요</Text>

        <View style={styles.buttonContainer}>
          {/* 운전자 모드 */}
          <TouchableOpacity
            style={[styles.modeButton, styles.driverButton]}
            onPress={selectDriverMode}
            activeOpacity={0.8}
          >
            <Ionicons name="car" size={60} color="#ffffff" />
            <Text style={styles.modeButtonText}>운전자</Text>
            <Text style={styles.modeDescription}>
              대리운전으로{"\n"}수익을 창출하세요
            </Text>
          </TouchableOpacity>

          {/* 고객 모드 */}
          <TouchableOpacity
            style={[styles.modeButton, styles.customerButton]}
            onPress={selectCustomerMode}
            activeOpacity={0.8}
          >
            <Ionicons name="person" size={60} color="#ffffff" />
            <Text style={styles.modeButtonText}>고객</Text>
            <Text style={styles.modeDescription}>
              안전한 대리운전{"\n"}서비스를 이용하세요
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>24시간 언제든지 안전하게</Text>
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
    alignItems: "center",
    paddingTop: 40,
    paddingBottom: 20,
  },
  title: {
    fontSize: 42,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#7f8c8d",
    fontWeight: "500",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  modeTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: "#2c3e50",
    textAlign: "center",
    marginBottom: 40,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20,
  },
  modeButton: {
    flex: 1,
    height: 200,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  driverButton: {
    backgroundColor: "#2E8B57", // 운전자 - 녹색
  },
  customerButton: {
    backgroundColor: "#1E90FF", // 고객 - 파란색
  },
  modeButtonText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#ffffff",
    marginTop: 12,
    marginBottom: 8,
  },
  modeDescription: {
    fontSize: 14,
    color: "#ffffff",
    textAlign: "center",
    opacity: 0.9,
    lineHeight: 20,
  },
  footer: {
    alignItems: "center",
    paddingBottom: 30,
  },
  footerText: {
    fontSize: 16,
    color: "#95a5a6",
    fontWeight: "500",
  },
});
