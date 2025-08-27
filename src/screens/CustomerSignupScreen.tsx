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

export default function CustomerSignupScreen({ navigation }: Props) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { signup } = useAuth();

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      Alert.alert("입력 확인", "이름을 입력해주세요.");
      return false;
    }

    if (!formData.email.trim()) {
      Alert.alert("입력 확인", "이메일을 입력해주세요.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      Alert.alert("입력 확인", "올바른 이메일 형식을 입력해주세요.");
      return false;
    }

    if (!formData.phone.trim()) {
      Alert.alert("입력 확인", "전화번호를 입력해주세요.");
      return false;
    }

    const phoneRegex = /^010-?[0-9]{4}-?[0-9]{4}$/;
    if (!phoneRegex.test(formData.phone.replace(/[^0-9]/g, ""))) {
      Alert.alert(
        "입력 확인",
        "올바른 전화번호 형식을 입력해주세요. (010-1234-5678)"
      );
      return false;
    }

    if (formData.password.length < 6) {
      Alert.alert("입력 확인", "비밀번호는 6자 이상이어야 합니다.");
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      Alert.alert("입력 확인", "비밀번호가 일치하지 않습니다.");
      return false;
    }

    if (!agreeTerms || !agreePrivacy) {
      Alert.alert("약관 동의", "필수 약관에 동의해주세요.");
      return false;
    }

    return true;
  };

  const handleSignup = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const signupData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.replace(/[^0-9]/g, ""),
        password: formData.password,
        userType: "customer" as const,
      };

      const success = await signup(signupData);

      if (success) {
        Alert.alert("회원가입 완료", "환영합니다! 로그인되었습니다.", [
          { text: "확인" },
        ]);
      } else {
        Alert.alert("회원가입 실패", "회원가입 중 문제가 발생했습니다.");
      }
    } catch (error) {
      Alert.alert("오류", "회원가입 중 문제가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      {/* 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color="#2c3e50" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>일반 사용자 회원가입</Text>
        <View style={styles.placeholder} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.formContainer}>
            {/* 프로필 섹션 */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>기본 정보</Text>

              {/* 이름 */}
              <View style={styles.inputContainer}>
                <Ionicons name="person-outline" size={20} color="#7f8c8d" />
                <TextInput
                  style={styles.textInput}
                  placeholder="이름"
                  value={formData.name}
                  onChangeText={(value) => handleInputChange("name", value)}
                  autoComplete="name"
                />
              </View>

              {/* 이메일 */}
              <View style={styles.inputContainer}>
                <Ionicons name="mail-outline" size={20} color="#7f8c8d" />
                <TextInput
                  style={styles.textInput}
                  placeholder="이메일"
                  value={formData.email}
                  onChangeText={(value) => handleInputChange("email", value)}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                />
              </View>

              {/* 전화번호 */}
              <View style={styles.inputContainer}>
                <Ionicons name="call-outline" size={20} color="#7f8c8d" />
                <TextInput
                  style={styles.textInput}
                  placeholder="전화번호 (010-1234-5678)"
                  value={formData.phone}
                  onChangeText={(value) => handleInputChange("phone", value)}
                  keyboardType="phone-pad"
                  autoComplete="tel"
                />
              </View>
            </View>

            {/* 보안 섹션 */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>보안 설정</Text>

              {/* 비밀번호 */}
              <View style={styles.inputContainer}>
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color="#7f8c8d"
                />
                <TextInput
                  style={styles.textInput}
                  placeholder="비밀번호 (6자 이상)"
                  value={formData.password}
                  onChangeText={(value) => handleInputChange("password", value)}
                  secureTextEntry={!showPassword}
                  autoComplete="new-password"
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

              {/* 비밀번호 확인 */}
              <View style={styles.inputContainer}>
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color="#7f8c8d"
                />
                <TextInput
                  style={styles.textInput}
                  placeholder="비밀번호 확인"
                  value={formData.confirmPassword}
                  onChangeText={(value) =>
                    handleInputChange("confirmPassword", value)
                  }
                  secureTextEntry={!showConfirmPassword}
                  autoComplete="new-password"
                />
                <TouchableOpacity
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={styles.eyeButton}
                >
                  <Ionicons
                    name={
                      showConfirmPassword ? "eye-outline" : "eye-off-outline"
                    }
                    size={20}
                    color="#7f8c8d"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* 약관 동의 */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>약관 동의</Text>

              <TouchableOpacity
                style={styles.checkboxContainer}
                onPress={() => setAgreeTerms(!agreeTerms)}
              >
                <Ionicons
                  name={agreeTerms ? "checkbox" : "checkbox-outline"}
                  size={24}
                  color={agreeTerms ? "#1E90FF" : "#bdc3c7"}
                />
                <Text style={styles.checkboxText}>
                  <Text style={styles.required}>(필수)</Text> 서비스 이용약관
                  동의
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.checkboxContainer}
                onPress={() => setAgreePrivacy(!agreePrivacy)}
              >
                <Ionicons
                  name={agreePrivacy ? "checkbox" : "checkbox-outline"}
                  size={24}
                  color={agreePrivacy ? "#1E90FF" : "#bdc3c7"}
                />
                <Text style={styles.checkboxText}>
                  <Text style={styles.required}>(필수)</Text> 개인정보 처리방침
                  동의
                </Text>
              </TouchableOpacity>
            </View>

            {/* 회원가입 버튼 */}
            <TouchableOpacity
              style={[styles.signupButton, isLoading && styles.disabledButton]}
              onPress={handleSignup}
              disabled={isLoading}
              activeOpacity={0.8}
            >
              {isLoading ? (
                <Text style={styles.buttonText}>회원가입 중...</Text>
              ) : (
                <Text style={styles.buttonText}>회원가입 완료</Text>
              )}
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#ecf0f1",
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2c3e50",
  },
  placeholder: {
    width: 34,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  formContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2c3e50",
    marginBottom: 15,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 12,
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
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  checkboxText: {
    marginLeft: 10,
    fontSize: 14,
    color: "#2c3e50",
    flex: 1,
  },
  required: {
    color: "#e74c3c",
    fontWeight: "600",
  },
  signupButton: {
    backgroundColor: "#1E90FF",
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 10,
  },
  disabledButton: {
    opacity: 0.6,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
