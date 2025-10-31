import React, { useContext, useState, forwardRef } from 'react';
import { View, Text, TextInput, Dimensions } from 'react-native';
import { Button } from 'react-native-paper';
import { MyContext } from '../../context/ContextProvider';
import useFunctions from '../../hooks/useFunctions';
import { Styles } from '../../styles/AddFlatModal';
import DropDownPicker from 'react-native-dropdown-picker';
import { AnimatedModal } from '../../components/AnimatedModal';

const AddFlatModal = forwardRef(({ setShowForm }, ref) => {
    const { flatFormData: formData, apartmentData: data, loading, handleChange, value, setValue, orientation } = useContext(MyContext);
    const { handleAddFlat } = useFunctions();
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState(
        data.map((item) => ({ label: item.apartment_name, value: item.apartment_name, key: item.id.toString() })),
    );
    const { height, width } = Dimensions.get('window');
    const isPortrait = orientation === 'portrait';
    const styles = Styles({ width, height, isPortrait });

    if (loading) return <LoadingScreen />;

    const onCloseComplete = () => setShowForm(false);

    const Content = ({ onClose }) => (
        <>
            <Text style={styles.modalTitle}>Add New Flat</Text>
            <View style={styles.nameContainer}>
                <View style={styles.nameFieldContainer}>
                    <Text style={styles.label}>First Name *</Text>
                    <TextInput
                        style={styles.inputField}
                        placeholder="Enter first name"
                        placeholderTextColor="#aaa"
                        value={formData.first_name}
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
                        value={formData.last_name}
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
                    value={formData.phone_no}
                    keyboardType="number-pad"
                    onChangeText={(text) => handleChange("phone_no")(text)}
                />
            </View>
            <View style={styles.nameFieldContainer}>
                <Text style={styles.label}>First Name *</Text>
                <DropDownPicker
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    placeholder="Select Apartment"
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
                    textStyle={{ fontSize: 15 }}
                    onChangeValue={(text) => handleChange("apartment_name")(text)}
                />
            </View>
            <View style={styles.nameContainer}>
                <View style={styles.nameFieldContainer}>
                    <Text style={styles.label}>Floor No *</Text>
                    <TextInput
                        style={styles.inputField}
                        placeholder="1"
                        placeholderTextColor="#aaa"
                        value={formData.floor_no}
                        keyboardType="number-pad"
                        onChangeText={(text) => handleChange("floor_no")(text)}
                    />
                </View>
                <View style={styles.nameFieldContainer}>
                    <Text style={styles.label}>Flat No *</Text>
                    <TextInput
                        style={styles.inputField}
                        placeholder="101"
                        placeholderTextColor="#aaa"
                        value={formData.flat_no}
                        keyboardType="number-pad"
                        onChangeText={(text) => handleChange("flat_no")(text)}
                    />
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    children="Add Flat"
                    mode="contained-tonal"
                    style={[styles.button, { backgroundColor: '#2196F3' }]}
                    labelStyle={styles.buttonLabelStyle}
                    onPress={(event) => handleAddFlat(event)}
                />
                <Button
                    children="Cancel"
                    mode="contained-tonal"
                    style={[styles.button, { backgroundColor: 'transparent', borderWidth: 1, borderColor: '#333' }]}
                    labelStyle={styles.buttonLabelStyle}
                    onPress={() => {
                        if (onClose) onClose();
                    }}
                />
            </View>
        </>
    );

    return (
        <AnimatedModal ref={ref} style={styles.container} onClose={onCloseComplete}>
            <Content />
        </AnimatedModal>
    );
});

export default AddFlatModal;