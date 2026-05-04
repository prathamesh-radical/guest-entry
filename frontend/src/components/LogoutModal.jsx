import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Modal, Portal, Button, Icon } from 'react-native-paper';

const LogoutModal = ({ visible, onDismiss, onConfirm }) => {
    return (
        <Portal>
            <Modal
                visible={visible}
                onDismiss={onDismiss}
                contentContainerStyle={styles.modalCard}
            >
                <View style={styles.iconCircle}>
                    <Icon source="logout" size={35} color="#E84E49" />
                </View>

                <Text style={styles.title}>Confirm Logout</Text>
                <Text style={styles.subtitle}>
                    Are you sure you want to sign out of your account?
                </Text>

                <View style={styles.actions}>
                    <Button 
                        mode="outlined" 
                        onPress={onDismiss} 
                        style={styles.cancelBtn}
                        labelStyle={{ color: '#aaa' }}
                    >
                        Stay
                    </Button>
                    <Button 
                        mode="contained" 
                        onPress={onConfirm} 
                        style={styles.logoutBtn}
                        labelStyle={{ fontWeight: 'bold', color: '#fff' }}
                    >
                        Logout
                    </Button>
                </View>
            </Modal>
        </Portal>
    );
};

const styles = StyleSheet.create({
    modalCard: {
        backgroundColor: '#1c222a',
        margin: 30,
        padding: 25,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: '#303841',
        alignItems: 'center',
    },
    iconCircle: {
        width: 70,
        height: 70,
        backgroundColor: 'rgba(232, 78, 73, 0.1)',
        borderRadius: 35,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 14,
        color: '#888',
        textAlign: 'center',
        marginTop: 8,
        marginBottom: 25,
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
    logoutBtn: {
        flex: 1,
        backgroundColor: '#E84E49',
        borderRadius: 12,
    }
});

export default LogoutModal;