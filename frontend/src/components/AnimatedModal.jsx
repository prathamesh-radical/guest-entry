import React, { forwardRef, useImperativeHandle } from 'react';
import { Animated } from 'react-native';
import { useModalAnimation } from '../hooks/useSlideAnimation';

export const AnimatedModal = forwardRef(({ children, style, onClose }, ref) => {
    const { slideAnim, animateOut } = useModalAnimation();

    useImperativeHandle(ref, () => ({
        close: () => {
            animateOut(() => {
                if (onClose) onClose();
            });
        }
    }));

    const handleClose = () => {
        animateOut(() => {
            if (onClose) {
                onClose();
            }
        });
    };

    return (
        <Animated.View style={[style, { transform: [{ translateY: slideAnim }] }]}>
            {React.Children.map(children, child =>
                React.isValidElement(child)
                    ? React.cloneElement(child, {
                        onClose: handleClose
                    })
                    : child
            )}
        </Animated.View>
    );
});