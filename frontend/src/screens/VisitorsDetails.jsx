import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useContext, useState } from 'react';
import { View, ScrollView, TextInput, TouchableOpacity, StyleSheet, RefreshControl, Dimensions } from 'react-native';
import useFunctions from '../hooks/useFunctions';
import { Icon, IconButton, Searchbar, Text } from 'react-native-paper';
import { MyContext } from '../context/ContextProvider';
import VisitorSortMenu from '../ui/menu/VisitorSortMenu';
import CalendarModal from '../ui/menu/CalendarModal';
import { formatDate, formatDateTime, formatTime } from '../utils/formatData';
import { Styles } from '../styles/VisitorsDetails';
import { AnimatedScreen } from '../components/AnimatedScreen';
import LinearGradient from 'react-native-linear-gradient';

export default function VisitorsDetails() {
    const { visitorData: data, refreshing, onRefresh, orientation, selected, setSelected, setGradientColor } = useContext(MyContext);
    const { Wrapper } = useFunctions();
    const route = useRoute();
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState('');
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
    const username = route?.params?.item?.first_name + ' ' + route?.params?.item?.last_name;
    const selectedData = data.filter((user) => (
        user.user_id === route?.params?.item?.user_id && user.first_name === route?.params?.item?.first_name && user.last_name === route?.params?.item?.last_name
    ));
    const { height, width } = Dimensions.get('window');
    const isPortrait = orientation === 'portrait';
    const styles = Styles({ width, height, isPortrait });

    useFocusEffect(
        useCallback(() => {
            Wrapper(route);
            setGradientColor(['#42BFF4', '#28AEC9', '#35ADA6']);
            return;
        }, [])
    );

    const sortedData = [...selectedData].sort((a, b) => {
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

    const filteredData = sortedData.filter((item, index) => {
        const sno = sortDirection.sno === 'ascending' ? (index + 1).toString() : (sortedData.length - index).toString();
        const fullName = `${item.first_name || ''} ${item.last_name || ''}`.trim().toLowerCase();
        const phoneNo = item.phone_no?.toString().toLowerCase() || '';
        const floorNo = item.floor_no?.toString().toLowerCase() || '';
        const flatNo = item.flat_no?.toString().toLowerCase() || '';
        const apartmentName = item.apartment_name?.toLowerCase() || '';
        const address = item.address?.toLowerCase() || '';
        const vehicleType = item.vehicle_type?.toLowerCase() || '';
        const vehicleNo = item.vehicle_no?.toLowerCase() || '';
        const personToMeet = item.person_to_meet?.toLowerCase() || '';
        const dateTime = item.datetime || '';
        const datePart = dateTime ? new Date(dateTime).toISOString().split('T')[0] : '';
        const query = searchQuery.toLowerCase();
        const selectedDate = selected ? new Date(selected.getTime() - (selected.getTimezoneOffset() * 60000)).toISOString().split('T')[0] : null;
        const matchesDate = selectedDate ? datePart === selectedDate : true;

        return (
            matchesDate &&
            (
                sno.includes(query) ||
                fullName.includes(query) ||
                phoneNo.includes(query) ||
                floorNo.includes(query) ||
                flatNo.includes(query) ||
                apartmentName.includes(query) ||
                address.includes(query) ||
                vehicleType.includes(query) ||
                vehicleNo.includes(query) ||
                personToMeet.includes(query) ||
                datePart.includes(query)
            )
        );
    });

    const totalVisitors = filteredData.length;

    const toggleSort = (columnKey) => {
        setSortColumn(columnKey);
        setSortDirection((prev) => ({
            ...prev,
            [columnKey]: prev[columnKey] === 'ascending' ? 'descending' : 'ascending',
        }));
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <IconButton icon="arrow-left" size={24} color="#fff" onPress={() => navigation.goBack()} iconColor="#fff" />
                <View>
                    <Text style={styles.headerTitle}>{username}</Text>
                    <Text style={styles.headerSubtitle}>Comprehensive visitor management</Text>
                </View>
            </View>

            <ScrollView
                style={styles.content}
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
                        <View style={styles.filterHeader}>
                            <View style={styles.filterTitleContainer}>
                                <View style={styles.blueDot} />
                                <Text style={styles.filterTitle}>Filter & Search</Text>
                            </View>
                        </View>

                        <View style={styles.filterMainContainer}>
                            <View style={styles.filterSubContainer}>
                                <View style={styles.searchRow}>
                                    <View style={styles.searchContainer}>
                                        <Searchbar
                                            placeholder="Search visitors..."
                                            placeholderTextColor="#888"
                                            iconColor="#888"
                                            clearIcon="close"
                                            elevation={0}
                                            inputStyle={styles.searchInput}
                                            onChangeText={setSearchQuery}
                                            value={searchQuery}
                                            style={styles.searchBar}
                                        />
                                    </View>
                                    <VisitorSortMenu toggleSort={toggleSort} />
                                </View>

                                <View style={styles.filterByDateButton}>
                                    <View style={styles.filterDateContainer}>
                                        <CalendarModal modalKey="vesitorDetails" />
                                        {selected ? (
                                            <Text style={styles.selectedDate}>{formatDate(selected)}</Text>
                                        ) : (
                                            <Text style={styles.filterPlaceholder}>Filter by date</Text>
                                        )}
                                    </View>
                                    {selected && <IconButton icon="close" size={10} iconColor='red' mode='outlined' style={styles.closeBtn} onPress={() => setSelected(null)} />}
                                </View>
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
                                            <Text style={styles.statValue}>{totalVisitors}</Text>
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
                                        <Text style={styles.statValue}>{totalVisitors}</Text>
                                    </View>
                                    <IconButton icon="trending-up" size={24} iconColor="#fff" style={styles.statIcon} />
                                </View>
                            </LinearGradient>
                        )}
                    </View>

                    {/* Visitors List */}
                    <View style={styles.listSection}>
                        {filteredData.map((visitor, index) => (
                            <View key={visitor.id} style={styles.visitorCard}>
                                <View style={styles.cardHeader}>
                                    <View style={styles.cardHeaderLeft}>
                                        <Text style={styles.visitorNumber}>
                                            #{sortDirection.sno === 'ascending' ? filteredData.length - index : index + 1}
                                        </Text>
                                        <Text style={styles.visitorName}>
                                            {visitor.person_to_meet}
                                        </Text>
                                    </View>
                                    <Text style={styles.dateTime}>{formatDateTime(visitor.datetime)}</Text>
                                </View>
                                <View style={styles.cardBody}>
                                    <View style={styles.infoRow}>
                                        <IconButton icon="office-building" size={16} iconColor="#888" style={styles.infoIcon} />
                                        <Text style={styles.infoText}>
                                            {visitor.apartment_name || 'N/A'} - Flat {visitor.flat_no || 'N/A'}, Floor {visitor.floor_no || 'N/A'}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        ))}
                    </View>
                </AnimatedScreen>
            </ScrollView>
        </View>
    );
}