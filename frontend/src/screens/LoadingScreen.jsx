import React, { useCallback, useContext } from 'react';
import { Image, View, Text } from 'react-native';
import LoaderKit from 'react-native-loader-kit';
import { styles } from '../styles/LoadingScreen';
import LinearGradient from 'react-native-linear-gradient';
import { useFocusEffect } from '@react-navigation/native';
import { MyContext } from '../context/ContextProvider';
import { AnimatedScreen } from '../components/AnimatedScreen';

export default function LoadingScreen() {
    const { setGradientColor } = useContext(MyContext);

    useFocusEffect(
        useCallback(() => {
            setGradientColor(['#0F1729', '#192336']);
            return;
        }, [])
    );

    return (
        <LinearGradient
            colors={['#0F1729', '#0f2b5aff', '#192336']}
            style={styles.loadingContainer}
        >
            <AnimatedScreen style={styles.loadingContainer}>
                <View style={styles.iconCircle}>
                    <LinearGradient
                        colors={['#00D48E', '#00CA5B']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.imgContainer}
                    >
                        <Image
                            style={[styles.img, { width: 12, height: 12 }]}
                            source={require('../../assets/icons/trend.png')}
                            tintColor="#fff"
                        />
                    </LinearGradient>
                    <Image
                        style={[styles.img, { width: 70, height: 70 }]}
                        source={require('../../assets/icons/security.png')}
                    />
                </View>
                <Text style={styles.text1}>Security Hub</Text>
                <Text style={styles.text2}>Real-time visitor monitoring & control</Text>
                <Text style={styles.text3}>Version 1.0.0</Text>
                <LoaderKit style={styles.loader} name="BallPulseSync" color="#00bcd4" />
            </AnimatedScreen>
        </LinearGradient>
    );
}