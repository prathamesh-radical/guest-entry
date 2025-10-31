import React, { useCallback, useContext, useState } from 'react';
import { Dimensions, Text, TouchableOpacity, useWindowDimensions } from 'react-native';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import useFunctions from '../hooks/useFunctions';
import { Styles } from '../styles/Tab';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import { Icon } from 'react-native-paper';
import Apartment from '../layout/residence/Apartment';
import Flat from '../layout/residence/Flat';
import { MyContext } from '../context/ContextProvider';

export default function Residence() {
    const { orientation } = useContext(MyContext);
    const layout = useWindowDimensions();
    const { Wrapper } = useFunctions();
    const route = useRoute();
    const { height, width } = Dimensions.get('window');
    const isPortrait = orientation === 'portrait';
    const styles = Styles({ width, height, isPortrait });
    const initialTab = route?.params?.initialTab;

    const getInitialIndex = () => {
        switch (initialTab) {
            case "Apartment":
                return 0;
            case "Flat":
                return 1;
            default:
                return 0;
        }
    };

    const [index, setIndex] = useState(getInitialIndex());

    useFocusEffect(
        useCallback(() => {
            Wrapper(route);
            return;
        }, [])
    );

    const renderScene = SceneMap({
        first: Apartment,
        second: Flat,
    });

    const routes = [
        { key: "first", title: "Apartment", icon: "office-building" },
        { key: "second", title: "Flat", icon: "home-modern" },
    ];

    return (
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
            animationEnabled={true}
            renderTabBar={(props) => (
                <TabBar
                    {...props}
                    style={{ backgroundColor: "#fff" }}
                    activeColor="#fff"
                    inactiveColor="#666"
                    indicatorStyle={{ backgroundColor: "#fff" }}
                    indicatorContainerStyle={{ backgroundColor: "#6600ff" }}
                    android_ripple={{ color: "transparent" }}
                    contentContainerStyle={styles.contentContainerStyle}
                    renderTabBarItem={(tabProps) => {
                        const { route } = tabProps;
                        const routeIndex = routes.findIndex((r) => r.key === route.key);

                        return (
                            <TouchableOpacity style={styles.tabContainer} onPress={() => setIndex(routeIndex)}>
                                <Icon source={route.icon} size={24} color={routeIndex === index ? "#fff" : "#e0ccff"} />
                                <Text style={[styles.tabText, {
                                    color: routeIndex === index ? "#fff" : "#e0ccff",
                                    fontWeight: routeIndex === index ? "bold" : "normal",
                                }]}>
                                    {route.title}
                                </Text>
                            </TouchableOpacity>
                        );
                    }}
                />
            )}
        />
    );
}