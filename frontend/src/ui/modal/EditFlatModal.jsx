import React, { useContext, useEffect, useState } from 'react';
import { Text, TextInput, Dimensions, View, Modal, ScrollView } from 'react-native';
import { ActivityIndicator, Button } from 'react-native-paper';
import { MyContext } from '../../context/ContextProvider';
import useFunctions from '../../hooks/useFunctions';
import { Styles } from '../../styles/EditApartment';
import DropDownPicker from 'react-native-dropdown-picker';

export default function EditFlatModal({ visible, onClose, selectedFlat }) {
    const { updateFlatFormData: formData, loading, handleChange, orientation, apartmentData, setUpdateFlatFormData } = useContext(MyContext);
    const { handleUpdateFlat } = useFunctions();
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([]);
    const { height, width } = Dimensions.get('window');
    const isPortrait = orientation === 'portrait';
    const styles = Styles({ width, height, isPortrait });

    useEffect(() => {
        if (selectedFlat && visible) {
            setUpdateFlatFormData((prev) => ({
                ...prev,
                first_name: selectedFlat.first_name,
                last_name: selectedFlat.last_name,
                phone_no: selectedFlat.phone_no,
                apartment_name: selectedFlat.apartment_name,
                floor_no: selectedFlat.floor_no?.toString(),
                flat_no: selectedFlat.flat_no?.toString(),
            }));
        }
    }, [selectedFlat, visible]);

    useEffect(() => {
        if (apartmentData) {
            setItems(apartmentData.map(apt => ({
                label: apt.apartment_name,
                value: apt.apartment_name
            })));
        }
    }, [apartmentData]);

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="slide"
            onRequestClose={onClose}
            statusBarTranslucent
        >
            <ScrollView contentContainerStyle={styles.blurContainer}>
                <View style={styles.modalContainer}>
                    <View style={styles.modal}>
                        <Text style={styles.modalTitle}>Edit Flat</Text>
                        <View style={styles.nameContainer}>
                            <View style={[styles.nameFieldContainer, { width: "47%"}]}>
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
                            <View style={[styles.nameFieldContainer, { width: "47%"}]}>
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
                            <Text style={[styles.label, { marginTop: 20}]}>Phone Number *</Text>
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
                            <Text style={[styles.label, { marginTop: 20}]}>Apartment Name *</Text>
                            <DropDownPicker
                                open={open}
                                value={formData.apartment_name}
                                items={items}
                                setOpen={setOpen}
                                setValue={(callbackOrValue) => {
                                    const resolved = typeof callbackOrValue === 'function'
                                        ? callbackOrValue(formData.apartment_name)
                                        : callbackOrValue;
                                    handleChange('apartment_name')(resolved);
                                }}
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
                                textStyle={{ fontSize: 15, color: '#fff' }}
                                tickIconStyle={{ tintColor: '#fff' }}
                            />
                        </View>
                        <View style={[styles.nameContainer, { marginTop: 5 }]}>
                            <View style={[styles.nameFieldContainer, { width: "47%"}]}>
                                <Text style={styles.label}>Floor No *</Text>
                                <TextInput
                                    style={[styles.inputField, { paddingHorizontal: 12 }]}
                                    placeholder="1"
                                    placeholderTextColor="#aaa"
                                    value={formData.floor_no || ''}
                                    keyboardType="number-pad"
                                    onChangeText={(text) => handleChange("floor_no")(text)}
                                    inputMode='numeric'
                                />
                            </View>
                            <View style={[styles.nameFieldContainer, { width: "47%"}]}>
                                <Text style={styles.label}>Flat No *</Text>
                                <TextInput
                                    style={[styles.inputField, { paddingHorizontal: 12 }]}
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
                                children={loading ? <ActivityIndicator color="#fff" size="small" /> : "Update"}
                                mode="contained-tonal"
                                style={[styles.button, { backgroundColor: '#1E90FF' }]}
                                labelStyle={styles.buttonLabelStyle}
                                onPress={(event) => handleUpdateFlat(event, selectedFlat.id, onClose)}
                            />
                            <Button
                                children="Cancel"
                                mode="contained-tonal"
                                style={[styles.button, { backgroundColor: 'transparent', borderWidth: 1, borderColor: '#333' }]}
                                labelStyle={styles.buttonLabelStyle}
                                onPress={onClose}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </Modal>
    );
}