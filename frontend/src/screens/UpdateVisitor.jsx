import React, { useCallback, useContext, useState, useEffect } from 'react';
import { View, TextInput, ScrollView, RefreshControl, Dimensions, Text } from 'react-native';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import useFunctions from '../hooks/useFunctions';
import DropDownPicker from 'react-native-dropdown-picker';
import { MyContext } from '../context/ContextProvider';
import { Button, Icon, IconButton, Switch } from 'react-native-paper';
import { Styles } from '../styles/AddVisitors';
import LinearGradient from 'react-native-linear-gradient';
import LoadingScreen from './LoadingScreen';
import { AnimatedScreen } from '../components/AnimatedScreen';

export default function UpdateVisitor() {
    const {
        updateVisitorFormData: formData, apartmentData, flatData, handleChange, dropdownValues, setDropdownValues, loading, refreshing, onRefresh, setUpdateVisitorFormData, orientation, setGradientColor, onUpdateToggleSwitch
    } = useContext(MyContext);
    const { Wrapper, handleUpdateVisitor } = useFunctions();
    const route = useRoute();
    const [open, setOpen] = useState({ vehicle_type: false, apartment: false, floor: false, flat: false });
    const [items, setItems] = useState({
        vehicle_type: [
            { label: "Walking", value: "Walking", icon: () => <Icon source="walk" size={24} color="#fff" /> },
            { label: "Cycle", value: "Cycle", icon: () => <Icon source="bike" size={24} color="#fff" /> },
            { label: "Bike", value: "Bike", icon: () => <Icon source="motorbike" size={24} color="#fff" /> },
            { label: "Car", value: "Car", icon: () => <Icon source="car" size={24} color="#fff" /> },
        ],
        apartment: apartmentData.map((item) => ({
            label: item.apartment_name, value: item.apartment_name, key: item.id.toString(), icon: () => <Icon source="office-building-outline" size={24} color="#fff" />
        })),
        floor: [],
        flat: [],
    });
    const navigation = useNavigation();
    const { height, width } = Dimensions.get('window');
    const isPortrait = orientation === 'portrait';
    const styles = Styles({ width, height, isPortrait });
    const selectedData = route.params.item;
    const filterPerson = flatData.find((item) => (
        item.apartment_name === (selectedData?.apartment_name || dropdownValues.apartment) &&
        String(item.floor_no) === String(selectedData?.floor_no || dropdownValues.floor) &&
        String(item.flat_no) === String(selectedData?.flat_no || dropdownValues.flat)
    ));
    const personName = selectedData?.person_to_meet || (filterPerson ? `${filterPerson.first_name || ''} ${filterPerson.last_name || ''}`.trim() : '');
    const displayApartment = dropdownValues.apartment ?? selectedData?.apartment_name ?? null;
    const displayFloor = dropdownValues.floor ?? selectedData?.floor_no ?? null;
    const displayFlat = dropdownValues.flat ?? selectedData?.flat_no ?? null;

    useFocusEffect(
        useCallback(() => {
            Wrapper(route);
            setGradientColor(['#635DFF', '#9715FA']);
            return;
        }, [])
    );

    useEffect(() => {
        const apartmentToUse = selectedData?.apartment_name || dropdownValues.apartment;
        const floorToUse = selectedData?.floor_no || dropdownValues.floor;

        const floorList = flatData
            .filter((item) => item.apartment_name === apartmentToUse)
            .reduce((unique, item) => {
                return unique.some((floor) => String(floor.value) === String(item.floor_no))
                    ? unique
                    : [
                        ...unique,
                        {
                            label: item.floor_no,
                            value: item.floor_no,
                            key: `${item.apartment_name}-${item.floor_no}`,
                            icon: () => <Icon source="floor-plan" size={24} color="#fff" />
                        },
                    ];
            }, []);

        const flatList = flatData
            .filter((item) => item.apartment_name === apartmentToUse && item.floor_no === floorToUse)
            .map((item) => ({
                label: item.flat_no,
                value: item.flat_no,
                key: `${item.apartment_name}-${item.floor_no}-${item.flat_no}`,
                icon: () => <Icon source="home-outline" size={24} color="#fff" />,
            }));

        setItems((prev) => ({
            ...prev,
            floor: floorList,
            flat: flatList,
        }));
    }, [selectedData, flatData, dropdownValues.apartment, dropdownValues.floor]);

    useEffect(() => {
        if (selectedData) {
            setDropdownValues((prev) => ({
                ...prev,
                vehicle_type: selectedData.vehicle_type ?? prev.vehicle_type,
                apartment: selectedData.apartment_name ?? prev.apartment,
                floor: selectedData.floor_no ?? prev.floor,
                flat: selectedData.flat_no ?? prev.flat,
            }));

            setUpdateVisitorFormData((prev) => ({
                ...prev,
                first_name: selectedData?.first_name ?? prev.first_name,
                last_name: selectedData?.last_name ?? prev.last_name,
                phone_no: selectedData?.phone_no ?? prev.phone_no,
                address: selectedData?.address ?? prev.address,
                isActive: selectedData?.is_active ?? prev.is_active,
                vehicle_type: selectedData?.vehicle_type ?? prev.vehicle_type,
                vehicle_no: selectedData?.vehicle_no ?? prev.vehicle_no,
                apartment_name: selectedData?.apartment_name ?? prev.apartment_name,
                floor_no: selectedData?.floor_no ?? prev.floor_no,
                flat_no: selectedData?.flat_no ?? prev.flat_no,
                person_to_meet: selectedData?.person_to_meet ?? personName ?? prev.person_to_meet,
            }));
        }
    }, [selectedData]);

    useEffect(() => {
        const selectedApartment = dropdownValues.apartment;
        const selectedFloor = dropdownValues.floor;

        const floorList = flatData
            .filter((item) => item.apartment_name === selectedApartment)
            .reduce((unique, item) => {
                return unique.some((floor) => floor.value === item.floor_no)
                    ? unique
                    : [
                        ...unique,
                        {
                            label: item.floor_no,
                            value: item.floor_no,
                            key: `${item.apartment_name}-${item.floor_no}`,
                            icon: () => <Icon source="floor-plan" size={24} color="#fff" />
                        },
                    ];
            }, []);

        const flatList = flatData
            .filter((item) => item.apartment_name === selectedApartment && item.floor_no === selectedFloor)
            .map((item) => ({
                label: item.flat_no,
                value: item.flat_no,
                key: `${item.apartment_name}-${item.floor_no}-${item.flat_no}`,
                icon: () => <Icon source="home-outline" size={24} color="#fff" />,
            }));

        setItems((prev) => ({
            ...prev,
            floor: floorList,
            flat: flatList,
        }));
    }, [dropdownValues.apartment, dropdownValues.floor, flatData]);

    useEffect(() => {
        const apt = dropdownValues.apartment ?? selectedData?.apartment_name;
        const fl = dropdownValues.floor ?? selectedData?.floor_no;
        const ft = dropdownValues.flat ?? selectedData?.flat_no;

        if (!apt || fl == null || ft == null) return;

        const match = flatData.find((item) => (
            item.apartment_name === apt &&
            String(item.floor_no) === String(fl) &&
            String(item.flat_no) === String(ft)
        ));

        if (match) {
            const name = `${match.first_name || ''} ${match.last_name || ''}`.trim();
            if (name) {
                setUpdateVisitorFormData((prev) => ({ ...prev, person_to_meet: name }));
            }
        }
    }, [dropdownValues.apartment, dropdownValues.floor, dropdownValues.flat, flatData, selectedData, setUpdateVisitorFormData]);

    if (loading) return <LoadingScreen />;

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.headerContainer}>
                <IconButton icon="arrow-left" size={24} color="#fff" onPress={() => navigation.goBack()} iconColor="#fff" />
                <View style={styles.headerContent}>
                    <Text style={styles.headerTitle}>Update Visitor Entry</Text>
                    <Text style={styles.headerSubtitle}>Update visitor information securely</Text>
                </View>
            </View>
            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#6600ff']} />}
            >
                <AnimatedScreen>
                    <View style={styles.sectionContainer}>
                        <View style={styles.sectionHeader}>
                            <View style={styles.sectionDot} />
                            <Text style={styles.sectionTitle}>Visitor Information</Text>
                        </View>

                        <View style={styles.nameRow}>
                            <View style={styles.nameContain}>
                                <Text style={styles.fieldLabel}>First Name *</Text>
                                <TextInput
                                    style={styles.inputField}
                                    placeholder="Enter first name"
                                    placeholderTextColor="#aaa"
                                    value={formData.first_name}
                                    keyboardType="default"
                                    onChangeText={(text) => handleChange("first_name")(text)}
                                />
                            </View>
                            <View style={styles.nameContain}>
                                <Text style={styles.fieldLabel}>Last Name *</Text>
                                <TextInput
                                    style={styles.inputField}
                                    placeholder="Enter last name"
                                    placeholderTextColor="#aaa"
                                    value={formData.last_name}
                                    keyboardType="default"
                                    onChangeText={(text) => handleChange("last_name")(text)}
                                />
                            </View>
                        </View>

                        <Text style={styles.fieldLabel}>Phone Number *</Text>
                        <TextInput
                            style={styles.inputField}
                            placeholder="Enter contact number"
                            placeholderTextColor="#888"
                            value={formData.phone_no}
                            keyboardType="number-pad"
                            onChangeText={(text) => handleChange("phone_no")(text)}
                        />

                        <Text style={styles.fieldLabel}>Address *</Text>
                        <TextInput
                            style={[styles.inputField, styles.textArea]}
                            placeholder="Visitor's address"
                            placeholderTextColor="#888"
                            value={formData.address}
                            keyboardType="default"
                            onChangeText={(text) => handleChange("address")(text)}
                            multiline={true}
                            numberOfLines={4}
                            textAlignVertical="top"
                        />

                        {/* Visitor Status */}
                        <View style={[styles.sectionHeader, { marginTop: 15 }]}>
                            <View style={[styles.sectionDot, { backgroundColor: '#9715FA' }]} />
                            <Text style={styles.sectionTitle}>Visitor Status</Text>
                        </View>

                        <View style={styles.vehicleRow}>
                            <Text style={styles.fieldLabel}>Is Active? *</Text>
                            <Switch color='#4dff94' value={!!formData?.isActive} onValueChange={onUpdateToggleSwitch} />
                        </View>

                        {/* Vehicle Details Section */}
                        <View style={[styles.sectionHeader, { marginTop: 20 }]}>
                            <View style={[styles.sectionDot, { backgroundColor: '#4A90E2' }]} />
                            <Text style={styles.sectionTitle}>Vehicle Details</Text>
                        </View>

                        <View style={styles.vehicleRow}>
                            <View style={styles.vehicleTypeContainer}>
                                <Text style={styles.fieldLabel}>Vehicle Type *</Text>
                                <DropDownPicker
                                    open={open.vehicle_type}
                                    value={dropdownValues.vehicle_type}
                                    items={items.vehicle_type}
                                    setOpen={() => setOpen((prev) => ({ ...prev, vehicle_type: !prev.vehicle_type }))}
                                    setValue={(callback) => setDropdownValues((prev) => ({ ...prev, vehicle_type: callback(prev.vehicle_type) }))}
                                    setItems={(newItems) => setItems((prev) => ({ ...prev, vehicle_type: newItems }))}
                                    placeholder="Select type"
                                    placeholderStyle={{ color: "#888" }}
                                    zIndex={4000}
                                    zIndexInverse={1000}
                                    listMode="SCROLLVIEW"
                                    scrollViewProps={{ nestedScrollEnabled: true }}
                                    style={styles.dropdownStyle}
                                    dropDownContainerStyle={styles.dropDownContainerStyle}
                                    arrowIconStyle={{ tintColor: '#888' }}
                                    listItemLabelStyle={{ fontSize: 15, color: '#fff' }}
                                    listItemContainerStyle={{ height: 40 }}
                                    textStyle={{ fontSize: 15, color: '#fff' }}
                                    tickIconStyle={{ tintColor: '#fff' }}
                                    onChangeValue={(value) => handleChange("vehicle_type")(value)}
                                />
                            </View>
                            {(formData?.vehicle_type === "Car" || formData?.vehicle_type === "Bike") && (
                                <View style={styles.nameContain}>
                                    <Text style={styles.fieldLabel}>Vehicle Number *</Text>
                                    <TextInput
                                        style={styles.inputField}
                                        placeholder="Enter vehicle no"
                                        placeholderTextColor="#888"
                                        value={formData.vehicle_no}
                                        keyboardType="default"
                                        onChangeText={(text) => handleChange("vehicle_no")(text)}
                                    />
                                </View>
                            )}
                        </View>

                        {/* Visit Information Section */}
                        <View style={[styles.sectionHeader, { marginTop: 15 }]}>
                            <View style={[styles.sectionDot, { backgroundColor: '#D133AB' }]} />
                            <Text style={styles.sectionTitle}>Visit Information</Text>
                        </View>

                        <Text style={styles.fieldLabel}>Select Building *</Text>
                        <DropDownPicker
                            open={open.apartment}
                            value={displayApartment}
                            items={items.apartment}
                            setOpen={() => setOpen((prev) => ({ ...prev, apartment: !prev.apartment }))}
                            setValue={(callback) => setDropdownValues((prev) => ({ ...prev, apartment: callback(prev.apartment) }))}
                            setItems={(newItems) => setItems((prev) => ({ ...prev, apartment: newItems }))}
                            placeholder="Choose building"
                            placeholderStyle={{ color: "#888" }}
                            zIndex={3000}
                            zIndexInverse={2000}
                            listMode="SCROLLVIEW"
                            scrollViewProps={{ nestedScrollEnabled: true }}
                            style={styles.dropdownStyle}
                            dropDownContainerStyle={styles.dropDownContainerStyle}
                            arrowIconStyle={{ tintColor: '#888' }}
                            listItemLabelStyle={{ fontSize: 15, color: '#fff' }}
                            listItemContainerStyle={{ height: 40 }}
                            textStyle={{ fontSize: 15, color: '#fff' }}
                            tickIconStyle={{ tintColor: '#fff' }}
                            onChangeValue={(value) => handleChange("apartment_name")(value)}
                        />

                        <View style={styles.nameRow}>
                            <View style={styles.nameContain}>
                                <Text style={styles.fieldLabel}>Select Floor No.*</Text>
                                <DropDownPicker
                                    open={open.floor}
                                    value={displayFloor}
                                    items={items.floor}
                                    setOpen={() => setOpen((prev) => ({ ...prev, floor: !prev.floor }))}
                                    setValue={(callback) => setDropdownValues((prev) => ({ ...prev, floor: callback(prev.floor) }))}
                                    setItems={(newItems) => setItems((prev) => ({ ...prev, floor: newItems }))}
                                    placeholder="Select Floor"
                                    placeholderStyle={{ color: "#888" }}
                                    zIndex={2000}
                                    zIndexInverse={3000}
                                    listMode="SCROLLVIEW"
                                    scrollViewProps={{ nestedScrollEnabled: true }}
                                    style={styles.dropdownStyle}
                                    dropDownContainerStyle={styles.dropDownContainerStyle}
                                    arrowIconStyle={{ tintColor: '#888' }}
                                    listItemLabelStyle={{ fontSize: 15, color: '#fff' }}
                                    listItemContainerStyle={{ height: 40 }}
                                    textStyle={{ fontSize: 15, color: '#fff' }}
                                    tickIconStyle={{ tintColor: '#fff' }}
                                    onChangeValue={(value) => handleChange("floor_no")(value)}
                                />
                            </View>
                            <View style={styles.nameContain}>
                                <Text style={styles.fieldLabel}>Select Flat *</Text>
                                <DropDownPicker
                                    open={open.flat}
                                    value={displayFlat}
                                    items={items.flat}
                                    setOpen={() => setOpen((prev) => ({ ...prev, flat: !prev.flat }))}
                                    setValue={(callback) => setDropdownValues((prev) => ({ ...prev, flat: callback(prev.flat) }))}
                                    setItems={(newItems) => setItems((prev) => ({ ...prev, flat: newItems }))}
                                    placeholder="Choose Flat"
                                    placeholderStyle={{ color: "#888" }}
                                    zIndex={1000}
                                    zIndexInverse={4000}
                                    listMode="SCROLLVIEW"
                                    scrollViewProps={{ nestedScrollEnabled: true }}
                                    style={styles.dropdownStyle}
                                    dropDownContainerStyle={styles.dropDownContainerStyle}
                                    arrowIconStyle={{ tintColor: '#888' }}
                                    listItemLabelStyle={{ fontSize: 15, color: '#fff' }}
                                    listItemContainerStyle={{ height: 40 }}
                                    textStyle={{ fontSize: 15, color: '#fff' }}
                                    tickIconStyle={{ tintColor: '#fff' }}
                                    onChangeValue={(value) => handleChange("flat_no")(value)}
                                />
                            </View>
                        </View>

                        <Text style={styles.fieldLabel}>Person to Meet *</Text>
                        <TextInput
                            style={[styles.inputField, { backgroundColor: '#262626', color: "#888" }]}
                            placeholder="Name of person to visit"
                            placeholderTextColor="#888"
                            value={formData.person_to_meet}
                            keyboardType="default"
                            onChangeText={(text) => handleChange("person_to_meet")(text)}
                            editable={true}
                        />

                        {/* Submit Button */}
                        <LinearGradient
                            colors={['#635DFF', '#9715FA']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.buttonContainer}
                        >
                            <Button
                                mode="contained"
                                style={styles.submitButton}
                                labelStyle={styles.submitButtonLabel}
                                onPress={() => handleUpdateVisitor({ preventDefault: () => { } }, selectedData.id)}
                                icon={() => <Icon source="square-edit-outline" size={20} color="#fff" />}
                            >
                                Update Visitor Entry
                            </Button>
                        </LinearGradient>
                    </View>
                </AnimatedScreen>
            </ScrollView>
        </View>
    );
}