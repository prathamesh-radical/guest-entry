import React, { useContext } from 'react';
import { MyContext } from '../context/ContextProvider';
import { Appbar, Icon } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from 'react-native-config';
import { Image, StyleSheet, View } from 'react-native';

export default function useFunctions() {
    const {
        setWrapperProps, showToast, registerFormData, handleSetNull, setLoading, loginFormData, toggleModal, triggerDataRefresh, addApartment, updateApartment, handleLogout, flatFormData, visitorFormData, userDataToUpdate, userPasswordUpdate, updateFlatFormData, updateVisitorFormData
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

    async function handleAddApartment(event, setShowForm) {
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
                body: JSON.stringify(addApartment),
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
                setShowForm(false);
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

    async function handleUpdateApartment(event, id, onClose) {
        event.preventDefault();
        setLoading(true);

        try {
            const token = await AsyncStorage.getItem("token");
            const userId = await AsyncStorage.getItem("id");
            const response = await fetch(`${Config.BACKEND_URL}/api/updateApartment?user_id=${Number(userId)}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ ...updateApartment, id: Number(id) }),
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
                handleSetNull();
                triggerDataRefresh();
                onClose();
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

    async function handleDeleteApartment(event, id, setShowAlert) {
        event.preventDefault();
        setLoading(true);

        try {
            const token = await AsyncStorage.getItem("token");
            const userId = await AsyncStorage.getItem("id");
            const response = await fetch(`${Config.BACKEND_URL}/api/deleteApartment?user_id=${Number(userId)}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ id: Number(id) }),
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
                handleSetNull();
                triggerDataRefresh();
                setShowAlert(false);
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

    async function handleAddFlat(event, setShowForm) {
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
                handleSetNull();
                triggerDataRefresh();
                setShowForm(false);
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

    async function handleUpdateFlat(event, id, onClose) {
        event.preventDefault();
        setLoading(true);

        try {
            const token = await AsyncStorage.getItem("token");
            const userId = await AsyncStorage.getItem("id");
            const response = await fetch(`${Config.BACKEND_URL}/api/updateFlat?user_id=${Number(userId)}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ ...updateFlatFormData, id: Number(id) })
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
                handleSetNull();
                triggerDataRefresh();
                onClose();
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

    async function handleDeleteFlat(event, id, setShowAlert) {
        event.preventDefault();
        setLoading(true);

        try {
            const token = await AsyncStorage.getItem("token");
            const userId = await AsyncStorage.getItem("id");
            const response = await fetch(`${Config.BACKEND_URL}/api/deleteFlat?user_id=${Number(userId)}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ id: Number(id) }),
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
                handleSetNull();
                triggerDataRefresh();
                setShowAlert(false);
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

    async function handleUpdateVisitor(event, id) {
        event.preventDefault();
        setLoading(true);
        console.log("Updating visitor with id:", id);
        try {
            const token = await AsyncStorage.getItem("token");
            const userId = await AsyncStorage.getItem("id");
            const response = await fetch(`${Config.BACKEND_URL}/api/updateVisitor?user_id=${Number(userId)}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ ...updateVisitorFormData, id: Number(id) }),
            });

            const data = await response.json();

            if (!response.ok) {
                showToast({
                    type: 'error',
                    title: "Oops!",
                    message: data.message,
                });
                console.log("not ok", data);
            } else {
                showToast({
                    type: 'success',
                    title: "Good!",
                    message: data.message,
                });
                handleSetNull();
                triggerDataRefresh();
                navigation.navigate("Visitor Log");
            }
        } catch (error) {
            showToast({
                type: 'error',
                title: "Oops!",
                message: error.message,
            });
            console.log("error", error);
        } finally {
            setLoading(false);
        }
    }

    async function handleDeleteVisitor(event, id, setShowAlert) {
        event.preventDefault();
        setLoading(true);

        try {
            const token = await AsyncStorage.getItem("token");
            const userId = await AsyncStorage.getItem("id");
            const response = await fetch(`${Config.BACKEND_URL}/api/deleteVisitor?user_id=${Number(userId)}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ id: Number(id) }),
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
                handleSetNull();
                triggerDataRefresh();
                setShowAlert(false);
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

    async function handleUpdateUserPassword(event, setShowForm) {
        event.preventDefault();
        setLoading(true);

        try {
            const token = await AsyncStorage.getItem("token");
            const id = await AsyncStorage.getItem("id");
            const response = await fetch(`${Config.BACKEND_URL}/api/updateUserPassword?user_id=${Number(id)}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(userPasswordUpdate),
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
                setShowForm(false);
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
            ) : route.name === "Update Entry" ? (
                <View style={[styles.iconContainer, { backgroundColor: "#9F64FD" }]}>
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

    return {
        Wrapper, handleUserRegister, handleLogin, handleAddApartment, handleDeleteApartment, handleUpdateApartment, handleAddFlat, handleUpdateFlat, handleDeleteFlat, handleAddVisitor, handleUpdateVisitor, handleDeleteVisitor, handleUpdateUserData, handleUpdateUserPassword, handleLogoutAction
    };
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