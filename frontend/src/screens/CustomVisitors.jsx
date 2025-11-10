import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useContext, useState } from 'react';
import { Dimensions, RefreshControl, ScrollView, View, TouchableOpacity } from 'react-native';
import useFunctions from '../hooks/useFunctions';
import { IconButton, Searchbar, Text } from 'react-native-paper';
import { MyContext } from '../context/ContextProvider';
import CalendarModal from '../ui/modal/CalendarModal';
import { Styles } from '../styles/CustomVisitors';
import VisitorSortMenu from '../ui/menu/VisitorSortMenu';
import { formatDate, formatDateTime } from '../utils/formatData';
import LinearGradient from 'react-native-linear-gradient';
import { AnimatedScreen } from '../components/AnimatedScreen';

export default function CustomVisitors() {
    const { refreshing, onRefresh, selected, orientation, setSelected, setGradientColor } = useContext(MyContext);
    const [sortColumn, setSortColumn] = useState('sno');
    const [sortDirection, setSortDirection] = useState({
        sno: 'descending',
        vname: 'ascending',
        pno: 'ascending',
        address: 'ascending',
        vtype: 'ascending',
        vno: 'ascending',
        ptm: 'ascending',
        apartmentname: 'ascending',
        floorno: 'ascending',
        flatno: 'ascending',
        date: 'ascending',
    });
    const [searchQuery, setSearchQuery] = useState('');
    const { Wrapper } = useFunctions();
    const route = useRoute();
    const navigation = useNavigation();
    const { height, width } = Dimensions.get('window');
    const isPortrait = orientation === 'portrait';
    const styles = Styles({ width, height, isPortrait });
    const { visitorData, period } = route?.params || {};

    useFocusEffect(
        useCallback(() => {
            Wrapper(route);
            setGradientColor(['#42BFF4', '#28AEC9', '#35ADA6']);
            return;
        }, [])
    );

    const sortedData = [...visitorData].sort((a, b) => {
        if (sortColumn === 'sno') {
            return sortDirection.sno === 'ascending' ? -1 : 1;
        } else if (sortColumn === 'vname') {
            const nameA = `${a.first_name || ''} ${a.last_name || ''}`.trim().toLowerCase();
            const nameB = `${b.first_name || ''} ${b.last_name || ''}`.trim().toLowerCase();
            return sortDirection.vname === 'ascending'
                ? nameA.localeCompare(nameB)
                : nameB.localeCompare(nameA);
        } else if (sortColumn === 'pno') {
            const phoneA = a.phone_no || 0;
            const phoneB = b.phone_no || 0;
            return sortDirection.pno === 'ascending' ? phoneA - phoneB : phoneB - phoneA;
        } else if (sortColumn === 'floorno') {
            const floorA = a.floor_no || 0;
            const floorB = b.floor_no || 0;
            return sortDirection.floorno === 'ascending' ? floorA - floorB : floorB - floorA;
        } else if (sortColumn === 'flatno') {
            const flatA = a.flat_no || 0;
            const flatB = b.flat_no || 0;
            return sortDirection.flatno === 'ascending' ? flatA - flatB : flatB - flatA;
        } else if (sortColumn === 'apartmentname') {
            const apartmentA = a.apartment_name || '';
            const apartmentB = b.apartment_name || '';
            return sortDirection.apartmentname === 'ascending'
                ? apartmentA.localeCompare(apartmentB)
                : apartmentB.localeCompare(apartmentA);
        } else if (sortColumn === 'address') {
            const addressA = a.address || '';
            const addressB = b.address || '';
            return sortDirection.address === 'ascending'
                ? addressA.localeCompare(addressB)
                : addressB.localeCompare(addressA);
        } else if (sortColumn === 'vtype') {
            const vehicleTypeA = a.vehicle_type || '';
            const vehicleTypeB = b.vehicle_type || '';
            return sortDirection.vtype === 'ascending'
                ? vehicleTypeA.localeCompare(vehicleTypeB)
                : vehicleTypeB.localeCompare(vehicleTypeA);
        } else if (sortColumn === 'vno') {
            const vehicleNoA = a.vehicle_no || '';
            const vehicleNoB = b.vehicle_no || '';
            return sortDirection.vno === 'ascending'
                ? vehicleNoA.localeCompare(vehicleNoB)
                : vehicleNoB.localeCompare(vehicleNoB);
        } else if (sortColumn === 'ptm') {
            const personToMeetA = a.person_to_meet || '';
            const personToMeetB = b.person_to_meet || '';
            return sortDirection.ptm === 'ascending'
                ? personToMeetA.localeCompare(personToMeetB)
                : personToMeetB.localeCompare(personToMeetA);
        } else if (sortColumn === 'date') {
            const dateA = new Date(a.datetime).toISOString().split('T')[0] || '';
            const dateB = new Date(b.datetime).toISOString().split('T')[0] || '';
            return sortDirection.date === 'ascending'
                ? dateA.localeCompare(dateB)
                : dateB.localeCompare(dateA);
        }
        return 0;
    });

    const filteredData = sortedData.filter((item) => {
        const fullName = `${item.first_name || ''} ${item.last_name || ''}`.trim().toLowerCase();
        const phoneNo = item.phone_no?.toString().toLowerCase() || '';
        const address = item.address?.toLowerCase() || '';
        const vehicleNo = item.vehicle_no?.toLowerCase() || '';
        const personToMeet = item.person_to_meet?.toLowerCase() || '';
        const apartmentName = item.apartment_name?.toLowerCase() || '';
        const dateTime = item.datetime || '';
        const datePart = dateTime ? new Date(dateTime).toISOString().split('T')[0] : '';
        const query = searchQuery.toLowerCase();

        const selectedDate = selected ? new Date(selected.getTime() - (selected.getTimezoneOffset() * 60000)).toISOString().split('T')[0] : null;
        const matchesDate = selectedDate ? datePart === selectedDate : true;

        const matchesSearch = !query || (
            fullName.includes(query) ||
            phoneNo.includes(query) ||
            address.includes(query) ||
            vehicleNo.includes(query) ||
            personToMeet.includes(query) ||
            apartmentName.includes(query) ||
            datePart.includes(query)
        );

        return matchesDate && matchesSearch;
    });

    const totalVisitors = filteredData.length;

    const formatTime = (datetime) => {
        if (!datetime) return '';
        const date = new Date(datetime);
        return date.toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    let message = `No visitors from ${period} found.`;
    if (searchQuery) {
        message = 'No visitor match your search.';
    } else if (selected && filteredData.length === 0) {
        message = 'No visitor found for the selected date.';
    }

    let text = null;
    if (period === 'yesterday') {
        text = 'Yesterdays Visitors';
    } else if (period === 'today') {
        text = 'Todays Visitors';
    } else if (period === 'thisWeek') {
        text = 'This Weeks Visitors';
    } else if (period === 'thisMonth') {
        text = 'This Months Visitors';
    } else if (period === 'thisYear') {
        text = 'This Years Visitors';
    } else {
        text = 'Visitor Records';
    }

    const toggleSort = (columnKey) => {
        setSortColumn(columnKey);
        setSortDirection((prev) => ({
            ...prev,
            [columnKey]: prev[columnKey] === 'ascending' ? 'descending' : 'ascending',
        }));
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <IconButton icon="arrow-left" size={24} color="#fff" onPress={() => navigation.goBack()} iconColor="#fff" />
                <View>
                    <Text style={styles.headerTitle}>{text}</Text>
                    <Text style={styles.headerSubtitle}>Comprehensive visitor management</Text>
                </View>
            </View>
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={['#6600ff']}
                    />
                }
            >
                <AnimatedScreen>
                    <View style={styles.filterSection}>
                        <Text style={styles.sectionTitle}>Filter & Search</Text>
                        <View style={styles.filterMainContainer}>
                            <View style={styles.filterSubContainer}>
                                <View style={styles.searchRow}>
                                    <Searchbar
                                        placeholder="Search visitors..."
                                        placeholderTextColor="#888"
                                        iconColor="#888"
                                        clearIcon="close-circle-outline"
                                        clearButtonMode="while-editing"
                                        elevation={0}
                                        onChangeText={setSearchQuery}
                                        value={searchQuery}
                                        style={styles.searchBar}
                                        inputStyle={styles.searchInput}
                                    />

                                    <VisitorSortMenu toggleSort={toggleSort} />
                                </View>

                                <TouchableOpacity style={styles.filterByDateButton}>
                                    <View style={styles.filterDateContainer}>
                                        <CalendarModal modalKey="calendarCustom" />
                                        {selected ? (
                                            <Text style={styles.selectedDate}>{formatDate(selected)}</Text>
                                        ) : (
                                            <Text style={styles.filterPlaceholder}>Filter by date</Text>
                                        )}
                                    </View>

                                    {selected && <IconButton icon="close" size={10} iconColor='red' mode='outlined' style={styles.closeBtn} onPress={() => setSelected(null)} />}
                                </TouchableOpacity>
                            </View>
                            {!isPortrait && (
                                <LinearGradient
                                    colors={['#1E88E5', '#1565C0']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                    style={styles.statsContainer}
                                >
                                    <View style={styles.statCard}>
                                        <View style={styles.statContent}>
                                            <Text style={styles.statLabel}>Total</Text>
                                            <Text style={styles.statNumber}>{totalVisitors}</Text>
                                        </View>
                                        <IconButton icon="trending-up" size={24} iconColor="#fff" style={styles.statIcon} />
                                    </View>
                                </LinearGradient>
                            )}
                        </View>
                        {isPortrait && (
                            <LinearGradient
                                colors={['#1E88E5', '#1565C0']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={styles.statsContainer}
                            >
                                <View style={styles.statCard}>
                                    <View style={styles.statContent}>
                                        <Text style={styles.statLabel}>Total</Text>
                                        <Text style={styles.statNumber}>{totalVisitors}</Text>
                                    </View>
                                    <IconButton icon="trending-up" size={24} iconColor="#fff" style={styles.statIcon} />
                                </View>
                            </LinearGradient>
                        )}
                    </View>


                    {filteredData?.length === 0 ? (
                        <View style={styles.noDataContainer}>
                            <Text style={styles.noDataText}>{message}</Text>
                        </View>
                    ) : (
                        <View style={styles.visitorListContainer}>
                            {filteredData?.map((item, index) => (
                                <TouchableOpacity
                                    key={item.id}
                                    style={styles.visitorCard}
                                    onPress={() => navigation.navigate('Visitor Details', { item, index })}
                                >
                                    <View style={styles.cardHeader}>
                                        <View style={styles.cardHeaderLeft}>
                                            <Text style={styles.visitorNumber}>
                                                #{sortDirection.sno === 'ascending' ? filteredData.length - index : index + 1}
                                            </Text>
                                            <Text style={styles.visitorName}>
                                                {item.first_name} {item.last_name}
                                            </Text>
                                        </View>
                                        <Text style={styles.dateTime}>{formatDateTime(item.datetime)}</Text>
                                    </View>

                                    <View style={styles.cardBody}>
                                        <View style={styles.infoRow}>
                                            <IconButton icon="phone" size={16} iconColor="#6600ff" style={styles.infoIcon} />
                                            <Text style={styles.infoText}>{item.phone_no}</Text>
                                        </View>

                                        <View style={styles.infoRow}>
                                            <IconButton icon="map-marker" size={16} iconColor="#22c55e" style={styles.infoIcon} />
                                            <Text style={styles.infoText}>{item.address}</Text>
                                        </View>

                                        {item.vehicle_no && (
                                            <View style={styles.infoRow}>
                                                <IconButton icon="car" size={16} iconColor="#14b8a6" style={styles.infoIcon} />
                                                <Text style={styles.infoText}>
                                                    {item.vehicle_type} {item.vehicle_no && `- ${item.vehicle_no}`}
                                                </Text>
                                            </View>
                                        )}

                                        <View style={styles.infoRow}>
                                            <IconButton icon="account-tie" size={16} iconColor="#a855f7" style={styles.infoIcon} />
                                            <Text style={styles.infoText}>Meeting: {item.person_to_meet}</Text>
                                        </View>

                                        <View style={styles.infoRow}>
                                            <IconButton icon="office-building" size={16} iconColor="#f59e0b" style={styles.infoIcon} />
                                            <Text style={styles.infoText}>
                                                {item.apartment_name} - Flat {item.flat_no}, Floor {item.floor_no}
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}
                </AnimatedScreen>
            </ScrollView>
        </View>
    );
}