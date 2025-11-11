import React, { useCallback, useContext, useState, useMemo } from 'react';
import { Dimensions, RefreshControl, ScrollView, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Styles } from '../styles/Reports';
import LinearGradient from 'react-native-linear-gradient';
import { MyContext } from '../context/ContextProvider';
import useFunctions from '../hooks/useFunctions';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { IconButton } from 'react-native-paper';
import * as XLSX from 'xlsx';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import { AnimatedScreen } from '../components/AnimatedScreen';
import CustomCard from '../components/Card';

export default function Reports() {
    const { visitorData, refreshing, onRefresh, orientation, showToast, setGradientColor } = useContext(MyContext);
    const { Wrapper } = useFunctions();
    const route = useRoute();
    const navigation = useNavigation();
    const [selectedPeriod, setSelectedPeriod] = useState('Today');
    const [lastFilePath, setLastFilePath] = useState(null);
    const [loading, setLoading] = useState(false);
    const { height, width } = Dimensions.get('window');
    const isPortrait = orientation === 'portrait';
    const styles = Styles({ width, height, isPortrait });

    useFocusEffect(
        useCallback(() => {
            Wrapper(route);
            setGradientColor(['#F8A634', '#E84E49']);
            return;
        }, [])
    );

    const periods = ['Today', 'This Week', 'This Month', 'This Year'];

    const getFilteredData = useMemo(() => {
        if (!visitorData || visitorData.length === 0) return [];

        const now = new Date();
        const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());

        const weekStart = new Date(todayStart);
        const day = weekStart.getDay();
        const diff = day === 0 ? -6 : 1 - day;
        weekStart.setDate(weekStart.getDate() + diff);

        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

        const yearStart = new Date(now.getFullYear(), 0, 1);

        return visitorData.filter(visitor => {
            const visitorDate = new Date(visitor.datetime);

            switch (selectedPeriod) {
                case 'Today':
                    return visitorDate >= todayStart;
                case 'This Week':
                    return visitorDate >= weekStart;
                case 'This Month':
                    return visitorDate >= monthStart;
                case 'This Year':
                    return visitorDate >= yearStart;
                default:
                    return true;
            }
        });
    }, [visitorData, selectedPeriod]);

    const metrics = useMemo(() => {
        const filtered = getFilteredData;

        const totalVisitors = filtered.length;

        const activeNow = filtered.map(v => v.is_active).filter(Boolean).length;

        const departed = filtered.map(v => !v.is_active).filter(Boolean).length;

        const calculatePreviousPeriod = () => {
            if (!visitorData || visitorData.length === 0) return 0;

            const now = new Date();
            let previousStart, previousEnd;

            switch (selectedPeriod) {
                case 'Today':
                    previousStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
                    previousEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                    break;
                case 'This Week':
                    previousStart = new Date(now);
                    previousStart.setDate(now.getDate() - 7);
                    previousEnd = new Date(now);
                    previousEnd.setDate(now.getDate() - 7);
                    break;
                case 'This Month':
                    previousStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
                    previousEnd = new Date(now.getFullYear(), now.getMonth(), 0);
                    break;
                case 'This Year':
                    previousStart = new Date(now.getFullYear() - 1, 0, 1);
                    previousEnd = new Date(now.getFullYear() - 1, 11, 31);
                    break;
                default:
                    return 0;
            }

            return visitorData.filter(v => {
                const vDate = new Date(v.datetime);
                return vDate >= previousStart && vDate < previousEnd;
            }).length;
        };

        const previousTotal = calculatePreviousPeriod();
        const changePercent = previousTotal > 0
            ? Math.round(((totalVisitors - previousTotal) / previousTotal) * 100)
            : totalVisitors > 0 ? 100 : 0;

        return {
            totalVisitors,
            activeNow,
            departed,
            changePercent
        };
    }, [getFilteredData, visitorData, selectedPeriod]);

    const peakHour = useMemo(() => {
        if (getFilteredData.length === 0) return { hour: 0, count: 0 };

        const hourCounts = {};
        getFilteredData.forEach(visitor => {
            const hour = new Date(visitor.datetime).getHours();
            hourCounts[hour] = (hourCounts[hour] || 0) + 1;
        });

        let maxHour = 0;
        let maxCount = 0;
        Object.entries(hourCounts).forEach(([hour, count]) => {
            if (count > maxCount) {
                maxCount = count;
                maxHour = parseInt(hour);
            }
        });

        return { hour: maxHour, count: maxCount };
    }, [getFilteredData]);

    const formatPeakHour = (hour) => {
        const period = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
        return `${displayHour}:00 ${period}`;
    };

    const vehicleAnalysis = useMemo(() => {
        if (getFilteredData.length === 0) return { car: 0, bike: 0, mostPopular: 'Null' };

        const vehicles = {};
        getFilteredData.forEach(visitor => {
            const vehicleType = visitor.vehicle_type || 'Unknown';
            vehicles[vehicleType] = (vehicles[vehicleType] || 0) + 1;
        });

        const car = vehicles['Car'] || vehicles['car'] || 0;
        const bike = vehicles['Bike'] || vehicles['bike'] || vehicles['Motorcycle'] || vehicles['motorcycle'] || 0;

        let mostPopular = 'Null';
        let maxCount = 0;
        Object.entries(vehicles).forEach(([type, count]) => {
            if (count > maxCount) {
                maxCount = count;
                mostPopular = `${type} (${count} visitor${count !== 1 ? 's' : ''})`;
            }
        });

        return { car, bike, mostPopular };
    }, [getFilteredData]);

    const avgStayDuration = useMemo(() => {
        const completedVisits = getFilteredData.filter(v => v.checkoutTime || v.departureTime);

        if (completedVisits.length === 0) return '0 hours';

        let totalMinutes = 0;
        completedVisits.forEach(visitor => {
            const checkin = new Date(visitor.datetime);
            const checkout = new Date(visitor.checkoutTime || visitor.departureTime);
            const diffMs = checkout - checkin;
            totalMinutes += diffMs / (1000 * 60);
        });

        const avgMinutes = totalMinutes / completedVisits.length;
        const hours = Math.floor(avgMinutes / 60);
        const minutes = Math.round(avgMinutes % 60);

        if (hours > 0) {
            return minutes > 0 ? `${hours}.${Math.round(minutes / 6)} hours` : `${hours} hours`;
        }
        return `${minutes} mins`;
    }, [getFilteredData]);

    const busiestDay = useMemo(() => {
        if (getFilteredData.length === 0) return 'Null';

        const dayCounts = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
        getFilteredData.forEach(visitor => {
            const day = new Date(visitor.datetime).getDay();
            dayCounts[day]++;
        });

        let maxDay = 0;
        let maxCount = 0;
        Object.entries(dayCounts).forEach(([day, count]) => {
            if (count > maxCount) {
                maxCount = count;
                maxDay = parseInt(day);
            }
        });

        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return days[maxDay];
    }, [getFilteredData]);

    const checkInEfficiency = useMemo(() => {
        if (getFilteredData.length === 0) return 0;

        const completedVisits = getFilteredData.filter(v => v.checkoutTime || v.departureTime);

        if (completedVisits.length === 0) return 85;

        const efficiency = Math.min(95, 70 + (completedVisits.length / getFilteredData.length) * 25);
        return Math.round(efficiency);
    }, [getFilteredData]);

    const getEfficiencyLabel = (score) => {
        if (score >= 90) return 'Excellent';
        if (score >= 75) return 'Good';
        if (score >= 60) return 'Average';
        return 'Needs Improvement';
    };

    const downloadExcel = async () => {
        if (!getFilteredData.length) {
            showToast({
                type: 'info',
                title: 'No Data',
                message: `No visitor data found for ${selectedPeriod.toLowerCase()}.`,
            });
            return;
        }

        try {
            setLoading(true);

            const reportDate = new Date().toLocaleDateString('en-GB');
            const reportTime = new Date().toLocaleTimeString('en-GB');

            const wsData = [
                ['VISITOR ANALYTICS REPORT'],
                [`Period: ${selectedPeriod}`],
                [`Generated: ${reportDate} ${reportTime}`],
                [],
                ['SUMMARY METRICS'],
                ['Total Visitors', metrics.totalVisitors],
                ['Active Now', metrics.activeNow],
                ['Departed', metrics.departed],
                ['Change %', `${metrics.changePercent > 0 ? '+' : ''}${metrics.changePercent}%`],
                ['Peak Hour', formatPeakHour(peakHour.hour)],
                ['Avg Stay Duration', avgStayDuration],
                ['Busiest Day', busiestDay],
                ['Check-in Efficiency', `${checkInEfficiency}%`],
                [],
                ['VEHICLE ANALYSIS'],
                ['Cars', vehicleAnalysis.car],
                ['Bikes', vehicleAnalysis.bike],
                ['Most Popular', vehicleAnalysis.mostPopular],
                [],
                ['VISITOR DETAILS'],
                ['Date & Time', 'Name', 'Phone', 'Vehicle Type', 'Vehicle Number', 'Check-in'],
            ];

            getFilteredData.forEach(visitor => {
                const checkinTime = new Date(visitor.datetime).toLocaleString('en-GB');
                wsData.push([
                    checkinTime,
                    visitor.first_name + ' ' + visitor.last_name || 'N/A',
                    visitor.phone_no || 'N/A',
                    visitor.vehicle_type || 'N/A',
                    visitor.vehicle_no || 'N/A',
                    checkinTime,
                ]);
            });

            const wb = XLSX.utils.book_new();
            const ws = XLSX.utils.aoa_to_sheet(wsData);

            ws['!cols'] = [
                { wch: 20 }, // Date & Time
                { wch: 20 }, // Name
                { wch: 15 }, // Phone
                { wch: 15 }, // Vehicle Type
                { wch: 15 }, // Vehicle Number
            ];

            XLSX.utils.book_append_sheet(wb, ws, selectedPeriod.replace(/\s+/g, '_'));

            const wbout = XLSX.write(wb, { type: 'binary', bookType: 'xlsx' });

            const fileName = `Visitor_Report_${selectedPeriod.replace(/\s+/g, '_')}_${Date.now()}.xlsx`;
            const filePath = `${RNFS.DownloadDirectoryPath}/${fileName}`;

            await RNFS.writeFile(filePath, wbout, 'ascii');

            setLastFilePath(filePath);

            showToast({
                type: 'success',
                title: 'Report Downloaded',
                message: `${selectedPeriod} report saved successfully!`,
            });
        } catch (err) {
            showToast({
                type: 'error',
                title: 'Download Failed',
                message: 'Failed to generate Excel report.',
            });
        } finally {
            setLoading(false);
        }
    };

    const shareExcel = async () => {
        if (!lastFilePath) {
            await downloadExcel();
            setTimeout(async () => {
                if (lastFilePath) {
                    await performShare();
                }
            }, 500);
        } else {
            await performShare();
        }
    };

    const performShare = async () => {
        if (!lastFilePath) {
            showToast({
                type: 'error',
                title: 'No Report',
                message: 'Please try again.',
            });
            return;
        }

        try {
            const fileExists = await RNFS.exists(lastFilePath);

            if (!fileExists) {
                showToast({
                    type: 'error',
                    title: 'File Not Found',
                    message: 'Please download the report first.',
                });
                return;
            }

            await Share.open({
                title: `Visitor Report - ${selectedPeriod}`,
                message: `Visitor analytics report for ${selectedPeriod.toLowerCase()}`,
                url: 'file://' + lastFilePath,
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                subject: `Visitor Report - ${selectedPeriod}`,
            });

            showToast({
                type: 'success',
                title: 'Share Successful',
                message: 'Report shared successfully!',
            });
        } catch (err) {
            if (err.message !== 'User did not share') {
                showToast({
                    type: 'error',
                    title: 'Share Failed',
                    message: 'Failed to share report.',
                });
            }
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerRow}>
                    <IconButton
                        icon="arrow-left"
                        size={24}
                        iconColor="#fff"
                        onPress={() => navigation.goBack()}
                    />
                    <View>
                        <Text style={styles.title}>Reports & Analytics</Text>
                        <Text style={styles.subtitle}>Comprehensive visitor insights</Text>
                    </View>
                </View>
                {!isPortrait && (
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.exportButton}
                            onPress={downloadExcel}
                            disabled={loading}
                        >
                            <Icon
                                name="download"
                                size={16}
                                color={loading ? "#9ca3af" : "#23A0DB"}
                            />
                            <Text style={[styles.exportText, { color: loading ? "#9ca3af" : "#23A0DB" }]}>
                                {loading ? "Processing..." : "Download"}
                            </Text>
                        </TouchableOpacity>
                        <Icon name="repeat" size={16} color="#8b92a7" />
                        <TouchableOpacity
                            style={styles.exportButton}
                            onPress={shareExcel}
                            disabled={loading}
                        >
                            <Icon
                                name="share-2"
                                size={16}
                                color={loading ? "#9ca3af" : "#4ade80"}
                            />
                            <Text style={[styles.exportText, { color: loading ? "#9ca3af" : "#4ade80" }]}>
                                {loading ? "Processing..." : "Share"}
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
            {isPortrait && (
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.exportButton}
                        onPress={downloadExcel}
                        disabled={loading}
                    >
                        <Icon
                            name="download"
                            size={16}
                            color={loading ? "#9ca3af" : "#23A0DB"}
                        />
                        <Text style={[styles.exportText, { color: loading ? "#9ca3af" : "#23A0DB" }]}>
                            {loading ? "Processing..." : "Download"}
                        </Text>
                    </TouchableOpacity>
                    <Icon name="repeat" size={16} color="#8b92a7" />
                    <TouchableOpacity
                        style={styles.exportButton}
                        onPress={shareExcel}
                        disabled={loading}
                    >
                        <Icon
                            name="share-2"
                            size={16}
                            color={loading ? "#9ca3af" : "#4ade80"}
                        />
                        <Text style={[styles.exportText, { color: loading ? "#9ca3af" : "#4ade80" }]}>
                            {loading ? "Processing..." : "Share"}
                        </Text>
                    </TouchableOpacity>
                </View>
            )}
            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={['#6600ff']}
                        tintColor="#6600ff"
                    />
                }
            >
                <AnimatedScreen>
                    <View style={styles.periodSelector}>
                        {periods.map((period) => (
                            <TouchableOpacity
                                key={period}
                                style={[
                                    styles.periodButton,
                                    selectedPeriod === period && styles.periodButtonActive
                                ]}
                                onPress={() => {
                                    setSelectedPeriod(period);
                                    setLastFilePath(null);
                                }}
                            >
                                <Text style={[
                                    styles.periodText,
                                    selectedPeriod === period && styles.periodTextActive
                                ]}>
                                    {period}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Metrics Grid */}
                    <View style={styles.metricsGrid}>
                        <CustomCard
                            cardTitle="Total Visitors"
                            cardText="All time records"
                            colors={['#1D7CCF', '#0F4696']}
                            styles={styles}
                            iconBgColor="#578BC5"
                            iconName="account-multiple-outline"
                            value={metrics.totalVisitors || 0}
                            route="Analytics"
                            display="no"
                            mainStyle={{ width: isPortrait ? "47.9%" : "30%" }}
                            customStyle={[styles.iconMainContainer, {
                                backgroundColor: '#2B67B1', top: "-50%", right: isPortrait ? "-8%" : "-6%", borderTopRightRadius: 10, borderBottomLeftRadius: 50
                            }]}
                            reportText={
                                <Text style={styles.metricChange}>
                                    <Icon name="trending-up" size={13} color="#fff" />{' '}
                                    {metrics.changePercent > 0 ? '+' : ''} {metrics.changePercent}%
                                </Text>
                            }
                        />
                        <CustomCard
                            cardTitle="Active Now"
                            cardText="Currently Inside"
                            colors={['#3E9142', '#1C5A21']}
                            styles={styles}
                            iconBgColor="#679969"
                            iconName="pulse"
                            value={metrics.activeNow || 0}
                            route="Analytics"
                            display="no"
                            mainStyle={{ width: isPortrait ? "47.9%" : "30%" }}
                            customStyle={[styles.iconMainContainer, { backgroundColor: '#407E42', top: "-45%", right: isPortrait ? "-8%" : "-6%" }]}
                        />
                    </View>
                    <View style={styles.metricsGrid}>
                        <CustomCard
                            cardTitle="Departed"
                            cardText="Completedi visits"
                            colors={['#23968B', '#034D41']}
                            styles={styles}
                            iconBgColor="#4A9F95"
                            iconName="office-building-outline"
                            value={metrics.departed || 0}
                            route="Analytics"
                            display="no"
                            mainStyle={{ width: isPortrait ? "47.9%" : "30%" }}
                            customStyle={[styles.iconMainContainer, {
                                backgroundColor: '#1D887D', top: "-50%", right: isPortrait ? "-8%" : "-6%", borderTopRightRadius: 10, borderBottomLeftRadius: 50
                            }]}
                        />
                        <CustomCard
                            cardTitle="Peak Hour"
                            cardText={`${formatPeakHour(peakHour.hour)} daily`}
                            colors={['#26A5DF', '#045694']}
                            styles={styles}
                            iconBgColor="#4BA0CF"
                            iconName="clock-outline"
                            value={peakHour.hour || 0}
                            route="Analytics"
                            display="no"
                            mainStyle={{ width: isPortrait ? "47.9%" : "30%" }}
                            customStyle={[styles.iconMainContainer, { backgroundColor: '#1E88C3', top: "-50%", right: "-7%" }]}
                        />
                    </View>

                    {/* Vehicle Analysis */}
                    <View style={styles.sectionCard}>
                        <View style={styles.sectionHeader}>
                            <View style={[styles.sectionDot, { backgroundColor: '#ef4444' }]} />
                            <Text style={styles.sectionTitle}>Vehicle Analysis</Text>
                            <Icon name="bar-chart-2" size={18} color="#8b92a7" />
                        </View>

                        <View style={styles.vehicleItem}>
                            <Text style={styles.vehicleLabel}>Car</Text>
                            <View style={styles.vehicleBadge}>
                                <Text style={styles.vehicleCount}>{vehicleAnalysis.car}</Text>
                            </View>
                        </View>

                        <View style={[styles.vehicleItem, styles.vehicleItemBike]}>
                            <Text style={styles.vehicleLabel}>Bike</Text>
                            <View style={styles.vehicleBadge}>
                                <Text style={styles.vehicleCount}>{vehicleAnalysis.bike}</Text>
                            </View>
                        </View>

                        <View style={styles.popularVehicle}>
                            <Text style={styles.popularLabel}>⭐ Most Popular Vehicle</Text>
                            <Text style={styles.popularValue}>{vehicleAnalysis.mostPopular}</Text>
                        </View>
                    </View>

                    {/* Time Insights */}
                    <View style={styles.sectionCard}>
                        <View style={styles.sectionHeader}>
                            <View style={[styles.sectionDot, { backgroundColor: '#3b82f6' }]} />
                            <Text style={styles.sectionTitle}>Time Insights</Text>
                            <Icon name="trending-up" size={20} color="#8b92a7" />
                        </View>

                        <View style={[styles.timeInsightItem, styles.timeInsightGold]}>
                            <View style={styles.timeInsightLabel}>
                                <View style={[styles.timeInsightIcon, { backgroundColor: '#fbbf24' }]} />
                                <Text style={styles.timeInsightText}>⏰ Peak Hours</Text>
                            </View>
                            <Text style={[styles.timeInsightValue, styles.timeInsightValueGold]}>
                                {formatPeakHour(peakHour.hour)}
                            </Text>
                        </View>

                        <View style={[styles.timeInsightItem, styles.timeInsightGreen]}>
                            <View style={styles.timeInsightLabel}>
                                <View style={[styles.timeInsightIcon, { backgroundColor: '#4ade80' }]} />
                                <Text style={styles.timeInsightText}>📊 Avg. Stay Duration</Text>
                            </View>
                            <Text style={[styles.timeInsightValue, styles.timeInsightValueGreen]}>
                                {avgStayDuration}
                            </Text>
                        </View>

                        <View style={[styles.timeInsightItem, styles.timeInsightBlue]}>
                            <View style={styles.timeInsightLabel}>
                                <View style={[styles.timeInsightIcon, { backgroundColor: '#60a5fa' }]} />
                                <Text style={styles.timeInsightText}>📅 Busiest Day</Text>
                            </View>
                            <Text style={[styles.timeInsightValue, styles.timeInsightValueBlue]}>
                                {busiestDay}
                            </Text>
                        </View>
                    </View>

                    {/* Performance Metrics */}
                    <View style={styles.performanceCard}>
                        <View style={styles.sectionHeader}>
                            <View style={[styles.sectionDot, { backgroundColor: '#10b981' }]} />
                            <Text style={styles.sectionTitle}>Performance Metrics</Text>
                            <Icon name="activity" size={20} color="#8b92a7" />
                        </View>

                        <Text style={styles.performanceLabel}>Check-in Speed</Text>
                        <View style={styles.performanceBar}>
                            <View style={[styles.performanceProgress, { width: `${checkInEfficiency}%` }]} />
                        </View>
                        <View style={styles.performanceScore}>
                            <Text style={styles.performanceScoreText}>{checkInEfficiency}% Efficiency Score</Text>
                            <View style={styles.performanceBadge}>
                                <Text style={styles.performanceBadgeText}>
                                    {getEfficiencyLabel(checkInEfficiency)}
                                </Text>
                            </View>
                        </View>
                    </View>
                </AnimatedScreen>
            </ScrollView>
        </View>
    );
}