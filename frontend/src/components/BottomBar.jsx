import { useNavigation, useNavigationState } from '@react-navigation/native';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Appbar, Icon, useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Styles } from '../styles/BottomBar';
import LinearGradient from 'react-native-linear-gradient';
import { BottomTabs } from '../utils/constants';

export default function BottomBar({ title }) {
    const navigation = useNavigation();
    const { bottom } = useSafeAreaInsets();
    const activeRoute = useNavigationState((state) =>
        state?.routes?.[state.index]?.name || ''
    );
    const theme = useTheme();
    const styles = Styles(theme);
    const displayStyle = (title === "Signup" || title === "Login") ? "none" : "block";
    const BOTTOM_APPBAR_HEIGHT = 70;

    return (
        <Appbar style={[styles.b_bottom, { height: BOTTOM_APPBAR_HEIGHT + bottom, display: displayStyle }]} elevated={10}>
            <View style={styles.bottom_container}>
                {BottomTabs?.map((item, index) => (
                    <Pressable key={index} style={styles.bottom_tab} onPress={() => navigation.navigate(item?.name)}>
                        {activeRoute === item?.name ? (
                            <>
                                <LinearGradient
                                    colors={item?.colors}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                    style={styles.bottom_activetab}
                                >
                                    <View style={[styles.iconContainer, { backgroundColor: item?.iconBgColor }]}>
                                        <Icon source={item?.icon} size={20} color="#fff" />
                                    </View>
                                    <Text style={styles.active_text}>{item?.label}</Text>
                                </LinearGradient>
                                <Icon source="circle" size={7} color={item?.iconColor} />
                            </>
                        ) : (
                            <>
                                <Icon source={item?.icon} size={20} color="#4a6682" />
                                <Text style={styles.inactiveText}>{item?.label}</Text>
                            </>
                        )}
                    </Pressable>
                ))}
            </View>
        </Appbar>
    );
}
