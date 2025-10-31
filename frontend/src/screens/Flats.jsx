import React, { useCallback, useContext, useRef, useState } from 'react';
import { Dimensions, RefreshControl, ScrollView, View, TouchableOpacity } from 'react-native';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { Searchbar, Text, IconButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import useFunctions from '../hooks/useFunctions';
import AddFlatModal from '../ui/menu/AddFlatModal';
import { MyContext } from '../context/ContextProvider';
import { Styles } from '../styles/Flat';
import FlatSortMenu from '../ui/menu/FlatSortMenu';
import { AnimatedScreen } from '../components/AnimatedScreen';

export default function Flat() {
    const { flatData: data, refreshing, onRefresh, orientation, setGradientColor } = useContext(MyContext);
    const [showForm, setShowForm] = useState(false);
    const modalRef = useRef(null);
    const [sortColumn, setSortColumn] = useState('sno');
    const [sortDirection, setSortDirection] = useState({
        sno: 'ascending', name: 'ascending', pno: 'ascending', apartmentname: 'ascending', floorno: 'ascending', flatno: 'ascending',
    });
    const [searchQuery, setSearchQuery] = useState('');
    const { Wrapper } = useFunctions();
    const route = useRoute();
    const navigation = useNavigation();
    const { height, width } = Dimensions.get('window');
    const isPortrait = orientation === 'portrait';
    const styles = Styles({ width, height, isPortrait });

    useFocusEffect(
        useCallback(() => {
            Wrapper(route);
            setGradientColor(['#E84E49', '#F8A634']);
            return;
        }, [])
    );

    const toggleSort = (columnKey) => {
        setSortColumn(columnKey);
        setSortDirection((prev) => ({
            ...prev,
            [columnKey]: prev[columnKey] === 'ascending' ? 'descending' : 'ascending',
        }));
    };

    const sortedData = [...data].sort((a, b) => {
        if (sortColumn === 'sno') {
            return sortDirection.sno === 'ascending' ? 0 : -1;
        } else if (sortColumn === 'name') {
            const nameA = `${a.first_name || ''} ${a.last_name || ''}`.trim().toLowerCase();
            const nameB = `${b.first_name || ''} ${b.last_name || ''}`.trim().toLowerCase();
            return sortDirection.name === 'ascending'
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
        const query = searchQuery.toLowerCase();

        return (
            sno.includes(query) ||
            fullName.includes(query) ||
            phoneNo.includes(query) ||
            floorNo.includes(query) ||
            flatNo.includes(query) ||
            apartmentName.includes(query)
        );
    });

    const groupedData = filteredData?.reduce((acc, item) => {
        const apartmentName = item.apartment_name || 'Unknown';
        if (!acc[apartmentName]) {
            acc[apartmentName] = [];
        }
        acc[apartmentName].push(item);
        return acc;
    }, {}) || {};

    const handleAddFlat = () => {
        if (!showForm) {
            setShowForm(true);
        } else if (modalRef.current && typeof modalRef.current.close === 'function') {
            modalRef.current.close();
        } else {
            setShowForm(false);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <IconButton icon="arrow-left" size={24} color="#fff" onPress={() => navigation.goBack()} iconColor="#fff" />
                <Text style={styles.headerTitle}>Flat Management</Text>
            </View>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={() => onRefresh(setSortDirection)}
                        colors={['#2196F3']}
                    />
                }
            >
                <AnimatedScreen>
                    <TouchableOpacity style={styles.addButton} onPress={() => handleAddFlat()}>
                        <Icon name="plus" size={20} color="#fff" />
                        <Text style={styles.addButtonText}>Add New Flat</Text>
                    </TouchableOpacity>
                    {showForm && (
                        <AddFlatModal ref={modalRef} setShowForm={setShowForm} />
                    )}
                    <View style={styles.searchContainer}>
                        <Searchbar
                            placeholder="Search flats..."
                            placeholderTextColor="#aaa"
                            iconColor="#666"
                            clearIcon="close"
                            elevation={0}
                            inputStyle={styles.searchInput}
                            autoCorrect={true}
                            spellCheck={true}
                            onChangeText={setSearchQuery}
                            value={searchQuery}
                            style={styles.searchBar}
                        />
                        <FlatSortMenu toggleSort={toggleSort} />
                    </View>

                    {/* Flat Cards */}
                    {Object.keys(groupedData).length === 0 ? (
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyText}>
                                {searchQuery ? 'No flats match your search.' : 'No flats found.'}
                            </Text>
                        </View>
                    ) : (
                        <View style={styles.flatCardsContainer}>
                            {filteredData.map((item, index) => (
                                <View key={item.id} style={[styles.flatCard, { width: isPortrait ? '100%' : '48%' }]}>
                                {/* Card Header */}
                                <View style={styles.cardHeader}>
                                    <View style={styles.flatBadge}>
                                        <Text style={styles.flatBadgeText}>#{index + 1}</Text>
                                    </View>
                                    <View style={styles.flatTitleContainer}>
                                        <Text style={styles.flatNumber}>Flat {item.flat_no}</Text>
                                        <View style={styles.floorNumberContainer}>
                                            <Text style={styles.floorNumber}>Floor {item.floor_no}</Text>
                                        </View>
                                    </View>
                                    <TouchableOpacity style={styles.locationButton}>
                                        <Icon name="map-marker-outline" size={50} color="#2196F3" />
                                    </TouchableOpacity>
                                </View>

                                {/* Card Content */}
                                <View style={styles.cardContent}>
                                    <View style={styles.infoRow}>
                                        <Icon name="map-marker-outline" size={16} color="#888" />
                                        <Text style={styles.infoText}>{item.apartment_name}</Text>
                                    </View>
                                    <View style={styles.infoRow}>
                                        <Icon name="account-outline" size={16} color="#888" />
                                        <Text style={styles.infoText}>
                                            {`${item.first_name || ''} ${item.last_name || ''}`.trim()}
                                        </Text>
                                    </View>
                                    <View style={styles.infoRow}>
                                        <Icon name="phone-outline" size={16} color="#888" />
                                        <Text style={styles.infoText}>{item.phone_no}</Text>
                                    </View>
                                    <Text style={styles.dateText}>Added: {new Date(item.date).toLocaleDateString('en-GB') || null}</Text>
                                </View>
                            </View>
                            ))}
                        </View>
                    )}
                </AnimatedScreen>  
            </ScrollView>
        </View>
    );
}