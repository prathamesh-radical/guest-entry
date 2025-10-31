import React, { useContext, forwardRef } from 'react';
import { Text, TextInput, Dimensions, View } from 'react-native';
import { Button } from 'react-native-paper';
import { MyContext } from '../../context/ContextProvider';
import useFunctions from '../../hooks/useFunctions';
import { Styles } from '../../styles/AddApartmentModal';
import LoadingScreen from '../../screens/LoadingScreen';
import { AnimatedModal } from '../../components/AnimatedModal';

const AddApartmentModal = forwardRef(({ setShowForm }, ref) => {
    const { apartment, loading, handleChange, orientation } = useContext(MyContext);
    const { handleAddApartment } = useFunctions();
    const { height, width } = Dimensions.get('window');
    const isPortrait = orientation === 'portrait';
    const styles = Styles({ width, height, isPortrait });

    if(loading) return <LoadingScreen />;

    const onCloseComplete = () => setShowForm(false);

    const Content = ({ onClose }) => (
        <>
            <Text style={styles.modalTitle}>Add New Apartment</Text>
            <Text style={styles.label}>Apartment Name *</Text>
            <TextInput
                style={styles.inputField}
                placeholder="Enter apartment name"
                placeholderTextColor="#aaa"
                value={apartment}
                keyboardType="default"
                onChangeText={(text) => handleChange("apartment")(text)}
            />
            <View style={styles.buttonContainer}>
                <Button
                    children="Add Apartment"
                    mode="contained-tonal"
                    style={[styles.button, { backgroundColor: '#1E90FF' }]}
                    labelStyle={styles.buttonLabelStyle}
                    onPress={(event) => handleAddApartment(event)}
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

export default AddApartmentModal;