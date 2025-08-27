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

export default function DriverSignupScreen({ navigation }: Props) {
  const [formData, setFormData] = useState({
    // 기본 정보
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    // 면허 정보
    licenseNumber: "",
    licenseExpiry: "",
    // 차량 정보
    carModel: "",
    licensePlate: "",
    carColor: "",
    carYear: "",
    // 계좌 정보
    bankName: "",
    accountNumber: "",
    accountHolder: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [agreeDriverTerms, setAgreeDriverTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { signup } = useAuth();

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    // 기본 정보 검증
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

    if (formData.password.length < 6) {
      Alert.alert("입력 확인", "비밀번호는 6자 이상이어야 합니다.");
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      Alert.alert("입력 확인", "비밀번호가 일치하지 않습니다.");
      return false;
    }

    // 면허 정보 검증
    if (!formData.licenseNumber.trim()) {
      Alert.alert("입력 확인", "운전면허 번호를 입력해주세요.");
      return false;
    }

    if (!formData.licenseExpiry.trim()) {
      Alert.alert("입력 확인", "면허 만료일을 입력해주세요.");
      return false;
    }

    // 차량 정보 검증
    if (!formData.carModel.trim()) {
      Alert.alert("입력 확인", "차량 모델을 입력해주세요.");
      return false;
    }

    if (!formData.licensePlate.trim()) {
      Alert.alert("입력 확인", "차량 번호를 입력해주세요.");
      return false;
    }

    if (!formData.carColor.trim()) {
      Alert.alert("입력 확인", "차량 색상을 입력해주세요.");
      return false;
    }

    if (!formData.carYear.trim()) {
      Alert.alert("입력 확인", "차량 연식을 입력해주세요.");
      return false;
    }

    // 계좌 정보 검증
    if (!formData.bankName.trim()) {
      Alert.alert("입력 확인", "은행명을 입력해주세요.");
      return false;
    }

    if (!formData.accountNumber.trim()) {
      Alert.alert("입력 확인", "계좌번호를 입력해주세요.");
      return false;
    }

    if (!formData.accountHolder.trim()) {
      Alert.alert("입력 확인", "예금주명을 입력해주세요.");
      return false;
    }

    // 약관 동의 검증
    if (!agreeTerms || !agreePrivacy || !agreeDriverTerms) {
      Alert.alert("약관 동의", "모든 필수 약관에 동의해주세요.");
      return false;
    }

    return true;
  };

  const handleSignup = async () => {
    if (!validateForm()) return;

    Alert.alert(
      "기사 등록 안내",
      "기사 등록 후 관리자 승인이 필요합니다. 승인까지 1-2일 소요될 수 있습니다.",
      [
        { text: "취소", style: "cancel" },
        { text: "계속", onPress: proceedSignup },
      ]
    );
  };

  const proceedSignup = async () => {
    setIsLoading(true);
    try {
      const signupData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.replace(/[^0-9]/g, ""),
        password: formData.password,
        userType: "driver" as const,
        // 기사 전용 정보
        licenseNumber: formData.licenseNumber.trim(),
        licenseExpiry: new Date(formData.licenseExpiry),
        carModel: formData.carModel.trim(),
        licensePlate: formData.licensePlate.trim(),
        carColor: formData.carColor.trim(),
        carYear: parseInt(formData.carYear),
        bankName: formData.bankName.trim(),
        accountNumber: formData.accountNumber.trim(),
        accountHolder: formData.accountHolder.trim(),
      };

      const success = await signup(signupData);

      if (success) {
        Alert.alert(
          "기사 등록 완료",
          "기사 등록이 완료되었습니다. 관리자 승인 후 서비스를 이용하실 수 있습니다.",
          [{ text: "확인" }]
        );
      } else {
        Alert.alert("등록 실패", "기사 등록 중 문제가 발생했습니다.");
      }
    } catch (error) {
      Alert.alert("오류", "기사 등록 중 문제가 발생했습니다.");
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
        <Text style={styles.headerTitle}>기사 회원가입</Text>
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
            {/* 안내 메시지 */}
            <View style={styles.noticeContainer}>
              <Ionicons name="information-circle" size={20} color="#f39c12" />
              <Text style={styles.noticeText}>
                기사 등록 시 관리자 승인이 필요하며, 승인까지 1-2일 소요됩니다.
              </Text>
            </View>

            {/* 기본 정보 */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>기본 정보</Text>

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

            {/* 보안 설정 */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>보안 설정</Text>

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

            {/* 면허 정보 */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>운전면허 정보</Text>

              <View style={styles.inputContainer}>
                <Ionicons name="card-outline" size={20} color="#7f8c8d" />
                <TextInput
                  style={styles.textInput}
                  placeholder="운전면허 번호"
                  value={formData.licenseNumber}
                  onChangeText={(value) =>
                    handleInputChange("licenseNumber", value)
                  }
                />
              </View>

              <View style={styles.inputContainer}>
                <Ionicons name="calendar-outline" size={20} color="#7f8c8d" />
                <TextInput
                  style={styles.textInput}
                  placeholder="면허 만료일 (YYYY-MM-DD)"
                  value={formData.licenseExpiry}
                  onChangeText={(value) =>
                    handleInputChange("licenseExpiry", value)
                  }
                />
              </View>
            </View>

            {/* 차량 정보 */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>차량 정보</Text>

              <View style={styles.inputContainer}>
                <Ionicons name="car-outline" size={20} color="#7f8c8d" />
                <TextInput
                  style={styles.textInput}
                  placeholder="차량 모델 (예: 현대 아반떼)"
                  value={formData.carModel}
                  onChangeText={(value) => handleInputChange("carModel", value)}
                />
              </View>

              <View style={styles.inputContainer}>
                <Ionicons name="keypad-outline" size={20} color="#7f8c8d" />
                <TextInput
                  style={styles.textInput}
                  placeholder="차량 번호 (예: 12가3456)"
                  value={formData.licensePlate}
                  onChangeText={(value) =>
                    handleInputChange("licensePlate", value)
                  }
                />
              </View>

              <View style={styles.row}>
                <View style={[styles.inputContainer, styles.halfWidth]}>
                  <Ionicons
                    name="color-palette-outline"
                    size={20}
                    color="#7f8c8d"
                  />
                  <TextInput
                    style={styles.textInput}
                    placeholder="색상"
                    value={formData.carColor}
                    onChangeText={(value) =>
                      handleInputChange("carColor", value)
                    }
                  />
                </View>

                <View style={[styles.inputContainer, styles.halfWidth]}>
                  <Ionicons
                    name="calendar-number-outline"
                    size={20}
                    color="#7f8c8d"
                  />
                  <TextInput
                    style={styles.textInput}
                    placeholder="연식"
                    value={formData.carYear}
                    onChangeText={(value) =>
                      handleInputChange("carYear", value)
                    }
                    keyboardType="numeric"
                  />
                </View>
              </View>
            </View>

            {/* 정산 계좌 */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>정산 계좌 정보</Text>

              <View style={styles.inputContainer}>
                <Ionicons name="business-outline" size={20} color="#7f8c8d" />
                <TextInput
                  style={styles.textInput}
                  placeholder="은행명 (예: 국민은행)"
                  value={formData.bankName}
                  onChangeText={(value) => handleInputChange("bankName", value)}
                />
              </View>

              <View style={styles.inputContainer}>
                <Ionicons name="card-outline" size={20} color="#7f8c8d" />
                <TextInput
                  style={styles.textInput}
                  placeholder="계좌번호"
                  value={formData.accountNumber}
                  onChangeText={(value) =>
                    handleInputChange("accountNumber", value)
                  }
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.inputContainer}>
                <Ionicons name="person-outline" size={20} color="#7f8c8d" />
                <TextInput
                  style={styles.textInput}
                  placeholder="예금주명"
                  value={formData.accountHolder}
                  onChangeText={(value) =>
                    handleInputChange("accountHolder", value)
                  }
                />
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
                  color={agreeTerms ? "#2E8B57" : "#bdc3c7"}
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
                  color={agreePrivacy ? "#2E8B57" : "#bdc3c7"}
                />
                <Text style={styles.checkboxText}>
                  <Text style={styles.required}>(필수)</Text> 개인정보 처리방침
                  동의
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.checkboxContainer}
                onPress={() => setAgreeDriverTerms(!agreeDriverTerms)}
              >
                <Ionicons
                  name={agreeDriverTerms ? "checkbox" : "checkbox-outline"}
                  size={24}
                  color={agreeDriverTerms ? "#2E8B57" : "#bdc3c7"}
                />
                <Text style={styles.checkboxText}>
                  <Text style={styles.required}>(필수)</Text> 대리운전 기사 약관
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
                <Text style={styles.buttonText}>등록 중...</Text>
              ) : (
                <Text style={styles.buttonText}>기사 등록 신청</Text>
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
  noticeContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff9e6",
    padding: 15,
    borderRadius: 12,
    marginBottom: 25,
    borderLeftWidth: 4,
    borderLeftColor: "#f39c12",
  },
  noticeText: {
    marginLeft: 10,
    fontSize: 14,
    color: "#d68910",
    flex: 1,
    lineHeight: 20,
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
  row: {
    flexDirection: "row",
    gap: 10,
  },
  halfWidth: {
    flex: 1,
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
    backgroundColor: "#2E8B57",
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
