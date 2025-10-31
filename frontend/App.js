import React, { useEffect } from 'react';
import { Appearance } from 'react-native';
import { MyContextProvider } from './src/context/ContextProvider';
import AppContent from './src/AppContent';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './src/navigation/NavigationService';

export default function App() {
  useEffect(() => {
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