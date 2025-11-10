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