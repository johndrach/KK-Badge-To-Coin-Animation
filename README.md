# KK Badge To Coin Animation

A React Native project showcasing complex animations featuring a badge-to-coin transformation with multi-phase animation sequences.

## 🚀 Project Overview

This project demonstrates advanced React Native animation capabilities, featuring:
- **Multi-phase animation sequence**: Badge spin/fade → coin movement → cross-fade transitions
- **Drawer slide-up animation** with lightbox overlay
- **SVG integration** with custom animated components
- **Complex timing sequences** with synchronized animations

## 🛠 Tech Stack & Dependencies

### Core Framework
- **[React Native 0.81.4](https://reactnative.dev)** - Cross-platform mobile development framework
- **[TypeScript 5.8.3](https://www.typescriptlang.org/)** - Type-safe JavaScript development
- **[React 19.1.0](https://reactjs.org/)** - UI library

### Animation Libraries
- **[React Native Reanimated 4.1.0](https://docs.swmansion.com/react-native-reanimated/)** - High-performance animations and gestures
  - Used for: Complex timing animations, shared values, animated styles
  - Features: `useSharedValue`, `useAnimatedStyle`, `withTiming`, custom easing
- **[React Native Worklets 0.5.1](https://github.com/margelo/react-native-worklets)** - JavaScript worklets for smooth animations
  - Required by React Native Reanimated for optimal performance

### UI & Styling
- **[Styled Components 6.1.19](https://styled-components.com/)** - CSS-in-JS styling library
  - Used for: Component-based styling with TypeScript support
- **[React Native Safe Area Context 5.5.2](https://github.com/th3rdwave/react-native-safe-area-context)** - Safe area handling
  - Used for: Proper layout handling across different device screens

### SVG Support
- **[React Native SVG 15.13.0](https://github.com/software-mansion/react-native-svg)** - SVG rendering support
  - Used for: Rendering silverToken.svg and 2DayStreak.svg components
- **[React Native SVG Transformer 1.5.1](https://github.com/kristerkari/react-native-svg-transformer)** - SVG import transformer
  - Used for: Direct SVG imports as React components with TypeScript support

## 🎯 Key Animation Features

### Animation Sequence
1. **Initial State**: Drawer slides up from bottom with lightbox fade-in (700ms)
2. **Badge Animation**: 2DayStreak spins 260° and fades out (700ms)
3. **Delay**: 1.5 second pause
4. **Coin Animation**: SilverToken moves to top-right corner and scales down (700ms)
5. **Final Transition**: Coin fades out, badge fades back in (300ms each)

### Technical Implementation
- **Shared Values**: Independent animation state management
- **Timing Functions**: Custom easing with `Easing.inOut(Easing.quad)`
- **Animated Components**: SVG components wrapped with `Animated.createAnimatedComponent`
- **Layering**: Proper z-index and absolute positioning for complex layouts

## 🚀 Getting Started

### Prerequisites
- Node.js >= 20
- React Native development environment set up ([guide](https://reactnative.dev/docs/set-up-your-environment))
- For iOS: Xcode and CocoaPods
- For Android: Android Studio and Android SDK

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/johndrach/KK-Badge-To-Coin-Animation.git
   cd KK-Badge-To-Coin-Animation
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **iOS Setup** (iOS only)
   ```bash
   # Install Ruby dependencies
   bundle install

   # Install CocoaPods dependencies
   bundle exec pod install
   ```

### Running the App

#### Start Metro
```bash
npm start
```

#### iOS
```bash
npm run ios
```

#### Android
```bash
npm run android
```

## 📱 App Structure

### Main Components
- **App.tsx** - Main application component with animation logic
- **AppContent** - Core animation implementation
- **AnimatedSilverToken** - Animated SVG coin component
- **AnimatedTwoDayStreak** - Animated SVG badge component

### Key Animation Functions
- **`startAnimation()`** - Triggers the complete animation sequence
- **`resetAnimation()`** - Resets all animations to initial state
- **`initializeDrawer()`** - Initial drawer and lightbox animation

### Assets
- `assets/images/silverToken.svg` - Coin SVG graphic
- `assets/images/2DayStreak.svg` - Badge SVG graphic
- `assets/images/drawer.png` - Background drawer image
- `assets/images/background.jpg` - App background image

## 🔧 Configuration Files

### Babel Configuration (`babel.config.js`)
```javascript
module.exports = {
  presets: ['@react-native/babel-preset'],
  plugins: ['react-native-worklets/plugin'], // Required for Reanimated
};
```

### Metro Configuration (`metro.config.js`)
```javascript
// Configured for SVG transformer support
const {transformer, resolver} = require('react-native-svg-transformer');
```

### TypeScript Configuration
- **`react-native-svg.d.ts`** - SVG import declarations
- **`tsconfig.json`** - TypeScript compiler configuration

## 🎮 User Interactions

- **Invisible Collect Button**: Tap the bottom area of the drawer to trigger animation
- **Reset Button**: Red button in top-left corner to reset animation state

## 🏗 Development

### Available Scripts
- `npm start` - Start Metro bundler
- `npm run ios` - Run iOS app
- `npm run android` - Run Android app
- `npm run lint` - Run ESLint
- `npm test` - Run Jest tests

### Code Style
- **ESLint** configuration with React Native rules
- **Prettier** for code formatting
- **TypeScript** for type safety

## 📚 Learning Resources

- [React Native Reanimated Documentation](https://docs.swmansion.com/react-native-reanimated/)
- [React Native SVG Documentation](https://github.com/software-mansion/react-native-svg)
- [Styled Components Documentation](https://styled-components.com/docs)
- [React Native Animation Guide](https://reactnative.dev/docs/animations)

## 🤝 Contributing

This project demonstrates advanced React Native animation patterns and serves as a reference for:
- Complex multi-phase animations
- SVG integration in React Native
- Performance-optimized animations with Reanimated
- TypeScript integration with React Native

## 📄 License

This project was created for demonstration purposes and learning.

---

Built with ❤️ using React Native and advanced animation libraries.