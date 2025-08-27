import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

// 화면 임포트
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

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="ModeSelection"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="ModeSelection" component={ModeSelectionScreen} />
        <Stack.Screen name="DriverTabs" component={DriverTabNavigator} />
        <Stack.Screen name="CustomerTabs" component={CustomerTabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
