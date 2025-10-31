import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useContext } from 'react';
import { View, Text, ScrollView, RefreshControl, Dimensions } from 'react-native';
import useFunctions from '../hooks/useFunctions';
import { ActivityIndicator, Button, Icon, TextInput } from 'react-native-paper';
import { AnimatedScreen } from '../components/AnimatedScreen';
import { MyContext } from '../context/ContextProvider';
import { Styles } from '../styles/Login';
import EmailInput, { PasswordInput } from '../ui/InputFields';
import LoadingScreen from './LoadingScreen';

export default function Login() {
    const { loginFormData: formData, loading, handleChange, refreshing, onRefresh, orientation, setGradientColor } = useContext(MyContext);
    const { Wrapper, handleLogin } = useFunctions();
    const navigation = useNavigation();
    const route = useRoute();
    const { height, width } = Dimensions.get('window');
    const isPortrait = orientation === 'portrait';
    const styles = Styles({ width, height, isPortrait });

    useFocusEffect(
        useCallback(() => {
            Wrapper(route);
            setGradientColor(['#1E80DE', '#1E80DE'])
            return;
        }, [])
    );

    if (loading) return <LoadingScreen />;

    return (
        <ScrollView
            style={{ flexGrow: 1 }}
            contentContainerStyle={styles.container}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#1E80DE']} />}
        >
            <AnimatedScreen style={styles.animatedWrapper}>
                <View style={styles.iconContainer}>
                    <Icon source="shield-outline" size={40} color="#fff" />
                </View>
                <Text style={styles.heading}>Welcome Back</Text>
                <Text style={styles.subHead}>Sign in to your secure dashboard</Text>
                <View style={styles.formContainer}>
                    <Text style={styles.label}>Email Address</Text>
                    <EmailInput
                        placeholder="admin@example.com"
                        styles={styles.inputField}
                        contentStyles={styles.inputFieldContent}
                        value={formData.email}
                        onChangeText={(text) => handleChange("email")(text)}
                    />
                    <Text style={[styles.label, { marginTop: 10 }]}>Password</Text>
                    <PasswordInput
                        styles={styles.inputField}
                        contentStyles={styles.inputFieldContent}
                        value={formData.password}
                        onChangeText={(text) => handleChange("password")(text)}
                    />
                    <Button
                        children="Sign in Securely"
                        icon="shield-outline"
                        mode="contained-tonal"
                        style={styles.button}
                        labelStyle={styles.buttonLabelStyle}
                        onPress={(event) => handleLogin(event)}
                    />
                    <Text style={styles.text}>
                        Don't have an account?{' '}
                        <Text style={styles.linkText} onPress={() => navigation.navigate('Signup')}>
                            Create Account
                        </Text>
                    </Text>
                </View>
            </AnimatedScreen>
        </ScrollView>
    );
}