import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useAuth } from "../contexts/AuthContext";

export default function ProfileScreen() {
  const { state, logout } = useAuth();

  const userInfo = {
    name: state.user?.name || "김대리",
    phone: state.user?.phone || "010-1234-5678",
    email: state.user?.email || "kim.daeri@example.com",
    rating: 4.8,
    totalRides: 156,
    memberSince: "2023.03.15",
  };

  const handleLogout = () => {
    Alert.alert("로그아웃", "정말로 로그아웃하시겠습니까?", [
      { text: "취소", style: "cancel" },
      {
        text: "로그아웃",
        onPress: async () => {
          await logout();
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      {/* 헤더 */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>내 정보</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Ionicons name="settings-outline" size={24} color="#ffffff" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* 프로필 정보 */}
        <View style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <View style={styles.avatarContainer}>
              <Ionicons name="person" size={40} color="#ffffff" />
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.userName}>{userInfo.name}</Text>
              <Text style={styles.userPhone}>{userInfo.phone}</Text>
              <View style={styles.ratingContainer}>
                <Ionicons name="star" size={16} color="#f39c12" />
                <Text style={styles.ratingText}>{userInfo.rating}</Text>
                <Text style={styles.rideCount}>
                  • {userInfo.totalRides}회 이용
                </Text>
              </View>
            </View>
            <TouchableOpacity style={styles.editButton}>
              <Ionicons name="pencil" size={20} color="#3498db" />
            </TouchableOpacity>
          </View>

          <View style={styles.memberInfo}>
            <Text style={styles.memberSinceText}>
              가입일: {userInfo.memberSince}
            </Text>
          </View>
        </View>

        {/* 통계 */}
        <View style={styles.statsCard}>
          <Text style={styles.cardTitle}>이용 통계</Text>

          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Ionicons name="car-outline" size={24} color="#3498db" />
              <Text style={styles.statNumber}>{userInfo.totalRides}</Text>
              <Text style={styles.statLabel}>총 이용 횟수</Text>
            </View>

            <View style={styles.statItem}>
              <Ionicons name="star-outline" size={24} color="#f39c12" />
              <Text style={styles.statNumber}>{userInfo.rating}</Text>
              <Text style={styles.statLabel}>평균 평점</Text>
            </View>

            <View style={styles.statItem}>
              <Ionicons name="time-outline" size={24} color="#27ae60" />
              <Text style={styles.statNumber}>11</Text>
              <Text style={styles.statLabel}>이번 달 이용</Text>
            </View>
          </View>
        </View>

        {/* 메뉴 리스트 */}
        <View style={styles.menuCard}>
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuLeft}>
              <Ionicons name="card-outline" size={24} color="#2c3e50" />
              <Text style={styles.menuText}>결제 수단 관리</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#bdc3c7" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuLeft}>
              <Ionicons name="location-outline" size={24} color="#2c3e50" />
              <Text style={styles.menuText}>주소 관리</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#bdc3c7" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuLeft}>
              <Ionicons name="receipt-outline" size={24} color="#2c3e50" />
              <Text style={styles.menuText}>이용 내역</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#bdc3c7" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuLeft}>
              <Ionicons name="heart-outline" size={24} color="#2c3e50" />
              <Text style={styles.menuText}>즐겨찾기</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#bdc3c7" />
          </TouchableOpacity>
        </View>

        {/* 설정 및 지원 */}
        <View style={styles.menuCard}>
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuLeft}>
              <Ionicons
                name="notifications-outline"
                size={24}
                color="#2c3e50"
              />
              <Text style={styles.menuText}>알림 설정</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#bdc3c7" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuLeft}>
              <Ionicons name="shield-outline" size={24} color="#2c3e50" />
              <Text style={styles.menuText}>개인정보 보호</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#bdc3c7" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuLeft}>
              <Ionicons name="help-circle-outline" size={24} color="#2c3e50" />
              <Text style={styles.menuText}>도움말 및 지원</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#bdc3c7" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuLeft}>
              <Ionicons
                name="document-text-outline"
                size={24}
                color="#2c3e50"
              />
              <Text style={styles.menuText}>이용약관</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#bdc3c7" />
          </TouchableOpacity>
        </View>

        {/* 로그아웃 */}
        <View style={styles.menuCard}>
          <TouchableOpacity
            style={[styles.menuItem, styles.logoutItem]}
            onPress={handleLogout}
          >
            <View style={styles.menuLeft}>
              <Ionicons name="log-out-outline" size={24} color="#e74c3c" />
              <Text style={[styles.menuText, styles.logoutText]}>로그아웃</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.versionText}>버전 1.0.0</Text>
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
    backgroundColor: "#2c3e50",
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingTop: 50,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
  },
  settingsButton: {
    padding: 5,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  profileCard: {
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
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  avatarContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#3498db",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 4,
  },
  userPhone: {
    fontSize: 14,
    color: "#7f8c8d",
    marginBottom: 6,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#f39c12",
  },
  rideCount: {
    fontSize: 14,
    color: "#7f8c8d",
  },
  editButton: {
    padding: 8,
  },
  memberInfo: {
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "#ecf0f1",
  },
  memberSinceText: {
    fontSize: 14,
    color: "#7f8c8d",
  },
  statsCard: {
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
  statsGrid: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  statItem: {
    alignItems: "center",
    gap: 8,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2c3e50",
  },
  statLabel: {
    fontSize: 12,
    color: "#7f8c8d",
    textAlign: "center",
  },
  menuCard: {
    backgroundColor: "#ffffff",
    marginTop: 15,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f8f9fa",
  },
  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  menuText: {
    fontSize: 16,
    color: "#2c3e50",
    fontWeight: "500",
  },
  logoutItem: {
    borderBottomWidth: 0,
  },
  logoutText: {
    color: "#e74c3c",
  },
  footer: {
    alignItems: "center",
    paddingVertical: 30,
  },
  versionText: {
    fontSize: 14,
    color: "#bdc3c7",
  },
});
