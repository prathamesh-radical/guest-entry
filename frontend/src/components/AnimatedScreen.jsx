import React from 'react';
import { Animated, StyleSheet } from 'react-native';
import { useSlideAnimation } from '../hooks/useSlideAnimation';

export const AnimatedScreen = ({ children, style }) => {
  const slideAnim = useSlideAnimation();

  return (
    <Animated.View
      style={[
        styles.container,
        style,
        { transform: [{ translateY: slideAnim }] }
      ]}
    >
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});