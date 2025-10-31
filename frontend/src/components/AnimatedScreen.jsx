import React from 'react';
import { Animated } from 'react-native';
import { useSlideAnimation } from '../hooks/useSlideAnimation';

export const AnimatedScreen = ({ children, style }) => {
    const slideAnim = useSlideAnimation();

    return (
        <Animated.View style={[style, { transform: [{ translateY: slideAnim }] }]}>
            {children}
        </Animated.View>
    );
};