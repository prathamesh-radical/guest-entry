import React, {useEffect} from 'react';
import {Appearance} from 'react-native';
import {MyContextProvider} from './src/context/ContextProvider';
import AppContent from './src/AppContent';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from './src/navigation/NavigationService';
import SplashScreen from 'react-native-lottie-splash-screen';

export default function App() {
  useEffect(() => {
    if (SplashScreen && typeof SplashScreen.hide === 'function') {
      try {
        SplashScreen.hide();
      } catch (e) {
        console.warn('SplashScreen.hide() failed:', e);
      }
    } else {
      console.warn(
        'SplashScreen native module is null. Did you rebuild the app after installing the package?',
      );
    }

    Appearance.setColorScheme('light');
  }, []);

  return (
    <NavigationContainer independent={true} ref={navigationRef}>
      <MyContextProvider>
        <AppContent />
      </MyContextProvider>
    </NavigationContainer>
  );
}
