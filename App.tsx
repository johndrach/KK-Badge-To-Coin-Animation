/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StatusBar, useColorScheme, ImageBackground, View, StyleSheet, Image, Dimensions, TouchableOpacity, Text } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { useEffect } from 'react';
import SilverTokenSvg from './assets/images/silverToken.svg';
import TwoDayStreakSvg from './assets/images/2DayStreak.svg';

const AnimatedSilverToken = Animated.createAnimatedComponent(SilverTokenSvg);
const AnimatedTwoDayStreak = Animated.createAnimatedComponent(TwoDayStreakSvg);

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  const safeAreaInsets = useSafeAreaInsets();
  const screenData = Dimensions.get('screen');


  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);
  const drawerTranslateY = useSharedValue(screenData.height);
  const lightBoxOpacity = useSharedValue(0);
  const twoDayStreakRotation = useSharedValue(0);
  const twoDayStreakOpacity = useSharedValue(1);
  const silverTokenOpacity = useSharedValue(1);

  const startAnimation = () => {
    // Reset values
    translateX.value = 0;
    translateY.value = 0;
    scale.value = 1;
    twoDayStreakRotation.value = 0;
    twoDayStreakOpacity.value = 1;
    silverTokenOpacity.value = 1;

    // 2DayStreak animation: spin 260 degrees and fade out over 700ms
    twoDayStreakRotation.value = withTiming(260, {
      duration: 700,
      easing: Easing.inOut(Easing.quad),
    });

    twoDayStreakOpacity.value = withTiming(0, {
      duration: 700,
      easing: Easing.inOut(Easing.quad),
    });

    // Coin animation starts after 2.2 seconds (700ms + 1500ms delay)
    setTimeout(() => {
      const targetX = screenData.width * 0.35 + 23;
      const targetY = -screenData.height * 0.35 - 35;

      translateX.value = withTiming(targetX, {
        duration: 700,
        easing: Easing.inOut(Easing.quad),
      });

      translateY.value = withTiming(targetY, {
        duration: 700,
        easing: Easing.inOut(Easing.quad),
      });

      scale.value = withTiming(0.16, {
        duration: 700,
        easing: Easing.inOut(Easing.quad),
      });

      // After coin animation completes + 1 second delay, fade out coin and fade in 2DayStreak
      setTimeout(() => {
        // Fade out silver coin
        silverTokenOpacity.value = withTiming(0, {
          duration: 300,
          easing: Easing.inOut(Easing.quad),
        });

        // Reset 2DayStreak position and fade it back in
        twoDayStreakRotation.value = 0;
        twoDayStreakOpacity.value = withTiming(1, {
          duration: 300,
          easing: Easing.inOut(Easing.quad),
        });
      }, 1000);
    }, 2200);
  };

  const resetAnimation = () => {
    // Reset all values to initial state
    translateX.value = 0;
    translateY.value = 0;
    scale.value = 1;
    twoDayStreakRotation.value = 0;
    twoDayStreakOpacity.value = 1;
    silverTokenOpacity.value = 1;
  };

  const initializeDrawer = () => {
    drawerTranslateY.value = screenData.height;
    lightBoxOpacity.value = 0;

    // Lightbox fades in and drawer slides up simultaneously
    lightBoxOpacity.value = withTiming(0.5, {
      duration: 700,
      easing: Easing.inOut(Easing.quad),
    });

    drawerTranslateY.value = withTiming(10, {
      duration: 700,
      easing: Easing.inOut(Easing.quad),
    });
  };

  useEffect(() => {
    initializeDrawer();
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: silverTokenOpacity.value,
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { scale: scale.value },
      ],
    };
  });

  const drawerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: drawerTranslateY.value }],
    };
  });

  const lightBoxAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: lightBoxOpacity.value,
    };
  });

  const twoDayStreakAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: twoDayStreakOpacity.value,
      transform: [{ rotate: `${twoDayStreakRotation.value}deg` }],
    };
  });

  return (
    <ImageBackground
      source={require('./assets/images/background.jpg')}
      style={styles.container}
      resizeMode="cover"
      imageStyle={{ transform: [{ translateY: 70 }] }}
    >
      <View style={styles.content}>
      </View>
      <Animated.View style={[styles.lightBox, { width: screenData.width, height: screenData.height }, lightBoxAnimatedStyle]} />
      <TouchableOpacity style={styles.resetButton} onPress={resetAnimation}>
        <Text style={styles.resetButtonText}>Reset</Text>
      </TouchableOpacity>
      <Animated.View style={[styles.drawerContainer, { width: screenData.width, height: screenData.height }, drawerAnimatedStyle]}>
        <Image
          source={require('./assets/images/drawer.png')}
          style={styles.drawerImage}
          resizeMode="cover"
        />
        <View style={styles.svgContainer}>
          <AnimatedSilverToken
            width="250"
            height="250"
            style={animatedStyle}
          />
          <View style={styles.twoDayStreakContainer}>
            <AnimatedTwoDayStreak
              width="305"
              height="305"
              style={twoDayStreakAnimatedStyle}
            />
          </View>
        </View>
        <TouchableOpacity style={styles.restartButton} onPress={startAnimation}>
        </TouchableOpacity>
      </Animated.View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  drawerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  drawerImage: {
    width: '100%',
    height: '100%',
  },
  svgContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  silverToken: {
    width: 250,
    height: 250,
    backgroundColor: '#C0C0C0',
    borderRadius: 125,
    borderWidth: 2,
    borderColor: '#A0A0A0',
  },
  restartButton: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    marginHorizontal: 40,
    backgroundColor: 'transparent',
    height: 100,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  lightBox: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: '#000000',
  },
  twoDayStreakContainer: {
    position: 'absolute',
    top: -10,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resetButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    backgroundColor: '#FF4444',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignItems: 'center',
    zIndex: 1000,
    elevation: 1000,
  },
  resetButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default App;
