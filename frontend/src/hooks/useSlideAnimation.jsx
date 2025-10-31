import { useRef, useEffect } from 'react';
import { Animated, Dimensions } from 'react-native';

export const useSlideAnimation = () => {
    const { height } = Dimensions.get('window');
    const slideAnim = useRef(new Animated.Value(height)).current;

    useEffect(() => {
        Animated.timing(slideAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
        }).start();

        return () => {
            slideAnim.setValue(height);
        };
    }, []);

    return slideAnim;
};

export const useModalAnimation = () => {
    const { height } = Dimensions.get('window');
    const slideAnim = useRef(new Animated.Value(-height)).current;

    const animateIn = () => {
        Animated.timing(slideAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
        }).start();
    };

    const animateOut = (onComplete) => {
        Animated.timing(slideAnim, {
            toValue: -height,
            duration: 500,
            useNativeDriver: true,
        }).start(onComplete);
    };

    useEffect(() => {
        animateIn();
    }, []);

    return {
        slideAnim,
        animateOut
    };
};