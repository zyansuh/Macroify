# 🚗 Macrofy - 안전한 대리운전 서비스

![React Native](https://img.shields.io/badge/React%20Native-0.79.6-blue.svg)
![Expo](https://img.shields.io/badge/Expo-~53.0.22-black.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-~5.8.3-blue.svg)
![Android](https://img.shields.io/badge/Platform-Android-green.svg)

> 현대적인 UI/UX와 실시간 위치 추적 기능을 갖춘 안드로이드 대리운전 모바일 애플리케이션

## ✨ 주요 기능

### 📱 **듀얼 모드 지원**
- **운전자 모드**: 수익 관리, 요청 수락, 운행 추적
- **고객 모드**: 대리운전 요청, 요금 계산, 이용 내역

### 🗺️ **실시간 위치 서비스**
- GPS 기반 정확한 위치 추적
- 백그라운드 위치 추적 지원
- 거리 계산 및 경로 최적화
- 지오코딩/역지오코딩 기능

### 🔔 **스마트 알림 시스템**
- 푸시 알림 및 오버레이 알림
- 운행 상태 실시간 업데이트
- 다른 앱 위에 중요 정보 표시

### 🛡️ **안드로이드 특화 기능**
- 시스템 오버레이 권한 (`SYSTEM_ALERT_WINDOW`)
- 백그라운드 위치 추적 (`ACCESS_BACKGROUND_LOCATION`)
- 포그라운드 서비스 (`FOREGROUND_SERVICE`)
- 화면 상시 켜짐 (`WAKE_LOCK`)

## 🛠️ 기술 스택

| 카테고리 | 기술 |
|---------|------|
| **Framework** | React Native + Expo |
| **Language** | TypeScript |
| **State Management** | Context API + useReducer |
| **Navigation** | React Navigation v6 |
| **Location Services** | Expo Location |
| **Notifications** | Expo Notifications |
| **UI Components** | Custom Components + Ionicons |

## 📦 설치 및 실행

### 1. 저장소 클론
```bash
git clone https://github.com/zyansuh/Macroify.git
cd Macroify
```

### 2. 의존성 설치
```bash
npm install
```

### 3. 개발 서버 실행
```bash
# 안드로이드에서 실행
npm run android

# Expo Go를 통해 실행
npm start
```

### 4. 실제 빌드 (선택사항)
```bash
# Android APK 빌드
npx expo build:android
```

## 📋 필요 권한 (Android)

```json
{
  "permissions": [
    "INTERNET",
    "ACCESS_NETWORK_STATE",
    "ACCESS_FINE_LOCATION",
    "ACCESS_COARSE_LOCATION", 
    "ACCESS_BACKGROUND_LOCATION",
    "SYSTEM_ALERT_WINDOW",
    "WAKE_LOCK",
    "FOREGROUND_SERVICE",
    "VIBRATE"
  ]
}
```

## 🏗️ 프로젝트 구조

```
Macrofy/
├── src/
│   ├── components/        # 재사용 가능한 컴포넌트
│   ├── screens/          # 화면별 컴포넌트
│   │   ├── ModeSelectionScreen.tsx
│   │   ├── DriverHomeScreen.tsx
│   │   ├── CustomerHomeScreen.tsx
│   │   ├── MapScreen.tsx
│   │   ├── ProfileScreen.tsx
│   │   └── RideHistoryScreen.tsx
│   ├── navigation/       # 네비게이션 설정
│   ├── services/         # 비즈니스 로직
│   │   └── LocationService.ts
│   ├── utils/           # 유틸리티 함수
│   │   └── OverlayService.ts
│   ├── contexts/        # 상태 관리
│   │   └── AppContext.tsx
│   └── types/          # TypeScript 타입 정의
├── assets/             # 이미지 및 아이콘
├── app.json           # Expo 설정
└── package.json       # 의존성 관리
```

## 🚀 주요 화면 플로우

1. **모드 선택** → 운전자 또는 고객 선택
2. **운전자 모드**: 온라인 토글 → 요청 대기 → 운행 → 완료
3. **고객 모드**: 출발지/목적지 입력 → 요청 → 운전자 매칭 → 운행

## 📱 지원 플랫폼

- ✅ **Android 8.0+** (API Level 26+)
- ❌ iOS (현재 안드로이드 특화 기능으로 개발됨)

## 🔧 개발 환경 요구사항

- Node.js 18+
- npm 또는 yarn
- Expo CLI
- Android Studio (Android 빌드용)
- Android 실기기 또는 에뮬레이터

## 📝 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 문의

프로젝트에 대한 질문이나 제안사항이 있으시면 Issue를 생성해주세요.

---

**⭐ 이 프로젝트가 도움이 되었다면 Star를 눌러주세요!**
