import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useContext } from 'react';
import { View, Text, ScrollView, RefreshControl, Dimensions } from 'react-native';
import useFunctions from '../hooks/useFunctions';
import { Styles } from '../styles/Registration';
import { AnimatedScreen } from '../components/AnimatedScreen';
import { ActivityIndicator, Button, Icon } from 'react-native-paper';
import { MyContext } from '../context/ContextProvider';
import LinearGradient from 'react-native-linear-gradient';
import EmailInput, { ConfirmPasswordInput, NameInput, NumberInput, PasswordInput } from '../ui/InputFields';
import LoadingScreen from './LoadingScreen';

export default function Registration() {
    const { registerFormData: formData, loading, handleChange, refreshing, onRefresh, orientation, setGradientColor } = useContext(MyContext);
    const { Wrapper, handleUserRegister } = useFunctions();
    const navigation = useNavigation();
    const route = useRoute();
    const { height, width } = Dimensions.get('window');
    const isPortrait = orientation === 'portrait';
    const styles = Styles({ width, height, isPortrait });

    useFocusEffect(
        useCallback(() => {
            Wrapper(route);
            setGradientColor(['#E53B35', '#E95233']);
            return;
        }, [])
    );

    if (loading) return <LoadingScreen />;

    return (
        <LinearGradient
            colors={['#E53B35', '#F7A526']}
            style={styles.container}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
        >
            <AnimatedScreen style={styles.container}>
                <ScrollView
                    contentContainerStyle={styles.scrollContainer}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#E53B35']} />}
                >
                    <View style={styles.iconContainer}>
                        <Icon source="shield-outline" size={35} color="#fff" />
                    </View>
                    <Text style={styles.heading}>Join SecureAccess</Text>
                    <Text style={styles.subHead}>Create your security dashboard</Text>
                    <View style={styles.formContainer}>
                        <View style={styles.nameContainer}>
                            <View style={styles.nameFieldContainer}>
                                <Text style={styles.label}>First Name *</Text>
                                <NameInput
                                    styles={styles.inputField}
                                    value={formData.first_name}
                                    placeholder="John"
                                    onChangeText={(text) => handleChange("first_name")(text)}
                                />
                            </View>
                            <View style={styles.nameFieldContainer}>
                                <Text style={styles.label}>Last Name *</Text>
                                <NameInput
                                    styles={styles.inputField}
                                    value={formData.last_name}
                                    placeholder="Doe"
                                    onChangeText={(text) => handleChange("last_name")(text)}
                                />
                            </View>
                        </View>
                        <Text style={styles.label}>Phone Number *</Text>
                        <NumberInput
                            placeholder="+1234567890"
                            styles={styles.inputField}
                            contentStyles={styles.inputFieldContent}
                            value={formData.phone_no}
                            onChangeText={(text) => handleChange("phone_no")(text)}
                        />
                        <Text style={[styles.label, { marginTop: 10 }]}>Email Address *</Text>
                        <EmailInput
                            placeholder="john@example.com"
                            styles={styles.inputField}
                            contentStyles={styles.inputFieldContent}
                            value={formData.email}
                            onChangeText={(text) => handleChange("email")(text)}
                        />
                        <Text style={[styles.label, { marginTop: 10 }]}>Create Password *</Text>
                        <PasswordInput
                            styles={styles.inputField}
                            contentStyles={styles.inputFieldContent}
                            value={formData.password}
                            onChangeText={(text) => handleChange("password")(text)}
                        />
                        <Text style={[styles.label, { marginTop: 10 }]}>Confirm Password *</Text>
                        <ConfirmPasswordInput
                            styles={styles.inputField}
                            contentStyles={styles.inputFieldContent}
                            value={formData.confirm_password}
                            onChangeText={(text) => handleChange("confirm_password")(text)}
                        />
                        <Button
                            children="Create Account"
                            icon="shield-outline"
                            mode="contained-tonal"
                            style={styles.button}
                            labelStyle={styles.buttonLabelStyle}
                            onPress={(event) => handleUserRegister(event)}
                        />
                        <Text style={styles.text}>
                            Already have an account?{' '}
                            <Text style={styles.linkText} onPress={() => navigation.navigate('Login')}>
                                Sign In
                            </Text>
                        </Text>
                    </View>
                </ScrollView>
            </AnimatedScreen>
        </LinearGradient>
    );
}