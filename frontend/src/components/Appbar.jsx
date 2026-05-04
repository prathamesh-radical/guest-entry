import React, { useContext, useState } from 'react'; // useState add karein
import { Appbar, IconButton, useTheme } from 'react-native-paper';
import { Styles } from '../styles/AppBar';
import LinearGradient from 'react-native-linear-gradient';
import { MyContext } from '../context/ContextProvider';
import useFunctions from '../hooks/useFunctions';
import LogoutModal from './LogoutModal'; // Import karein

export default function AppBar({ title, backAction }) {
    const { gradientColor } = useContext(MyContext);
    const { handleLogoutAction } = useFunctions();
    const [logoutVisible, setLogoutVisible] = useState(false);
    const theme = useTheme();
    const styles = Styles(theme);
    
    const displayStyle = (title === "Signup" || title === "Login") ? "none" : "flex";

    return (
        <>
            <LogoutModal 
                visible={logoutVisible}
                onDismiss={() => setLogoutVisible(false)}
                onConfirm={() => {
                    setLogoutVisible(false);
                    handleLogoutAction();
                }}
            />
            
            <LinearGradient
                colors={gradientColor}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                style={styles.gradient}
            >
                <Appbar.Header style={[styles.appbar_container, { display: displayStyle, backgroundColor: 'transparent' }]}>
                    {backAction}
                    <Appbar.Content title={title} color="#fff" style={styles.appbar_title} />
                    <IconButton 
                        icon="power" 
                        iconColor='#fff' 
                        size={25} 
                        onPress={() => setLogoutVisible(true)} // Open modal
                        style={styles.appbar_icon} 
                    />
                </Appbar.Header>
            </LinearGradient>
        </>
    );
}