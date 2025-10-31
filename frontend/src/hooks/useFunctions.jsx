import React, { useContext } from 'react';
import { MyContext } from '../context/ContextProvider';
import { Appbar, Icon } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from 'react-native-config';
import { Image, StyleSheet, View } from 'react-native';

export default function useFunctions() {
    const {
        setWrapperProps, showToast, registerFormData, handleSetNull, setLoading, loginFormData, toggleModal, triggerDataRefresh, apartment, handleLogout, flatFormData, visitorFormData, userDataToUpdate
    } = useContext(MyContext);
    const navigation = useNavigation();

    async function handleUserRegister(event) {
        event.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(`${Config.BACKEND_URL}/api/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(registerFormData),
            });

            const data = await response.json();

            if (!response.ok) {
                showToast({
                    type: 'error',
                    title: "Oops!",
                    message: data.message,
                });
            } else {
                showToast({
                    type: 'success',
                    title: "Good!",
                    message: data.message,
                });
                triggerDataRefresh();
                handleSetNull();
                navigation.reset({
                    index: 0,
                    routes: [{ name: "Login" }],
                });
            }
        } catch (error) {
            showToast({
                type: 'error',
                title: "Oops!",
                message: error.message,
            });
        } finally {
            setLoading(false);
        }
    }

    async function handleLogin(event) {
        event.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(`${Config.BACKEND_URL}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(loginFormData),
            });

            const data = await response.json();

            if (!response.ok) {
                showToast({
                    type: 'error',
                    title: "Oops!",
                    message: data.message,
                });
            } else {
                await AsyncStorage.setItem("token", data.token);
                await AsyncStorage.setItem('id', String(data?.userId));
                showToast({
                    type: 'success',
                    title: "Good!",
                    message: data.message,
                });
                handleSetNull();
                triggerDataRefresh();
                navigation.reset({
                    index: 0,
                    routes: [{ name: "Security Hub" }],
                });
            }
        } catch (error) {
            showToast({
                type: 'error',
                title: "Oops!",
                message: error.message,
            });
        } finally {
            setLoading(false);
        }
    }

    async function handleAddApartment(event) {
        event.preventDefault();
        setLoading(true);

        try {
            const token = await AsyncStorage.getItem("token");
            const id = await AsyncStorage.getItem("id");
            const response = await fetch(`${Config.BACKEND_URL}/api/addApartment?user_id=${Number(id)}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ apartment_name: apartment }),
            });

            const data = await response.json();

            if (!response.ok) {
                showToast({
                    type: 'error',
                    title: "Oops!",
                    message: data.message,
                });
            } else {
                showToast({
                    type: 'success',
                    title: "Good!",
                    message: data.message,
                });
                toggleModal("apartment", false);
                handleSetNull();
                triggerDataRefresh();
            }
        } catch (error) {
            showToast({
                type: 'error',
                title: "Oops!",
                message: error.message,
            });
        } finally {
            setLoading(false);
        }
    }

    async function handleAddFlat(event) {
        event.preventDefault();
        setLoading(true);

        try {
            const token = await AsyncStorage.getItem("token");
            const id = await AsyncStorage.getItem("id");
            const response = await fetch(`${Config.BACKEND_URL}/api/addFlat?user_id=${Number(id)}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(flatFormData),
            });

            const data = await response.json();

            if (!response.ok) {
                showToast({
                    type: 'error',
                    title: "Oops!",
                    message: data.message,
                });
            } else {
                showToast({
                    type: 'success',
                    title: "Good!",
                    message: data.message,
                });
                toggleModal("flat", false);
                handleSetNull();
                triggerDataRefresh();
            }
        } catch (error) {
            showToast({
                type: 'error',
                title: "Oops!",
                message: error.message,
            });
        } finally {
            setLoading(false);
        }
    }

    async function handleAddVisitor(event) {
        event.preventDefault();
        setLoading(true);

        try {
            const token = await AsyncStorage.getItem("token");
            const id = await AsyncStorage.getItem("id");
            const response = await fetch(`${Config.BACKEND_URL}/api/addVisitor?user_id=${Number(id)}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(visitorFormData),
            });

            const data = await response.json();

            if (!response.ok) {
                showToast({
                    type: 'error',
                    title: "Oops!",
                    message: data.message,
                });
            } else {
                showToast({
                    type: 'success',
                    title: "Good!",
                    message: data.message,
                });
                toggleModal("flat", false);
                handleSetNull();
                triggerDataRefresh();
            }
        } catch (error) {
            showToast({
                type: 'error',
                title: "Oops!",
                message: error.message,
            });
        } finally {
            setLoading(false);
        }
    }

    async function handleUpdateUserData(event) {
        event.preventDefault();
        setLoading(true);

        try {
            const token = await AsyncStorage.getItem("token");
            const id = await AsyncStorage.getItem("id");
            const response = await fetch(`${Config.BACKEND_URL}/api/updateUserData?user_id=${Number(id)}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(userDataToUpdate),
            });

            const data = await response.json();

            if (!response.ok) {
                showToast({
                    type: 'error',
                    title: "Oops!",
                    message: data.message,
                });
            } else {
                showToast({
                    type: 'success',
                    title: "Good!",
                    message: data.message,
                });
                navigation.navigate("Settings");
                handleSetNull();
                triggerDataRefresh();
            }
        } catch (error) {
            showToast({
                type: 'error',
                title: "Oops!",
                message: error.message,
            });
        } finally {
            setLoading(false);
        }
    }

    async function handleLogoutAction() {
        try {
            toggleModal("menu", false);
            await handleLogout();
        } catch (error) {
            showToast({
                type: 'error',
                message: error.message,
            });
        }
        toggleModal("menu", false);
    }

    async function Wrapper(route, name) {
        if (!route) return;

        let title = "";
        if (route?.name === "CustomVisitors" || route?.name === "Visitor Details") {
            title = "Visitor Log";
        } else if (route?.name === "Settings") {
            title = "Your Profile";
        } else {
            title = route?.name;
        }

        setWrapperProps({
            title: title,
            backAction: route.name === "Security Hub" ? (
                <View style={[styles.iconContainer, { backgroundColor: "#61A9E9" }]}>
                    <Icon source="shield-outline" size={25} color="#fff" />
                </View>
            ) : route.name === "New Entry" ? (
                <View style={[styles.iconContainer, { backgroundColor: "#7BBE89" }]}>
                    <Image source={require("../../assets/icons/star.png")} style={{ width: 25, height: 25 }} tintColor="#fff" />
                </View>
            ) : (route.name === "Visitor Log" || route.name === "Visitor Details" || route.name === "CustomVisitors") ? (
                <View style={[styles.iconContainer, { backgroundColor: "#6CCCF4" }]}>
                    <Icon source="account-outline" size={25} color="#fff" />
                </View>
            ) : route.name === "Buildings" ? (
                <View style={[styles.iconContainer, { backgroundColor: "#6CCBEE" }]}>
                    <Icon source="shield-outline" size={25} color="#fff" />
                </View>
            ) : route.name === "Residential Units" ? (
                <View style={[styles.iconContainer, { backgroundColor: "#EF7F70" }]}>
                    <Icon source="shield-outline" size={25} color="#fff" />
                </View>
            ) : route.name === "Settings" ? (
                <View style={[styles.iconContainer, { backgroundColor: "#EF7F70" }]}>
                    <Icon source="account-outline" size={25} color="#fff" />
                </View>
            ) : route.name === "Analytics" ? (
                <View style={[styles.iconContainer, { backgroundColor: "#F9B868" }]}>
                    <Icon source="shield-outline" size={25} color="#fff" />
                </View>
            ) : (
                <Appbar.BackAction color="#fff" size={25} onPress={() => navigation.goBack()} />
            ),
        });
    }

    return { Wrapper, handleUserRegister, handleLogin, handleAddApartment, handleAddFlat, handleAddVisitor, handleUpdateUserData, handleLogoutAction };
}

const styles = StyleSheet.create({
    iconContainer: {
        marginLeft: 10,
        marginRight: 15,
        padding: 8,
        borderRadius: 12,
        shadowColor: '#fff',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
        elevation: 10,
    },
});