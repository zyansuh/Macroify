import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../contexts/AuthContext";
import { View, ActivityIndicator, StyleSheet } from "react-native";

// 인증 화면 임포트
import LoginScreen from "../screens/LoginScreen";
import UserTypeSelectionScreen from "../screens/UserTypeSelectionScreen";
import CustomerSignupScreen from "../screens/CustomerSignupScreen";
import DriverSignupScreen from "../screens/DriverSignupScreen";

// 메인 화면 임포트
import ModeSelectionScreen from "../screens/ModeSelectionScreen";
import DriverHomeScreen from "../screens/DriverHomeScreen";
import CustomerHomeScreen from "../screens/CustomerHomeScreen";
import MapScreen from "../screens/MapScreen";
import ProfileScreen from "../screens/ProfileScreen";
import RideHistoryScreen from "../screens/RideHistoryScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// 운전자 탭 네비게이터
function DriverTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: any;

          if (route.name === "DriverHome") {
            iconName = focused ? "car" : "car-outline";
          } else if (route.name === "Map") {
            iconName = focused ? "map" : "map-outline";
          } else if (route.name === "History") {
            iconName = focused ? "time" : "time-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#2E8B57",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="DriverHome"
        component={DriverHomeScreen}
        options={{ title: "홈" }}
      />
      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{ title: "지도" }}
      />
      <Tab.Screen
        name="History"
        component={RideHistoryScreen}
        options={{ title: "운행내역" }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: "내정보" }}
      />
    </Tab.Navigator>
  );
}

// 고객 탭 네비게이터
function CustomerTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: any;

          if (route.name === "CustomerHome") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Map") {
            iconName = focused ? "map" : "map-outline";
          } else if (route.name === "History") {
            iconName = focused ? "time" : "time-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#1E90FF",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="CustomerHome"
        component={CustomerHomeScreen}
        options={{ title: "홈" }}
      />
      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{ title: "지도" }}
      />
      <Tab.Screen
        name="History"
        component={RideHistoryScreen}
        options={{ title: "이용내역" }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: "내정보" }}
      />
    </Tab.Navigator>
  );
}

// 인증 스택 네비게이터
function AuthStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen
        name="UserTypeSelection"
        component={UserTypeSelectionScreen}
      />
      <Stack.Screen name="CustomerSignup" component={CustomerSignupScreen} />
      <Stack.Screen name="DriverSignup" component={DriverSignupScreen} />
    </Stack.Navigator>
  );
}

// 메인 앱 스택 네비게이터
function MainStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="ModeSelection"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="ModeSelection" component={ModeSelectionScreen} />
      <Stack.Screen name="DriverTabs" component={DriverTabNavigator} />
      <Stack.Screen name="CustomerTabs" component={CustomerTabNavigator} />
    </Stack.Navigator>
  );
}

// 로딩 스크린 컴포넌트
function LoadingScreen() {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#3498db" />
    </View>
  );
}

export default function AppNavigator() {
  const { state } = useAuth();

  return (
    <NavigationContainer>
      {state.isLoading ? (
        <LoadingScreen />
      ) : state.isAuthenticated ? (
        <MainStackNavigator />
      ) : (
        <AuthStackNavigator />
      )}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
  },
});
