import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useContext } from 'react';
import { Dimensions, Image, RefreshControl, ScrollView, View } from 'react-native';
import useFunctions from '../hooks/useFunctions';
import { Styles } from '../styles/Dashboard';
import { Button, Divider, Text } from 'react-native-paper';
import { MyContext } from '../context/ContextProvider';
import CustomCard, { VisitorsCard } from '../components/Card';
import LinearGradient from 'react-native-linear-gradient';
import { analyticsData } from '../utils/constants';
import { AnimatedScreen } from '../components/AnimatedScreen';

export default function Dashboard() {
    const { apartmentData, flatData, visitorData, refreshing, onRefresh, orientation, setSection, setGradientColor } = useContext(MyContext);
    const { Wrapper } = useFunctions();
    const route = useRoute();
    const navigation = useNavigation();
    const { height, width } = Dimensions.get('window');
    const isPortrait = orientation === 'portrait';
    const styles = Styles({ width, height, isPortrait });

    useFocusEffect(
        useCallback(() => {
            Wrapper(route);
            setGradientColor(['#3895E6', '#1A76D2', '#3895E6']);
        }, [])
    );

    const floorData = flatData?.map((flat) => flat.floor_no);
    const uniqueFloorData = [...new Set(floorData)];

    const flats = flatData?.map((flat) => flat.flat_no);
    const uniqueFlatData = [...new Set(flats)];
    const TotalActive = visitorData?.map(item => item.is_active).filter(Boolean).length;

    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfYesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
    const startOfWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay());
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfYear = new Date(now.getFullYear(), 0, 1);

    const visitorStats = {
        yesterday: 0,
        today: 0,
        thisWeek: 0,
        thisMonth: 0,
        thisYear: 0,
    };

    const visitorDataByPeriod = {
        yesterday: [],
        today: [],
        thisWeek: [],
        thisMonth: [],
        thisYear: [],
    };

    if (visitorData && Array.isArray(visitorData)) {
        visitorData.forEach((visitor) => {
            if (!visitor.datetime) return;
            const visitDate = new Date(visitor.datetime);
            if (isNaN(visitDate)) return;

            if (visitDate >= startOfToday) {
                visitorStats.today += 1;
                visitorStats.thisWeek += 1;
                visitorStats.thisMonth += 1;
                visitorStats.thisYear += 1;
                visitorDataByPeriod.today.push(visitor);
                visitorDataByPeriod.thisWeek.push(visitor);
                visitorDataByPeriod.thisMonth.push(visitor);
                visitorDataByPeriod.thisYear.push(visitor);
            } else if (visitDate >= startOfYesterday && visitDate < startOfToday) {
                visitorStats.yesterday += 1;
                visitorStats.thisWeek += 1;
                visitorStats.thisMonth += 1;
                visitorStats.thisYear += 1;
                visitorDataByPeriod.yesterday.push(visitor);
                visitorDataByPeriod.thisWeek.push(visitor);
                visitorDataByPeriod.thisMonth.push(visitor);
                visitorDataByPeriod.thisYear.push(visitor);
            } else if (visitDate >= startOfWeek) {
                visitorStats.thisWeek += 1;
                visitorStats.thisMonth += 1;
                visitorStats.thisYear += 1;
                visitorDataByPeriod.thisWeek.push(visitor);
                visitorDataByPeriod.thisMonth.push(visitor);
                visitorDataByPeriod.thisYear.push(visitor);
            } else if (visitDate >= startOfMonth) {
                visitorStats.thisMonth += 1;
                visitorStats.thisYear += 1;
                visitorDataByPeriod.thisMonth.push(visitor);
                visitorDataByPeriod.thisYear.push(visitor);
            } else if (visitDate >= startOfYear) {
                visitorStats.thisYear += 1;
                visitorDataByPeriod.thisYear.push(visitor);
            }
        });
    }

    const logVisitorData = (period) => {
        setSection(period);
        navigation.navigate('CustomVisitors', { visitorData: visitorDataByPeriod[period], period: period });
    };

    const VisitorsAnalyticsData = analyticsData({ styles, visitorStats, logVisitorData });

    return (
        <View style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#6600ff']} />}
            >
                <AnimatedScreen>
                    <View style={styles.header}>
                        <Image source={require('../../assets/icons/flash.png')} style={{ width: 20, height: 20 }} tintColor='#1A78D4' />
                        <Text style={styles.headerText}>Security Command Center</Text>
                        <Image source={require('../../assets/icons/flash.png')} style={{ width: 20, height: 20 }} tintColor='#1A78D4' />
                    </View>
                    <Text style={styles.heading}>Real-time visitor monitoring & control</Text>
                    <View style={[styles.cardContainer, {gap: isPortrait ? "4%" : "2%"}]}>
                        <CustomCard
                            cardTitle="Total Buildings"
                            cardText="Managed Properties"
                            colors={['#1D7CCF', '#0F4696']}
                            styles={styles}
                            iconBgColor="#578BC5"
                            iconName="office-building-outline"
                            value={apartmentData?.length || 0}
                            route="Buildings"
                            display="yes"
                            mainStyle={{ width: isPortrait ? "47.9%" : "46%" }}
                            customStyle={[styles.iconMainContainer, {
                                backgroundColor: '#2E6EB8', top: "-50%", right: isPortrait ? "-8%" : "-4%", borderTopRightRadius: 10, borderBottomLeftRadius: 50
                            }]}
                        />
                        <CustomCard
                            cardTitle="Active Visitors"
                            cardText="Currently Inside"
                            colors={['#3E9142', '#1C5A21']}
                            styles={styles}
                            iconBgColor="#679969"
                            iconName="home-outline"
                            value={TotalActive || 0}
                            route="Security Hub"
                            display="no"
                            mainStyle={{ width: isPortrait ? "47.9%" : "46%" }}
                            customStyle={[styles.iconMainContainer, { backgroundColor: '#407E42', top: "-45%", right: isPortrait ? "-8%" : "-4%" }]}
                        />
                    </View>
                    <View style={[styles.cardContainer, {gap: isPortrait ? "4%" : "2%"}]}>
                        <CustomCard
                            cardTitle="Total Floors"
                            cardText="Across All Buildings"
                            colors={['#23968B', '#034D41']}
                            styles={styles}
                            iconBgColor="#4A9F95"
                            iconName="office-building-outline"
                            value={uniqueFloorData?.length || 0}
                            route="Security Hub"
                            display="no"
                            mainStyle={{ width: isPortrait ? "47.9%" : "46%" }}
                            customStyle={[styles.iconMainContainer, {
                                backgroundColor: '#1D887D', top: "-50%", right: isPortrait ? "-8%" : "-4%", borderTopRightRadius: 10, borderBottomLeftRadius: 50
                            }]}
                        />
                        <CustomCard
                            cardTitle="Registered Flats"
                            cardText="Across All Buildings"
                            colors={['#26A5DF', '#045694']}
                            styles={styles}
                            iconBgColor="#4BA0CF"
                            iconName="map-marker-outline"
                            value={uniqueFlatData?.length || 0}
                            route="Residential Units"
                            display="yes"
                            mainStyle={{ width: isPortrait ? "47.9%" : "46%" }}
                            customStyle={[styles.iconMainContainer, { backgroundColor: '#1E88C3', top: "-50%", right: isPortrait ? "-8%" : "-4%", }]}
                        />
                    </View>
                    <View style={styles.headingTwoContainer}>
                        <Image source={require('../../assets/icons/trend.png')} style={{ width: 20, height: 20 }} tintColor='#1E86E3' />
                        <Text style={styles.headingTwo}>Visitor Analytics</Text>
                        <Divider style={styles.divider} />
                    </View>
                    <View style={styles.analyticsContainer}>
                        {VisitorsAnalyticsData?.map((item, index) => (
                            <VisitorsCard
                                key={index}
                                styles={item?.styles}
                                onPress={item?.onPress}
                                src={item?.src}
                                analyticsLabel={item?.analyticsLabel}
                                colors={item?.colors}
                                icon={item?.icon}
                                visitorStats={item?.visitorStats}
                            />
                        ))}
                    </View>
                    <View style={[styles.headingTwoContainer, { marginTop: 0 }]}>
                        <Image source={require('../../assets/icons/flash.png')} style={{ width: 20, height: 20 }} tintColor='#357B3C' />
                        <Text style={styles.headingTwo}>Quick Actions</Text>
                        <Divider style={[styles.divider, { borderColor: "#357B3C" }]} />
                    </View>
                    <LinearGradient
                        colors={['#43a047', '#26a69a']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.regiterButtonContainer}
                    >
                        <Button
                            mode='contained-tonal'
                            style={styles.registerButton}
                            labelStyle={styles.registerButtonLabel}
                            children="Register New Visitor"
                            icon="account-plus-outline"
                            onPress={() => navigation.navigate('New Entry')}
                        />
                    </LinearGradient>
                    <View style={styles.grpBtn}>
                        <Button
                            mode='contained-tonal'
                            style={styles.buildButton}
                            labelStyle={{ color: "#1e88e5" }}
                            children="Buildings"
                            icon="office-building-outline"
                            elevation={20}
                            onPress={() => navigation.navigate("Buildings")}
                        />
                        <Button
                            mode='contained-tonal'
                            style={styles.buildButton}
                            labelStyle={{ color: "#26a69a" }}
                            children="Flats"
                            icon="map-marker-outline"
                            elevation={20}
                            onPress={() => navigation.navigate("Residential Units")}
                        />
                    </View>
                </AnimatedScreen>
            </ScrollView>
        </View>
    );
}