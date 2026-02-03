# Electron + NestJS + TypeORM + SQLCipher Boilerplate

이 프로젝트는 **Electron-Vite**, **React**, **SQLCipher** 스택에 **NestJS**와 **TypeORM**을 통합하여 사용하는 방법을 보여주는 예제입니다.

기존에 Electron과 React, SQLCipher를 사용하여 앱을 개발하던 팀에게, **NestJS**와 **TypeORM** 도입을 통해 얻을 수 있는 구조적 이점과 생산성 향상을 제안하기 위해 작성되었습니다.

## 왜 NestJS와 TypeORM인가요?

Electron 앱의 규모가 커지면 Main Process의 코드가 복잡해지고 관리가 어려워지는 문제가 발생합니다. 이 프로젝트는 백엔드 프레임워크인 NestJS를 Electron의 Main Process에 탑재하여 이 문제를 해결합니다.

### 1. NestJS (Main Process 구조화)
기존의 IPC 핸들러들이 산재해 있던 Main Process를 체계적으로 관리할 수 있습니다.
- **모듈화 (Modularity)**: 기능을 Module 단위로 쪼개어 관리하므로 코드의 응집도가 높아집니다.
- **의존성 주입 (DI)**: 서비스 간의 의존성을 깔끔하게 관리하여 테스트와 유지보수가 쉬워집니다.
- **익숙한 패턴**: 백엔드 개발 경험이 있다면 Controller, Service 패턴을 그대로 사용하여 Electron의 비즈니스 로직을 작성할 수 있습니다. (HTTP 요청 대신 IPC 이벤트를 처리합니다.)

### 2. TypeORM (SQLCipher 추상화)
SQLCipher를 사용할 때 raw SQL 쿼리를 직접 작성하는 번거로움과 실수 가능성을 줄여줍니다.
- **Entity 기반 모델링**: 데이터베이스 스키마를 TypeScript 클래스로 정의하여 관리합니다.
- **타입 안정성**: DB 작업 시 TypeScript의 타입을 지원받아 런타임 에러를 줄일 수 있습니다.
- **생산성**: 복잡한 쿼리 없이도 객체 지향적인 방식으로 데이터를 CRUD 할 수 있습니다.

## 아키텍처 개요

*   **Renderer Process**: React (UI 담당)
*   **Main Process**: NestJS 애플리케이션 구동 (비즈니스 로직 및 DB 접근 담당)
*   **Database**: SQLCipher (로컬 암호화 DB)
*   **Communication**: IPC (Renderer에서 `invoke`를 통해 NestJS의 메서드 호출)

## 프로젝트 설정

### 설치 (Install)

```bash
$ pnpm install
```

### 개발 모드 실행 (Development)

```bash
$ pnpm dev
```

### 빌드 (Build)

```bash
# For windows
$ pnpm build:win

# For macOS
$ pnpm build:mac

# For Linux
$ pnpm build:linux
```
