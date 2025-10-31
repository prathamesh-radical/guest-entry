import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import LoadingScreen from "../screens/LoadingScreen";
import { navigationRef } from "./NavigationService";

export const ProtectedRoute = ({ children }) => {
    const [isLogged, setIsLogged] = useState(null);

    useEffect(() => {
        const checkToken = async () => {
            try {
                const token = await AsyncStorage.getItem("token");
                const isAuthenticated = !!token;

                setIsLogged(isAuthenticated);

                if (!isAuthenticated && navigationRef.isReady()) {
                    navigationRef.reset({
                        index: 0,
                        routes: [{ name: "Login" }],
                    });
                }
            } catch (error) {
                console.error("Error checking auth token:", error);
                setIsLogged(false);
            }
        };

        checkToken();
    }, []);

    if (isLogged === null) {
        return <LoadingScreen />;
    }

    return isLogged ? children : null;
};