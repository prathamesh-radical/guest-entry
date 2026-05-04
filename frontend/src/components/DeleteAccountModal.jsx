import React, { useContext, useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Modal, Portal, Button, IconButton, Icon } from 'react-native-paper';
import { MyContext } from '../context/ContextProvider';

const DeleteAccountModal = ({ visible, onDismiss, onConfirm, loading }) => {
    const { verifyPassword, handleChange } = useContext(MyContext);
    const [secureText, setSecureText] = useState({ pass: true, confirm: true });

    const handleClose = () => {
        onDismiss();
    };

    const handleVerify = (event) => {
        onConfirm(event);
    };

    return (
        <Portal>
            <Modal
                visible={visible}
                onDismiss={handleClose}
                contentContainerStyle={modalStyles.modalCard}
            >
                {/* KeyboardAvoidingView ensure karta hai ki keyboard inputs ko na chhupaye */}
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={{ flexShrink: 1 }}
                >
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={modalStyles.scrollContent}
                        bounces={false}
                    >
                        {/* Security Icon */}
                        <View style={modalStyles.iconCircle}>
                            <Icon source="shield-key-outline" size={40} color="#1E88E5" />
                        </View>

                        <Text style={modalStyles.title}>Security Verification</Text>
                        <Text style={modalStyles.subtitle}>
                            To continue with account deletion, please verify your identity by entering your password.
                        </Text>

                        <View style={modalStyles.form}>
                            <Text style={modalStyles.label}>Current Password</Text>
                            <View style={modalStyles.inputWrapper}>
                                <Icon source="lock-outline" size={20} color="#1E88E5" />
                                <TextInput
                                    style={modalStyles.input}
                                    value={verifyPassword?.password || ''}
                                    onChangeText={(val) => handleChange('password')(val)}
                                    placeholder="Enter password"
                                    placeholderTextColor="#666"
                                    secureTextEntry={secureText.pass}
                                    cursorColor="#fff"
                                />
                                <IconButton
                                    icon={secureText.pass ? "eye-off" : "eye"}
                                    iconColor="#888"
                                    size={20}
                                    onPress={() => setSecureText(p => ({ ...p, pass: !p.pass }))}
                                />
                            </View>

                            <Text style={[modalStyles.label, { marginTop: 15 }]}>Confirm Password</Text>
                            <View style={modalStyles.inputWrapper}>
                                <Icon source="lock-check-outline" size={20} color="#26A69A" />
                                <TextInput
                                    style={modalStyles.input}
                                    value={verifyPassword?.confirmPassword || ''}
                                    onChangeText={(val) => handleChange('confirmPassword')(val)}
                                    placeholder="Confirm password"
                                    placeholderTextColor="#666"
                                    secureTextEntry={secureText.confirm}
                                    cursorColor="#fff"
                                />
                                <IconButton
                                    icon={secureText.confirm ? "eye-off" : "eye"}
                                    iconColor="#888"
                                    size={20}
                                    onPress={() => setSecureText(p => ({ ...p, confirm: !p.confirm }))}
                                />
                            </View>
                        </View>

                        <View style={modalStyles.actions}>
                            <Button
                                mode="text"
                                onPress={handleClose}
                                textColor="#888"
                                style={modalStyles.btn}
                            >
                                Cancel
                            </Button>
                            <Button
                                mode="contained"
                                loading={loading}
                                onPress={handleVerify}
                                style={modalStyles.verifyBtn}
                                disabled={!verifyPassword?.password || !verifyPassword?.confirmPassword || loading}
                                labelStyle={{ fontWeight: 'bold', color: '#fff' }}
                            >
                                Verify Identity
                            </Button>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </Modal>
        </Portal>
    );
};

const modalStyles = StyleSheet.create({
    modalCard: {
        backgroundColor: '#1c222a',
        margin: 20,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: '#303841',
        elevation: 24,
        maxHeight: '90%', // Modal ko screen se bada hone se rokta hai
        overflow: 'hidden'
    },
    scrollContent: {
        padding: 25, // Padding scrollview ke andar move kar di
    },
    iconCircle: {
        width: 70,
        height: 70,
        backgroundColor: 'rgba(30, 136, 229, 0.1)',
        borderRadius: 35,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: 15,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 14,
        color: '#aaa',
        textAlign: 'center',
        marginTop: 8,
        lineHeight: 20,
    },
    form: {
        marginTop: 25,
    },
    label: {
        color: '#888',
        fontSize: 12,
        marginBottom: 8,
        marginLeft: 4,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#0f1419',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#303841',
        paddingHorizontal: 12,
        height: 55,
    },
    input: {
        flex: 1,
        color: '#fff',
        fontSize: 16,
        marginLeft: 10,
    },
    errorText: {
        color: '#FF5252',
        fontSize: 12,
        marginTop: 8,
        textAlign: 'center',
    },
    actions: {
        flexDirection: 'row',
        marginTop: 30,
        gap: 10,
    },
    btn: {
        flex: 1,
        height: 48,
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#444',
        borderRadius: 12,
    },
    verifyBtn: {
        flex: 1.5,
        backgroundColor: '#1E88E5',
        borderRadius: 12,
        justifyContent: 'center',
    }
});

export default DeleteAccountModal;