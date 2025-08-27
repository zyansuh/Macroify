import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useAuth } from "../contexts/AuthContext";

interface Props {
  navigation: any;
}

export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { login, loginWithKakao } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("입력 확인", "이메일과 비밀번호를 모두 입력해주세요.");
      return;
    }

    setIsLoading(true);
    try {
      const success = await login({ email, password });

      if (success) {
        // 로그인 성공 시 메인 화면으로 이동 (네비게이션에서 자동 처리)
        console.log("로그인 성공");
      } else {
        Alert.alert("로그인 실패", "이메일 또는 비밀번호가 올바르지 않습니다.");
      }
    } catch (error) {
      Alert.alert("오류", "로그인 중 문제가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKakaoLogin = async () => {
    setIsLoading(true);
    try {
      const success = await loginWithKakao();

      if (success) {
        console.log("카카오 로그인 성공");
      } else {
        Alert.alert("로그인 실패", "카카오 로그인에 실패했습니다.");
      }
    } catch (error) {
      Alert.alert("오류", "카카오 로그인 중 문제가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const navigateToSignup = () => {
    navigation.navigate("UserTypeSelection");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* 헤더 */}
          <View style={styles.header}>
            <Text style={styles.title}>Macrofy</Text>
            <Text style={styles.subtitle}>안전한 대리운전 서비스</Text>
          </View>

          {/* 로그인 폼 */}
          <View style={styles.formContainer}>
            <Text style={styles.formTitle}>로그인</Text>

            {/* 이메일 입력 */}
            <View style={styles.inputContainer}>
              <Ionicons name="mail-outline" size={20} color="#7f8c8d" />
              <TextInput
                style={styles.textInput}
                placeholder="이메일"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
              />
            </View>

            {/* 비밀번호 입력 */}
            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={20} color="#7f8c8d" />
              <TextInput
                style={styles.textInput}
                placeholder="비밀번호"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoComplete="password"
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeButton}
              >
                <Ionicons
                  name={showPassword ? "eye-outline" : "eye-off-outline"}
                  size={20}
                  color="#7f8c8d"
                />
              </TouchableOpacity>
            </View>

            {/* 로그인 버튼 */}
            <TouchableOpacity
              style={[styles.loginButton, isLoading && styles.disabledButton]}
              onPress={handleLogin}
              disabled={isLoading}
              activeOpacity={0.8}
            >
              {isLoading ? (
                <Text style={styles.buttonText}>로그인 중...</Text>
              ) : (
                <Text style={styles.buttonText}>로그인</Text>
              )}
            </TouchableOpacity>

            {/* 또는 구분선 */}
            <View style={styles.dividerContainer}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>또는</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* 카카오 로그인 버튼 */}
            <TouchableOpacity
              style={[styles.kakaoButton, isLoading && styles.disabledButton]}
              onPress={handleKakaoLogin}
              disabled={isLoading}
              activeOpacity={0.8}
            >
              <View style={styles.kakaoIcon}>
                <Text style={styles.kakaoIconText}>K</Text>
              </View>
              <Text style={styles.kakaoButtonText}>카카오로 로그인</Text>
            </TouchableOpacity>

            {/* 하단 링크들 */}
            <View style={styles.bottomLinks}>
              <TouchableOpacity style={styles.linkButton}>
                <Text style={styles.linkText}>비밀번호 찾기</Text>
              </TouchableOpacity>

              <Text style={styles.linkSeparator}>|</Text>

              <TouchableOpacity
                style={styles.linkButton}
                onPress={navigateToSignup}
              >
                <Text style={styles.linkText}>회원가입</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* 게스트 로그인 */}
          <View style={styles.guestContainer}>
            <TouchableOpacity
              style={styles.guestButton}
              onPress={() => navigation.navigate("ModeSelection")}
            >
              <Text style={styles.guestButtonText}>둘러보기 (게스트 모드)</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
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
  formContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2c3e50",
    textAlign: "center",
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ecf0f1",
  },
  textInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: "#2c3e50",
  },
  eyeButton: {
    padding: 5,
  },
  loginButton: {
    backgroundColor: "#3498db",
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  disabledButton: {
    opacity: 0.6,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#ecf0f1",
  },
  dividerText: {
    marginHorizontal: 15,
    color: "#7f8c8d",
    fontSize: 14,
  },
  kakaoButton: {
    flexDirection: "row",
    backgroundColor: "#FEE500",
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  kakaoIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#3C1E1E",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  kakaoIconText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "bold",
  },
  kakaoButtonText: {
    color: "#3C1E1E",
    fontSize: 16,
    fontWeight: "600",
  },
  bottomLinks: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  linkButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  linkText: {
    color: "#3498db",
    fontSize: 14,
    fontWeight: "500",
  },
  linkSeparator: {
    color: "#bdc3c7",
    fontSize: 14,
    marginHorizontal: 5,
  },
  guestContainer: {
    marginTop: 30,
    alignItems: "center",
  },
  guestButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  guestButtonText: {
    color: "#7f8c8d",
    fontSize: 14,
    textDecorationLine: "underline",
  },
});
