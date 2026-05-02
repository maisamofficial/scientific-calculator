# 🧪 SCIENCYCALC v1.0.0

**SCIENCYCALC** is a high-performance, ultra-responsive scientific calculator built with React Native and Expo. It features a modern glassmorphic UI, support for over 22+ scientific functions, and a dual-mode layout that scales perfectly from mobile phones to high-end tablets.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Platform](https://img.shields.io/badge/platform-Android%20%7C%20iOS-orange)
![Version](https://img.shields.io/badge/version-1.0.0-green)

---

## ✨ Features

- **Dual-Mode UI:** Seamlessly switch between Standard and Scientific modes.
- **100% Responsive:** Dynamic grid system scales for iPhone SE, Android tablets, and iPad Pro.
- **Glassmorphic Design:** Premium aesthetics with light/dark mode support.
- **22+ Functions:** 
  - `sin`, `cos`, `tan` (and inverses)
  - `log`, `ln`, `e`, `π`
  - `√`, `³√`, `x²`, `x³`, `xʸ`
  - `!`, `abs`, `mod`, `%`
- **Error Handling:** Graceful handling of division by zero and domain errors.

---

## 🚀 Installation & Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (LTS version)
- [Expo Go](https://expo.dev/client) app on your mobile device.

### 1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/scientific-calculator.git
cd scientific-calculator
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the application
Depending on your OS:

#### **Linux / Windows / macOS**
```bash
# Start the development server
npx expo start
```
*Note: If you are behind a firewall or restricted network, use:*
```bash
EXPO_OFFLINE=1 npx expo start
```

---

## 🛠️ Usage

1. **Standard Mode:** Use the large numeric keypad for everyday calculations.
2. **Scientific Mode:** 
   - **Phone:** Click the "Scientific" slide handle at the bottom.
   - **Tablet/Landscape:** Scientific buttons appear automatically side-by-side.
3. **Settings:** Click the gear icon `⚙️` to toggle between **Dark** and **Light** modes.
4. **Info:** Click the info icon `(i)` to view version details and pro-tips.

---

## 📦 Creating an APK (Android)

To generate a standalone APK for Android:
1. Install EAS CLI: `npm i -g eas-cli`
2. Run: `eas build -p android --profile preview`

---

## 📄 License
This project is licensed under the MIT License.
