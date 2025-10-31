import React, { useEffect, useState } from 'react';
import { Keyboard, StyleSheet, View } from 'react-native';
import AppBar from './Appbar.jsx';
import BottomBar from './BottomBar.jsx';

export default function Wrapper({ title, backAction, children }) {
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
        const showListener = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
        const hideListener = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));

        return () => {
            showListener.remove();
            hideListener.remove();
        };
    }, []);

    return (
        <View style={styles.wrap_container}>
            <AppBar title={title} backAction={backAction} />
            {children}
            {!isKeyboardVisible && (
                <BottomBar title={title} />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    wrap_container: {
        flex: 1,
        justifyContent: 'space-between',
        height: '100%',
        backgroundColor: '#fff',
    },
});
