import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

export default function RideHistoryScreen() {
  const rideHistory = [
    {
      id: "1",
      date: "2024.08.26",
      time: "23:45",
      from: "강남역 2번 출구",
      to: "서울시 서초구 서초동",
      fare: 25000,
      status: "completed",
      driverName: "이기사",
      rating: 5,
    },
    {
      id: "2",
      date: "2024.08.25",
      time: "22:30",
      from: "회사 (테헤란로)",
      to: "홍대입구역 9번 출구",
      fare: 18000,
      status: "completed",
      driverName: "박운전",
      rating: 4,
    },
    {
      id: "3",
      date: "2024.08.24",
      time: "01:15",
      from: "신촌 맛집거리",
      to: "집 (마포구 상암동)",
      fare: 22000,
      status: "completed",
      driverName: "최대리",
      rating: 5,
    },
    {
      id: "4",
      date: "2024.08.22",
      time: "20:00",
      from: "동대문 쇼핑몰",
      to: "강남구 논현동",
      fare: 28000,
      status: "completed",
      driverName: "김기사",
      rating: 4,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "#27ae60";
      case "cancelled":
        return "#e74c3c";
      default:
        return "#3498db";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "완료";
      case "cancelled":
        return "취소";
      default:
        return "진행중";
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Ionicons
        key={index}
        name={index < rating ? "star" : "star-outline"}
        size={12}
        color={index < rating ? "#f39c12" : "#bdc3c7"}
      />
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      {/* 헤더 */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>이용 내역</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="filter-outline" size={24} color="#ffffff" />
        </TouchableOpacity>
      </View>

      {/* 요약 통계 */}
      <View style={styles.summaryCard}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryNumber}>{rideHistory.length}</Text>
          <Text style={styles.summaryLabel}>총 이용 횟수</Text>
        </View>

        <View style={styles.summaryDivider} />

        <View style={styles.summaryItem}>
          <Text style={styles.summaryNumber}>
            {rideHistory
              .reduce((sum, ride) => sum + ride.fare, 0)
              .toLocaleString()}
            원
          </Text>
          <Text style={styles.summaryLabel}>총 결제 금액</Text>
        </View>

        <View style={styles.summaryDivider} />

        <View style={styles.summaryItem}>
          <Text style={styles.summaryNumber}>
            {(
              rideHistory.reduce((sum, ride) => sum + ride.rating, 0) /
              rideHistory.length
            ).toFixed(1)}
          </Text>
          <Text style={styles.summaryLabel}>평균 평점</Text>
        </View>
      </View>

      {/* 이용 내역 리스트 */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {rideHistory.map((ride) => (
          <TouchableOpacity key={ride.id} style={styles.rideCard}>
            {/* 날짜 및 상태 */}
            <View style={styles.rideHeader}>
              <View style={styles.dateTimeContainer}>
                <Text style={styles.rideDate}>{ride.date}</Text>
                <Text style={styles.rideTime}>{ride.time}</Text>
              </View>
              <View
                style={[
                  styles.statusBadge,
                  { backgroundColor: getStatusColor(ride.status) },
                ]}
              >
                <Text style={styles.statusText}>
                  {getStatusText(ride.status)}
                </Text>
              </View>
            </View>

            {/* 경로 정보 */}
            <View style={styles.routeContainer}>
              <View style={styles.routeIndicator}>
                <View style={styles.startDot} />
                <View style={styles.routeLine} />
                <View style={styles.endDot} />
              </View>

              <View style={styles.routeDetails}>
                <View style={styles.locationContainer}>
                  <Text style={styles.locationText}>{ride.from}</Text>
                </View>
                <View style={[styles.locationContainer, { marginTop: 20 }]}>
                  <Text style={styles.locationText}>{ride.to}</Text>
                </View>
              </View>
            </View>

            {/* 운전자 및 요금 정보 */}
            <View style={styles.rideFooter}>
              <View style={styles.driverInfo}>
                <Text style={styles.driverName}>{ride.driverName} 기사님</Text>
                <View style={styles.ratingContainer}>
                  {renderStars(ride.rating)}
                </View>
              </View>

              <Text style={styles.fareAmount}>
                {ride.fare.toLocaleString()}원
              </Text>
            </View>

            {/* 액션 버튼들 */}
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="receipt-outline" size={16} color="#3498db" />
                <Text style={styles.actionButtonText}>영수증</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="refresh-outline" size={16} color="#3498db" />
                <Text style={styles.actionButtonText}>재요청</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="chatbubble-outline" size={16} color="#3498db" />
                <Text style={styles.actionButtonText}>문의</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}

        <View style={styles.bottomPadding} />
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
  filterButton: {
    padding: 5,
  },
  summaryCard: {
    flexDirection: "row",
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
  summaryItem: {
    flex: 1,
    alignItems: "center",
  },
  summaryNumber: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 5,
  },
  summaryLabel: {
    fontSize: 12,
    color: "#7f8c8d",
    textAlign: "center",
  },
  summaryDivider: {
    width: 1,
    backgroundColor: "#ecf0f1",
    marginHorizontal: 15,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  rideCard: {
    backgroundColor: "#ffffff",
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  rideHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 15,
  },
  dateTimeContainer: {
    flex: 1,
  },
  rideDate: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2c3e50",
    marginBottom: 2,
  },
  rideTime: {
    fontSize: 14,
    color: "#7f8c8d",
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    color: "#ffffff",
    fontWeight: "600",
  },
  routeContainer: {
    flexDirection: "row",
    marginBottom: 15,
  },
  routeIndicator: {
    alignItems: "center",
    marginRight: 15,
    paddingTop: 5,
  },
  startDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#27ae60",
  },
  routeLine: {
    width: 2,
    height: 30,
    backgroundColor: "#bdc3c7",
    marginVertical: 5,
  },
  endDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#e74c3c",
  },
  routeDetails: {
    flex: 1,
  },
  locationContainer: {
    minHeight: 20,
    justifyContent: "center",
  },
  locationText: {
    fontSize: 14,
    color: "#2c3e50",
    lineHeight: 20,
  },
  rideFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "#f8f9fa",
  },
  driverInfo: {
    flex: 1,
  },
  driverName: {
    fontSize: 14,
    color: "#2c3e50",
    fontWeight: "500",
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: "row",
    gap: 2,
  },
  fareAmount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2c3e50",
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "#f8f9fa",
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  actionButtonText: {
    fontSize: 14,
    color: "#3498db",
    fontWeight: "500",
  },
  bottomPadding: {
    height: 20,
  },
});
