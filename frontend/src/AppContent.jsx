import React, { useContext } from 'react';
import { StatusBar } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Wrapper from './components/Wrapper';
import Navigation from './navigation/navigation';
import { MyContext } from './context/ContextProvider';
import Toast from 'react-native-toast-message';
import LoadingScreen from './screens/LoadingScreen';

export default function AppContent() {
    const { isTokenChecked, wrapperProps, toastConfig } = useContext(MyContext);
    
    if (!isTokenChecked) {
        return <LoadingScreen />;
    }

    return (
        <SafeAreaProvider>
            <PaperProvider>
                <Wrapper {...wrapperProps}>
                    <Navigation />
                </Wrapper>
                <StatusBar
                    animated={true}
                    backgroundColor="transparent"
                    barStyle="light-content"
                    translucent={true}
                />
                <Toast position="bottom" bottomOffset={20} config={toastConfig} />
            </PaperProvider>
        </SafeAreaProvider>
    );
}