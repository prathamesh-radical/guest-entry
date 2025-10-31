import React, { useCallback, useContext, useState, useEffect } from 'react';
import { View, TextInput, ScrollView, RefreshControl, Dimensions, Text } from 'react-native';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import useFunctions from '../hooks/useFunctions';
import DropDownPicker from 'react-native-dropdown-picker';
import { MyContext } from '../context/ContextProvider';
import { ActivityIndicator, Button, Icon, IconButton } from 'react-native-paper';
import { Styles } from '../styles/AddVisitors';
import LinearGradient from 'react-native-linear-gradient';
import LoadingScreen from './LoadingScreen';
import { AnimatedScreen } from '../components/AnimatedScreen';

export default function AddVisitors() {
    const {
        visitorFormData: formData, apartmentData, flatData, handleChange, dropdownValues, setDropdownValues, loading, refreshing, onRefresh, setVisitorFormData, orientation, setGradientColor
    } = useContext(MyContext);
    const { Wrapper, handleAddVisitor } = useFunctions();
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
    const { height, width } = Dimensions.get('window');
    const isPortrait = orientation === 'portrait';
    const styles = Styles({ width, height, isPortrait });
    const navigation = useNavigation();

    const filterPerson = flatData.find((item) => (
        item.apartment_name === dropdownValues.apartment && item.floor_no === dropdownValues.floor && item.flat_no === dropdownValues.flat
    ));
    const personName = filterPerson ? `${filterPerson.first_name} ${filterPerson.last_name}` : '';

    useEffect(() => {
        const floorList = flatData.filter((item) => item.apartment_name === dropdownValues.apartment).reduce((unique, item) => {
            return unique.some((floor) => floor.value === item.floor_no) ? unique : [
                ...unique, {
                    label: item.floor_no,
                    value: item.floor_no,
                    key: `${item.apartment_name}-${item.floor_no}`,
                    icon: () => <Icon source="floor-plan" size={24} color="#fff" />
                },
            ];
        }, []);

        const flatList = flatData
            .filter((item) => item.apartment_name === dropdownValues.apartment && item.floor_no === dropdownValues.floor)
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
        setVisitorFormData((prev) => ({
            ...prev,
            apartment_name: dropdownValues.apartment,
            floor_no: dropdownValues.floor,
            flat_no: dropdownValues.flat,
            person_to_meet: personName,
        }));
    }, [dropdownValues.apartment, dropdownValues.floor, flatData, personName]);

    useFocusEffect(
        useCallback(() => {
            Wrapper(route);
            setGradientColor(['#59AC5E', '#3BADA0']);
            return;
        }, [])
    );

    if (loading) return <LoadingScreen />;

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.headerContainer}>
                <IconButton icon="arrow-left" size={24} color="#fff" onPress={() => navigation.goBack()} iconColor="#fff" />
                <View style={styles.headerContent}>
                    <Text style={styles.headerTitle}>New Visitor Entry</Text>
                    <Text style={styles.headerSubtitle}>Register a new visitor securely</Text>
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

                        <Text style={styles.fieldLabel}>First Name *</Text>
                        <TextInput
                            style={styles.inputField}
                            placeholder="Enter visitor's first name*"
                            placeholderTextColor="#aaa"
                            value={formData.first_name}
                            keyboardType="default"
                            onChangeText={(text) => handleChange("first_name")(text)}
                        />

                        <Text style={styles.fieldLabel}>Last Name *</Text>
                        <TextInput
                            style={styles.inputField}
                            placeholder="Enter visitor's last name*"
                            placeholderTextColor="#aaa"
                            value={formData.last_name}
                            keyboardType="default"
                            onChangeText={(text) => handleChange("last_name")(text)}
                        />

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
                            placeholder="Visitor's address (optional)"
                            placeholderTextColor="#888"
                            value={formData.address}
                            keyboardType="default"
                            onChangeText={(text) => handleChange("address")(text)}
                            multiline={true}
                            numberOfLines={4}
                            textAlignVertical="top"
                        />
                    </View>

                    {/* Vehicle Details Section */}
                    <View style={styles.sectionContainer}>
                        <View style={styles.sectionHeader}>
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
                        </View>
                    </View>

                    {/* Visit Information Section */}
                    <View style={styles.sectionContainer}>
                        <View style={styles.sectionHeader}>
                            <View style={[styles.sectionDot, { backgroundColor: '#D133AB' }]} />
                            <Text style={styles.sectionTitle}>Visit Information</Text>
                        </View>

                        <Text style={styles.fieldLabel}>Select Building *</Text>
                        <DropDownPicker
                            open={open.apartment}
                            value={dropdownValues.apartment}
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

                        <Text style={styles.fieldLabel}>Select Floor No.*</Text>
                        <DropDownPicker
                            open={open.floor}
                            value={dropdownValues.floor}
                            items={items.floor}
                            setOpen={() => setOpen((prev) => ({ ...prev, floor: !prev.floor }))}
                            setValue={(callback) => setDropdownValues((prev) => ({ ...prev, floor: callback(prev.floor) }))}
                            setItems={(newItems) => setItems((prev) => ({ ...prev, floor: newItems }))}
                            placeholder="Select Floor No.*"
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

                        <Text style={styles.fieldLabel}>Select Flat *</Text>
                        <DropDownPicker
                            open={open.flat}
                            value={dropdownValues.flat}
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

                        <Text style={styles.fieldLabel}>Person to Meet *</Text>
                        <TextInput
                            style={styles.inputField}
                            placeholder="Name of person to visit"
                            placeholderTextColor="#888"
                            value={formData.person_to_meet}
                            keyboardType="default"
                            onChangeText={(text) => handleChange("person_to_meet")(text)}
                            editable={true}
                        />
                    </View>

                    {/* Submit Button */}
                    <LinearGradient
                        colors={['#43A049', '#27A697']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.buttonContainer}
                    >
                        <Button
                            mode="contained"
                            style={styles.submitButton}
                            labelStyle={styles.submitButtonLabel}
                            onPress={(event) => handleAddVisitor(event)}
                            icon={() => <Icon source="floppy" size={20} color="#fff" />}
                        >
                            Register Visitor Entry
                        </Button>
                    </LinearGradient>
                </AnimatedScreen>
            </ScrollView>
        </View>
    );
}