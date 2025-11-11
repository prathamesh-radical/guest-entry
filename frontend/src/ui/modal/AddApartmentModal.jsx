import React, { useContext } from 'react';
import { Text, TextInput, Dimensions, View } from 'react-native';
import { ActivityIndicator, Button } from 'react-native-paper';
import { MyContext } from '../../context/ContextProvider';
import useFunctions from '../../hooks/useFunctions';
import { Styles } from '../../styles/AddApartmentModal';

export default function AddApartmentModal({ setShowForm }) {
    const { addApartment: formData, loading, handleChange, orientation } = useContext(MyContext);
    const { handleAddApartment } = useFunctions();
    const { height, width } = Dimensions.get('window');
    const isPortrait = orientation === 'portrait';
    const styles = Styles({ width, height, isPortrait });

    return (
        <View style={styles.container}>
            <Text style={styles.modalTitle}>Add New Apartment</Text>
            <Text style={styles.label}>Apartment Name *</Text>
            <TextInput
                style={styles.inputField}
                placeholder="Enter apartment name"
                placeholderTextColor="#aaa"
                value={formData?.apartment_name}
                keyboardType="default"
                onChangeText={(text) => handleChange("apartment_name")(text)}
            />
            <Text style={[styles.label, {marginTop: 15}]}>No. of Floors *</Text>
            <TextInput
                style={styles.inputField}
                placeholder="Enter number of floors"
                placeholderTextColor="#aaa"
                value={formData?.total_floors}
                keyboardType="numeric"
                onChangeText={(text) => handleChange("total_floors")(text)}
            />
            <View style={styles.buttonContainer}>
                <Button
                    children={loading ? <ActivityIndicator color="#fff" size="small" /> : "Add Apartment"}
                    mode="contained-tonal"
                    style={[styles.button, { backgroundColor: '#1E90FF' }]}
                    labelStyle={styles.buttonLabelStyle}
                    onPress={(event) => handleAddApartment(event, setShowForm)}
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