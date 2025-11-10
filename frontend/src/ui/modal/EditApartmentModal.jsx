import React, { useContext, useEffect } from 'react';
import { Text, TextInput, Dimensions, View, Modal } from 'react-native';
import { ActivityIndicator, Button } from 'react-native-paper';
import { MyContext } from '../../context/ContextProvider';
import useFunctions from '../../hooks/useFunctions';
import { Styles } from '../../styles/EditApartment';

export default function EditApartmentModal({ visible, onClose, selectedApartment }) {
    const { updateApartment, loading, handleChange, orientation, setUpdateApartment } = useContext(MyContext);
    const { handleUpdateApartment } = useFunctions();
    const { height, width } = Dimensions.get('window');
    const isPortrait = orientation === 'portrait';
    const styles = Styles({ width, height, isPortrait });

    useEffect(() => {
        setUpdateApartment(selectedApartment?.apartment_name);
    }, [selectedApartment]);

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="slide"
            onRequestClose={onClose}
            statusBarTranslucent
        >
            <View style={styles.blurContainer}>
                <View style={styles.modalContainer}>
                    <View style={styles.modal}>
                        <Text style={styles.modalTitle}>Edit Apartment Name</Text>
                        <Text style={styles.label}>Apartment Name *</Text>
                        <TextInput
                            style={styles.inputField}
                            placeholder="Enter apartment name"
                            placeholderTextColor="#aaa"
                            value={updateApartment}
                            keyboardType="default"
                            onChangeText={(text) => handleChange("updateApartment")(text)}
                        />
                        <View style={styles.buttonContainer}>
                            <Button
                                children={loading ? <ActivityIndicator color="#fff" size="small" /> : "Update"}
                                mode="contained-tonal"
                                style={[styles.button, { backgroundColor: '#1E90FF' }]}
                                labelStyle={styles.buttonLabelStyle}
                                onPress={(event) => handleUpdateApartment(event, selectedApartment.id, onClose)}
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
            </View>
        </Modal>
    );
}