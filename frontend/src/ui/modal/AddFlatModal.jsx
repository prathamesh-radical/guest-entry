import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Dimensions } from 'react-native';
import { ActivityIndicator, Button } from 'react-native-paper';
import { MyContext } from '../../context/ContextProvider';
import useFunctions from '../../hooks/useFunctions';
import { Styles } from '../../styles/AddFlatModal';
import DropDownPicker from 'react-native-dropdown-picker';

export default function AddFlatModal({ setShowForm }) {
    const { flatFormData: formData, apartmentData: data, loading, handleChange, orientation, setFlatFormData } = useContext(MyContext);
    const { handleAddFlat } = useFunctions();
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState(
        data.map((item) => ({ label: item.apartment_name, value: item.apartment_name, key: item.id.toString() })),
    );
    const [openFloor, setOpenFloor] = useState(false);
    const [floorItems, setFloorItems] = useState([]);
    const { height, width } = Dimensions.get('window');
    const isPortrait = orientation === 'portrait';
    const styles = Styles({ width, height, isPortrait });

    const handleApartmentChange = (apartValue) => {
        if (apartValue) {
            const selectedApartment = data.find(item => item.apartment_name === apartValue);
            if (selectedApartment) {
                const totalFloors = selectedApartment.total_floors;
                const newFloorItems = Array.from(
                    { length: totalFloors }, 
                    (_, i) => ({ label: i + 1, value: (i + 1).toString(), key: (i + 1).toString() })
                );
                setFloorItems(newFloorItems);
            }
        }

        setFlatFormData(prev => ({
            ...prev,
            apartment_name: apartValue,
            floor_no: null
        }));
    };

    const handleFloorChange = (floorValue) => {
        setFlatFormData(prev => ({
            ...prev,
            floor_no: floorValue
        }));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.modalTitle}>Add New Flat</Text>
            <View style={styles.nameContainer}>
                <View style={styles.nameFieldContainer}>
                    <Text style={styles.label}>First Name *</Text>
                    <TextInput
                        style={styles.inputField}
                        placeholder="Enter first name"
                        placeholderTextColor="#aaa"
                        value={formData.first_name || ''}
                        keyboardType="default"
                        onChangeText={(text) => handleChange("first_name")(text)}
                    />
                </View>
                <View style={styles.nameFieldContainer}>
                    <Text style={styles.label}>Last Name *</Text>
                    <TextInput
                        style={styles.inputField}
                        placeholder="Enter last name"
                        placeholderTextColor="#aaa"
                        value={formData.last_name || ''}
                        keyboardType="default"
                        onChangeText={(text) => handleChange("last_name")(text)}
                    />
                </View>
            </View>
            <View style={styles.nameFieldContainer}>
                <Text style={styles.label}>Phone Number *</Text>
                <TextInput
                    style={styles.inputField}
                    placeholder="Enter phone number"
                    placeholderTextColor="#aaa"
                    value={formData.phone_no || ''}
                    keyboardType="number-pad"
                    onChangeText={(text) => handleChange("phone_no")(text)}
                />
            </View>
            <View style={styles.nameFieldContainer}>
                <Text style={styles.label}>Apartment Name *</Text>
                <DropDownPicker
                    open={open}
                    value={formData.apartment_name}
                    items={items}
                    setOpen={setOpen}
                    setValue={(callback) => {
                        const apartValue = typeof callback === 'function' ? callback(formData.apartment_name) : callback;
                        handleApartmentChange(apartValue);
                    }}
                    setItems={setItems}
                    placeholder="Select Apartment"
                    placeholderStyle={{ color: "#aaa" }}
                    listMode="SCROLLVIEW"
                    scrollViewProps={{ nestedScrollEnabled: true }}
                    style={styles.dropdownStyle}
                    dropDownContainerStyle={styles.dropDownContainerStyle}
                    arrowIconStyle={{ tintColor: '#aaa' }}
                    listItemLabelStyle={{ fontSize: 15, color: "#fff" }}
                    listItemContainerStyle={{ height: 40 }}
                    textStyle={{ fontSize: 15, color: '#fff' }}
                    tickIconStyle={{ tintColor: '#fff' }}
                />
            </View>
            <View style={styles.nameContainer}>
                <View style={styles.nameFieldContainer}>
                    <Text style={styles.label}>Floor No *</Text>
                    <DropDownPicker
                        open={openFloor}
                        value={formData.floor_no}
                        items={floorItems}
                        setOpen={setOpenFloor}
                        setValue={(callback) => {
                            const floorValue = typeof callback === 'function' ? callback(formData.floor_no) : callback;
                            handleFloorChange(floorValue);
                        }}
                        setItems={setFloorItems}
                        placeholder="Select Floor"
                        placeholderStyle={{ color: "#aaa" }}
                        zIndex={3000}
                        zIndexInverse={1000}
                        listMode="SCROLLVIEW"
                        scrollViewProps={{ nestedScrollEnabled: true }}
                        style={styles.dropdownStyle}
                        dropDownContainerStyle={styles.dropDownContainerStyle}
                        arrowIconStyle={{ tintColor: '#aaa' }}
                        listItemLabelStyle={{ fontSize: 15, color: "#fff" }}
                        listItemContainerStyle={{ height: 40 }}
                        textStyle={{ fontSize: 15, color: '#fff' }}
                        tickIconStyle={{ tintColor: '#fff' }}
                    />
                </View>
                <View style={styles.nameFieldContainer}>
                    <Text style={styles.label}>Flat No *</Text>
                    <TextInput
                        style={styles.inputField}
                        placeholder="101"
                        placeholderTextColor="#aaa"
                        value={formData.flat_no || ''}
                        keyboardType="number-pad"
                        onChangeText={(text) => handleChange("flat_no")(text)}
                    />
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    children={loading ? <ActivityIndicator color="#fff" size="small" /> : "Add Flat"}
                    mode="contained-tonal"
                    style={[styles.button, { backgroundColor: '#2196F3' }]}
                    labelStyle={styles.buttonLabelStyle}
                    onPress={(event) => handleAddFlat(event, setShowForm)}
                />
                <Button
                    children="Cancel"
                    mode="contained-tonal"
                    style={[styles.button, { backgroundColor: 'transparent', borderWidth: 1, borderColor: '#333' }]}
                    labelStyle={styles.buttonLabelStyle}
                    onPress={() => setShowForm(false)}
                />
            </View>
        </View>
    );
}