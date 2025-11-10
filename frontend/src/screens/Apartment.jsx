import React, { useCallback, useContext, useState } from 'react';
import { Dimensions, RefreshControl, ScrollView, View, TouchableOpacity } from 'react-native';
import { useFocusEffect, useRoute, useNavigation } from '@react-navigation/native';
import { IconButton, Searchbar, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Styles } from '../styles/Apartment';
import useFunctions from '../hooks/useFunctions';
import { MyContext } from '../context/ContextProvider';
import AddApartmentModal from '../ui/modal/AddApartmentModal';
import DropDownPicker from 'react-native-dropdown-picker';
import { AnimatedScreen } from '../components/AnimatedScreen';
import AlertModal from '../ui/modal/AlertModal';
import EditApartmentModal from '../ui/modal/EditApartmentModal';

export default function Apartment() {
    const { apartmentData, flatData, refreshing, onRefresh, orientation, setGradientColor } = useContext(MyContext);
    const { Wrapper, handleDeleteApartment } = useFunctions();
    const [searchQuery, setSearchQuery] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [selectedApartment, setSelectedApartment] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'S. No.', value: 'sno' },
        { label: 'Name', value: 'name' },
    ]);
    const [sortColumn, setSortColumn] = useState('sno');
    const [sortDirection, setSortDirection] = useState({
        sno: 'descending',
        name: 'ascending',
    });
    const route = useRoute();
    const navigation = useNavigation();
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

    const filteredApartment = apartmentData.map((apt) => {
        const apartmentFlats = flatData.filter(
            (flat) => flat.apartment_name === apt.apartment_name
        );

        const uniqueFloors = [...new Set(apartmentFlats.map(flat => flat.floor_no))];

        return {
            ...apt,
            floors: uniqueFloors.length
        };
    });

    const filteredData = filteredApartment.filter((item) =>
        item.apartment_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sortedData = [...filteredData].sort((a, b) => {
        if (sortColumn === 'sno') {
            return sortDirection.sno === 'ascending' ? -1 : 1;
        } else if (sortColumn === 'name') {
            const nameA = `${a.first_name || ''} ${a.last_name || ''}`.trim().toLowerCase();
            const nameB = `${b.first_name || ''} ${b.last_name || ''}`.trim().toLowerCase();
            return sortDirection.name === 'ascending'
                ? nameA.localeCompare(nameB)
                : nameB.localeCompare(nameA);
        }
        return 0;
    });

    const toggleSort = (columnKey) => {
        setSortColumn(columnKey);
        setSortDirection((prev) => ({
            ...prev,
            [columnKey]: prev[columnKey] === 'ascending' ? 'descending' : 'ascending',
        }));
    };

    const handleValueChange = (selectedValue) => {
        if (selectedValue) {
            toggleSort(selectedValue);
            setValue(null);
        }
    };

    const handleConfirmDelete = (event) => {
        try {
            handleDeleteApartment(event, selectedApartment?.id, setShowAlert);
            setSelectedApartment(null);
        } catch (error) {
            console.error('Error deleting apartment:', error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <IconButton icon="arrow-left" size={24} color="#fff" onPress={() => navigation.goBack()} iconColor="#fff" />
                <Text style={styles.headerTitle}>Apartment Management</Text>
            </View>
            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#6600ff']} />}
            >
                <AnimatedScreen>
                    <TouchableOpacity style={styles.addButton} onPress={() => setShowForm(!showForm)}>
                        <Icon name="plus" size={20} color="#fff" />
                        <Text style={styles.addButtonText}>Add New Apartment</Text>
                    </TouchableOpacity>

                    {showForm && (
                        <AddApartmentModal setShowForm={setShowForm} />
                    )}

                    <View style={styles.searchBarContainer}>
                        <Searchbar
                            placeholder="Search apartments..."
                            placeholderTextColor='#888'
                            icon="magnify"
                            iconColor='#888'
                            clearIcon='close'
                            elevation={0}
                            inputStyle={styles.searchBarInput}
                            autoCorrect={false}
                            spellCheck={false}
                            onChangeText={setSearchQuery}
                            value={searchQuery}
                            style={styles.searchBar}
                        />
                        <DropDownPicker
                            open={open}
                            value={value}
                            items={items}
                            setOpen={setOpen}
                            setValue={setValue}
                            setItems={setItems}
                            onChangeValue={handleValueChange}
                            placeholder="Sort by"
                            placeholderStyle={styles.placeholder}
                            style={styles.dropdown}
                            textStyle={styles.text}
                            dropDownContainerStyle={styles.dropdownContainer}
                            arrowIconStyle={styles.arrowIcon}
                            tickIconStyle={styles.tickIcon}
                            iconContainerStyle={styles.iconContainer}
                            listItemLabelStyle={{ color: '#fff' }}
                            listMode="SCROLLVIEW"
                            scrollViewProps={{
                                nestedScrollEnabled: true,
                            }}
                            zIndex={3000}
                            zIndexInverse={1000}
                        />
                    </View>

                    {sortedData.length === 0 ? (
                        <View style={styles.nodatacontainer}>
                            <Text style={styles.noDataText}>
                                {searchQuery ? 'No apartment match your search.' : 'No apartment found.'}
                            </Text>
                        </View>
                    ) : (
                        <View style={styles.gridContainer}>
                            {sortedData.map((item, index) => (
                                <View key={item.id} style={styles.gridItem}>
                                    <View style={styles.card}>
                                        <View style={styles.cardContent}>
                                            <View style={styles.cardTitleContainer}>
                                                <View style={styles.numberBadge}>
                                                    <Text style={styles.badgeText}>#{index + 1}</Text>
                                                </View>
                                                <Text style={styles.cardTitle}>{item.apartment_name}</Text>
                                            </View>
                                            <View style={styles.cardDetails}>
                                                <View style={styles.cardContent}>
                                                    <Text style={styles.cardDate}>{item.floors} Floors</Text>
                                                    <Text style={styles.cardDate}>
                                                        Added: {item.date ? new Date(item.date).toLocaleDateString('en-GB') : null}
                                                    </Text>
                                                </View>
                                                <View style={styles.iconButtonContainer}>
                                                    <IconButton 
                                                        icon="square-edit-outline" 
                                                        size={20} 
                                                        iconColor="#1E90FF"
                                                        onPress={() => {
                                                            setSelectedApartment(item);
                                                            setShowEditModal(true);
                                                        }}
                                                    />
                                                    <IconButton
                                                        icon="delete"
                                                        size={20}
                                                        iconColor="#FF0000"
                                                        onPress={() => {
                                                            setSelectedApartment(item);
                                                            setShowAlert(true);
                                                        }}
                                                    />
                                                </View>
                                            </View>
                                            <View style={styles.iconButton}>
                                                <Icon name="office-building" size={28} color="#1E90FF" />
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            ))}
                        </View>
                    )}
                    <AlertModal
                        visible={showAlert}
                        onConfirm={(event) => handleConfirmDelete(event)}
                        onCancel={() => {
                            setShowAlert(false);
                            setSelectedApartment(null);
                        }}
                    />
                    <EditApartmentModal 
                        visible={showEditModal}
                        onClose={() => {
                            setShowEditModal(false);
                            setSelectedApartment(null);
                        }}
                        selectedApartment={selectedApartment}
                    />
                </AnimatedScreen>
            </ScrollView>
        </View>
    );
}