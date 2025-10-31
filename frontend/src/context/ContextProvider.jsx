import React, { createContext, useCallback, useEffect, useState } from 'react';
import { Dimensions, Platform } from 'react-native';
import Toast from 'react-native-toast-message';
import { ErrorToast, InfoToast, SuccessToast } from '../ui/Toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useFetch from '../hooks/useFetch';
import { jwtDecode } from 'jwt-decode';
import { navigationRef } from '../navigation/NavigationService';

export const MyContext = createContext();

export const MyContextProvider = ({ children }) => {
    const [refreshKey, setRefreshKey] = useState(0);
    const [refreshing, setRefreshing] = useState(false);
    const [isTokenChecked, setIsTokenChecked] = useState(false);
    const triggerDataRefresh = () => {
        setRefreshKey(prevKey => prevKey + 1);
    };

    const handleLogout = async (reason = "manual") => {
        try {
            await AsyncStorage.removeItem("token");
            await AsyncStorage.removeItem("id");
            showToast({
                type: 'success',
                title: reason === "expired" ? "Session Expired" : "Logout Successful",
                message: reason === "expired" ? "Please login again." : "You have successfully logged out.",
            });
            triggerDataRefresh();
            if (navigationRef.isReady()) {
                navigationRef.reset({
                    index: 0,
                    routes: [{ name: "Login" }],
                });
            } else {
                console.warn("Navigation not ready. Delay navigating...");
            }
        } catch (error) {
            showToast({
                type: 'error',
                title: "Logout Failed",
                message: error.message,
            });
        }
    };

    useEffect(() => {
        let logoutTimer;

        const checkTokenExpiration = async () => {
            const token = await AsyncStorage.getItem("token");
            setIsTokenChecked(true);

            if (token) {
                try {
                    const decoded = jwtDecode(token);

                    if (decoded?.exp) {
                        const expiryTime = decoded.exp * 1000;
                        const currentTime = Date.now();
                        const timeUntilExpiry = expiryTime - currentTime;

                        if (timeUntilExpiry <= 0) {
                            await handleLogout("expired");
                        } else {
                            logoutTimer = setTimeout(() => {
                                (async () => {
                                    await handleLogout("expired");
                                })();
                            }, timeUntilExpiry);
                        }
                    }
                } catch (error) {
                    await handleLogout("expired");
                } finally {
                    setIsTokenChecked(true);
                }
            }
        };

        checkTokenExpiration();

        return () => {
            if (logoutTimer) clearTimeout(logoutTimer);
        };
    }, []);

    const { data: apartmentData, loading: apartmentLoading } = useFetch('/api/apartment', refreshKey);
    const { data: flatData, loading: flatLoading } = useFetch('/api/flat', refreshKey);
    const { data: visitorData, loading: visitorLoading } = useFetch('/api/visitor', refreshKey);
    const { data: userData, loading: userLoading } = useFetch('/api/user', refreshKey);
    const [wrapperProps, setWrapperProps] = useState({ title: "", backAction: null });
    const [modalsVisible, setModalsVisible] = useState({
        menu: false,
        apartment: false,
        flat: false,
        flatsort: false,
        visitsort: false,
        historysort: false,
        calendarVisitors: false,
        calendarCustom: false,
    });
    const [loading, setLoading] = useState(false);
    const [registerFormData, setRegisterFormData] = useState({
        first_name: null,
        last_name: null,
        email: null,
        password: null,
        confirm_password: null,
    });
    const [loginFormData, setLoginFormData] = useState({ email: null, password: null });
    const [apartment, setApartment] = useState(null);
    const [flatFormData, setFlatFormData] = useState({
        first_name: null,
        last_name: null,
        phone_no: null,
        apartment_name: null,
        floor_no: null,
        flat_no: null,
    });
    const [value, setValue] = useState(null);
    const [dropdownValues, setDropdownValues] = useState({vehicle_type: null, apartment: null, floor: null, flat: null});
    const [visitorFormData, setVisitorFormData] = useState({
        first_name: null,
        last_name: null,
        phone_no: null,
        address: null,
        vehicle_type: null,
        vehicle_no: null,
        apartment_name: null,
        floor_no: null,
        flat_no: null,
        person_to_meet: null,
    });
    const [section, setSection] = useState(null);
    const [userDataToUpdate, setUserDataToUpdate] = useState({
        first_name: null, last_name: null, email: null, password: null, confirm_password: null
    });
    const [selected, setSelected] = useState();
    const [orientation, setOrientation] = useState('portrait');
    const [securePassword, setSecurePassword] = useState(true);
    const [secureConfirmPassword, setSecureConfirmPassword] = useState(true);
    const [gradientColor, setGradientColor] = useState(['#E53B35', '#F7A526']);
    const loader = apartmentLoading + flatLoading + visitorLoading + userLoading;
    const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';

    useEffect(() => {
        setUserDataToUpdate((prev) => ({
            ...prev,
            first_name: userData[0]?.first_name,
            last_name: userData[0]?.last_name,
            email: userData[0]?.email,
            password: userData[0]?.password || '****',
            confirm_password: userData[0]?.password || '****',
        }));
    }, [userData]);

    const toggleSecurePassword = () => {
        setSecurePassword(!securePassword);
    };

    const toggleSecureConfirmPassword = () => {
        setSecureConfirmPassword(!secureConfirmPassword);
    };

    const getOrientation = () => {
        const { width, height } = Dimensions.get('window');
        return width > height ? 'landscape' : 'portrait';
    };

    useEffect(() => {
        const updateOrientation = () => {
            setOrientation(getOrientation());
        };

        const subscription = Dimensions.addEventListener('change', updateOrientation);

        updateOrientation();

        return () => subscription?.remove();
    }, []);

    const handleChange = (field) => (value) => {
        setRegisterFormData(prev => ({ ...prev, [field]: value }));
        setLoginFormData(prev => ({ ...prev, [field]: value }));
        if (field === 'apartment') {
            setApartment(value);
        }
        setFlatFormData(prev => ({ ...prev, [field]: value }));
        setVisitorFormData(prev => ({ ...prev, [field]: value }));
        setUserDataToUpdate(prev => ({ ...prev, [field]: value }));
    };

    const toggleModal = (modalKey, isVisible) => {
        setModalsVisible(prev => ({
            ...prev,
            [modalKey]: isVisible,
        }));
    };

    function handleSetNull() {
        setRegisterFormData({
            first_name: null,
            last_name: null,
            email: null,
            password: null,
            confirm_password: null,
        });
        setLoginFormData({ email: null, password: null });
        setApartment(null);
        setValue(null);
        setFlatFormData({
            first_name: null,
            last_name: null,
            phone_no: null,
            apartment_name: null,
            floor_no: null,
            flat_no: null,
        });
        setDropdownValues({vehicle_type: null, apartment: null, floor: null, flat: null});
        setVisitorFormData({
            first_name: null,
            last_name: null,
            phone_no: null,
            address: null,
            vehicle_type: null,
            vehicle_no: null,
            apartment_name: null,
            floor_no: null,
            flat_no: null,
            person_to_meet: null,
        });
        setUserDataToUpdate({ first_name: userData[0]?.first_name, last_name: userData[0]?.last_name, email: userData[0]?.email, password: null, confirm_password: null });
        setSelected();
    }

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
            handleSetNull();
            triggerDataRefresh();
        }, 2000);
    }, [handleSetNull, triggerDataRefresh]);

    function showToast({ type, title, message }) {
        Toast.show({
            type: type || 'Default Type',
            text1: title || 'Default message.',
            text2: message || 'Default message.',
            position: 'top',
        });
    }

    const toastConfig = {
        success: SuccessToast,
        error: ErrorToast,
        info: InfoToast,
    };

    const values = {
        wrapperProps, setWrapperProps, MORE_ICON, modalsVisible, toggleModal, registerFormData, handleChange, handleSetNull, showToast, toastConfig, loading, setLoading, loginFormData, refreshKey, refreshing, onRefresh, isTokenChecked, triggerDataRefresh, apartment, value, setValue, loader, apartmentData, handleLogout, flatFormData, flatData, dropdownValues, setDropdownValues, visitorFormData, setVisitorFormData, visitorData, userData, section, setSection, orientation, selected, setSelected, securePassword, toggleSecurePassword, secureConfirmPassword, toggleSecureConfirmPassword, gradientColor, setGradientColor, userDataToUpdate, setUserDataToUpdate
    };

    return (
        <MyContext.Provider value={values}>
            {children}
        </MyContext.Provider>
    );
};