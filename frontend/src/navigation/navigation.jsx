import { useContext, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MyContext } from "../context/ContextProvider";
import { navigationRef } from "./NavigationService";
import { screenAnimationOptions } from './screenAnimations';
import Dashboard from "../screens/Dashboard";
import Settings from "../screens/Settings";
import Registration from "../screens/Registration";
import Login from "../screens/Login";
import { ProtectedRoute } from "./ProtectedRoutes";
import { jwtDecode } from 'jwt-decode';
import AddVisitors from "../screens/AddVisitors";
import Visitors from "../screens/Visitors";
import VisitorsDetails from "../screens/VisitorsDetails";
import CustomVisitors from "../screens/CustomVisitors";
import Apartment from "../screens/Apartment";
import Flats from "../screens/Flats";
import Reports from "../screens/Reports";
import UpdateVisitor from "../screens/UpdateVisitor";

export default function Navigation() {
    const { isTokenChecked, handleLogout } = useContext(MyContext);
    const Stack = createNativeStackNavigator();

    useEffect(() => {
        const interval = setInterval(async () => {
            const token = await AsyncStorage.getItem("token");

            if (token) {
                try {
                    const decoded = jwtDecode(token);
                    const currentTime = Date.now();
                    const expiryTime = decoded.exp * 1000;

                    if (expiryTime < currentTime && navigationRef.isReady()) {
                        await handleLogout("expired");
                        navigationRef.reset({
                            index: 0,
                            routes: [{ name: "Login" }],
                        });
                    }
                } catch (error) {
                    await handleLogout("expired");
                    if (navigationRef.isReady()) {
                        navigationRef.reset({
                            index: 0,
                            routes: [{ name: "Login" }],
                        });
                    }
                }
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [isTokenChecked]);

    return (
        <Stack.Navigator 
            initialRouteName={isTokenChecked ? "Security Hub" : "Login"} 
            screenOptions={{
                headerShown: false,
                ...screenAnimationOptions,
                gestureEnabled: true,
                gestureDirection: 'vertical',
            }}
        >
            <Stack.Screen name="Signup" component={Registration} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Security Hub">{() => <ProtectedRoute><Dashboard /></ProtectedRoute>}</Stack.Screen>
            <Stack.Screen name="New Entry">{() => <ProtectedRoute><AddVisitors /></ProtectedRoute>}</Stack.Screen>
            <Stack.Screen name="Update Entry">{() => <ProtectedRoute><UpdateVisitor /></ProtectedRoute>}</Stack.Screen>
            <Stack.Screen name="Buildings">{() => <ProtectedRoute><Apartment /></ProtectedRoute>}</Stack.Screen>
            <Stack.Screen name="Residential Units">{() => <ProtectedRoute><Flats /></ProtectedRoute>}</Stack.Screen>
            <Stack.Screen name="Visitor Log">{() => <ProtectedRoute><Visitors /></ProtectedRoute>}</Stack.Screen>
            <Stack.Screen name="Visitor Details">{() => <ProtectedRoute><VisitorsDetails /></ProtectedRoute>}</Stack.Screen>
            <Stack.Screen name="CustomVisitors">{() => <ProtectedRoute><CustomVisitors /></ProtectedRoute>}</Stack.Screen>
            <Stack.Screen name="Settings">{() => <ProtectedRoute><Settings /></ProtectedRoute>}</Stack.Screen>
            <Stack.Screen name="Analytics">{() => <ProtectedRoute><Reports /></ProtectedRoute>}</Stack.Screen>
        </Stack.Navigator>
    );
}