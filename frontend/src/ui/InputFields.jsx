import React, { useContext } from 'react';
import { TextInput } from 'react-native-paper';
import { MyContext } from '../context/ContextProvider';

export default function EmailInput({ styles, contentStyles, placeholder, value, onChangeText }) {
    return (
        <TextInput
            activeOutlineColor='#1E88E5'
            mode='outlined'
            left={<TextInput.Icon icon="email-outline" color="#D3D5D6" />}
            style={styles}
            contentStyle={contentStyles}
            placeholder={placeholder}
            placeholderTextColor="#939799"
            value={value}
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={onChangeText}
            autoComplete="off"
            textContentType="none"
            importantForAutofill="no"
            textColor='#fff'
        />
    );
}

export function PasswordInput({ styles, contentStyles, value, onChangeText }) {
    const { securePassword, toggleSecurePassword } = useContext(MyContext);

    return (
        <TextInput
            activeOutlineColor='#1E88E5'
            mode='outlined'
            left={<TextInput.Icon icon="lock-outline" color="#D3D5D6" />}
            right={<TextInput.Icon icon={securePassword ? "eye-off-outline" : "eye-outline"} color="#D3D5D6" onPress={() => toggleSecurePassword()} />}
            style={styles}
            contentStyle={contentStyles}
            placeholder="Enter your password"
            placeholderTextColor="#939799"
            value={value}
            keyboardType="default"
            autoCapitalize="none"
            onChangeText={onChangeText}
            secureTextEntry={securePassword}
            textColor='#fff'
        />
    );
}

export function ConfirmPasswordInput({ styles, contentStyles, value, onChangeText }) {
    const { secureConfirmPassword, toggleSecureConfirmPassword } = useContext(MyContext);

    return (
        <TextInput
            activeOutlineColor='#1E88E5'
            mode='outlined'
            left={<TextInput.Icon icon="lock-outline" color="#D3D5D6" />}
            right={<TextInput.Icon icon={secureConfirmPassword ? "eye-off-outline" : "eye-outline"} color="#D3D5D6" onPress={() => toggleSecureConfirmPassword()} />}
            style={styles}
            contentStyle={contentStyles}
            placeholder="Confirm password"
            placeholderTextColor="#939799"
            value={value}
            keyboardType="default"
            autoCapitalize="none"
            onChangeText={onChangeText}
            secureTextEntry={secureConfirmPassword}
            textColor='#fff'
        />
    );
}

export function NameInput({ styles, value, placeholder, onChangeText }) {
    return (
        <TextInput
            style={styles}
            placeholder={placeholder}
            placeholderTextColor="#aaa"
            value={value}
            keyboardType="default"
            onChangeText={onChangeText}
            activeOutlineColor='#1E88E5'
            mode='outlined'
            left={<TextInput.Icon icon="account-outline" color="#D3D5D6" />}
        />
    );
}