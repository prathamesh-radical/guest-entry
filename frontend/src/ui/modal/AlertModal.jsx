import { View, Text, Dimensions, Modal } from 'react-native';
import React, { useContext } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ActivityIndicator, Button } from 'react-native-paper';
import { Styles } from '../../styles/AlertModal';
import { MyContext } from '../../context/ContextProvider';

const AlertModal = ({ visible, onConfirm, onCancel }) => {
    const { orientation, loading } = useContext(MyContext);
    const { height, width } = Dimensions.get('window');
    const isPortrait = orientation === 'portrait';
    const styles = Styles({ width, height, isPortrait });

    if (!visible) return null;

    return (
        <Modal
            transparent={true}
            visible={visible}
            onRequestClose={onCancel}
            animationType='slide'
            statusBarTranslucent
        >
            <View style={styles.blurContainer}>
                <View style={styles.modalContainer}>
                    <View style={styles.modal}>
                        <Icon name="alert-outline" size={50} color="#FF0000" />
                        <Text style={styles.modalTitle}>Are you sure, you want to delete?</Text>
                        <Text style={styles.modalText}>This action cannot be undone.</Text>
                        <View style={styles.modalButtonContainer}>
                            <Button
                                mode="contained"
                                onPress={(event) => onConfirm(event)}
                                style={[styles.modalButton, { backgroundColor: '#00CBA9' }]}
                                icon={!loading && "check-circle-outline"}
                            >
                                {loading ? <ActivityIndicator color="#fff" size="small" /> : 'Confirm'}
                            </Button>
                            <Button
                                mode="contained"
                                onPress={onCancel}
                                style={[styles.modalButton, { backgroundColor: '#FF0000' }]}
                                icon="close-circle-outline"
                            >
                                Cancel
                            </Button>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default AlertModal;