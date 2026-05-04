import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Modal, Portal, Button, Icon, Divider } from 'react-native-paper';

const FinalDeleteConfirmationModal = ({ visible, onDismiss, onConfirm, loading }) => {
    return (
        <Portal>
            <Modal
                visible={visible}
                onDismiss={onDismiss}
                contentContainerStyle={confirmStyles.modalCard}
            >
                <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
                    <View style={confirmStyles.content}>
                        {/* Warning Icon */}
                        <View style={confirmStyles.iconCircle}>
                            <Icon source="alert-circle-outline" size={45} color="#FF5252" />
                        </View>

                        <Text style={confirmStyles.title}>Are you absolutely sure?</Text>
                        
                        <View style={confirmStyles.warningBox}>
                            <Text style={confirmStyles.warningText}>
                                This action is irreversible. All your visitors data, settings, and profile information will be deleted forever.
                            </Text>
                        </View>

                        <View style={confirmStyles.detailsContainer}>
                            <View style={confirmStyles.bulletItem}>
                                <Icon source="close-circle-outline" size={18} color="#FF8A80" />
                                <Text style={confirmStyles.detailText}>You will lose access to this account immediately.</Text>
                            </View>
                            <View style={confirmStyles.bulletItem}>
                                <Icon source="close-circle-outline" size={18} color="#FF8A80" />
                                <Text style={confirmStyles.detailText}>All history and reports will be wiped out.</Text>
                            </View>
                        </View>

                        <Divider style={confirmStyles.divider} />

                        <View style={confirmStyles.actions}>
                            <Button 
                                mode="outlined" 
                                onPress={onDismiss} 
                                style={confirmStyles.cancelBtn}
                                labelStyle={{ color: '#aaa' }}
                            >
                                No, Keep Account
                            </Button>
                            <Button 
                                mode="contained" 
                                loading={loading}
                                onPress={onConfirm} 
                                style={confirmStyles.deleteBtn}
                                labelStyle={{ fontWeight: 'bold', color: '#fff' }}
                            >
                                Yes, Delete
                            </Button>
                        </View>
                    </View>
                </ScrollView>
            </Modal>
        </Portal>
    );
};

const confirmStyles = StyleSheet.create({
    modalCard: {
        backgroundColor: '#1c222a',
        margin: 20,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: '#4D1A1A',
        maxHeight: '80%',
        overflow: 'hidden',
    },
    content: {
        padding: 25,
        alignItems: 'center',
    },
    iconCircle: {
        width: 80,
        height: 80,
        backgroundColor: 'rgba(255, 82, 82, 0.1)',
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        marginBottom: 15,
    },
    warningBox: {
        backgroundColor: 'rgba(255, 82, 82, 0.05)',
        padding: 15,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(255, 82, 82, 0.2)',
        marginBottom: 20,
    },
    warningText: {
        color: '#FF8A80',
        textAlign: 'center',
        fontSize: 14,
        lineHeight: 20,
        fontWeight: '500',
    },
    detailsContainer: {
        width: '100%',
        gap: 12,
        marginBottom: 10,
    },
    bulletItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    detailText: {
        color: '#B0BEC5',
        fontSize: 13,
        flex: 1,
    },
    divider: {
        width: '100%',
        height: 1,
        backgroundColor: '#303841',
        marginVertical: 20,
    },
    actions: {
        flexDirection: 'row',
        gap: 12,
    },
    cancelBtn: {
        flex: 1,
        borderColor: '#444',
        borderRadius: 12,
    },
    deleteBtn: {
        flex: 1,
        backgroundColor: '#EE4242',
        borderRadius: 12,
    }
});

export default FinalDeleteConfirmationModal;