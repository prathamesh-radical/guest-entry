import { RefreshControl, ScrollView, View, Text, Dimensions } from 'react-native';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import useFunctions from '../hooks/useFunctions';
import { AnimatedScreen } from '../components/AnimatedScreen';
import { useCallback, useContext, useState } from 'react';
import { MyContext } from '../context/ContextProvider';
import { Avatar, Icon, IconButton, TextInput } from 'react-native-paper';
import { Styles } from '../styles/Settings';
import LinearGradient from 'react-native-linear-gradient';

export default function SettingScreen() {
    const { userData, refreshKey, refreshing, onRefresh, visitorData, orientation, setGradientColor, userDataToUpdate, handleChange } = useContext(MyContext);
    const { Wrapper, handleUpdateUserData } = useFunctions();
    const route = useRoute();
    const navigation = useNavigation();
    const [isEditing, setIsEditing] = useState(false);
    const { height, width } = Dimensions.get('window');
    const isPortrait = orientation === 'portrait';
    const styles = Styles({ width, height, isPortrait });
    const userName = userData[0]?.first_name + ' ' + userData[0]?.last_name;
    const initials = (userData[0]?.first_name?.[0] || '').toUpperCase() + (userData[0]?.last_name?.[0] || '').toUpperCase();

    let daysActive = 0;
    if (userData[0]?.date) {
        const joinDate = new Date(userData[0].date);
        const today = new Date();
        const diffTime = Math.abs(today - joinDate);
        daysActive = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }

    useFocusEffect(
        useCallback(() => {
            Wrapper(route);
            setGradientColor(['#E84E49', '#F8A634']);
            return;
        }, [refreshKey])
    );

    const handleSave = async (event) => {
        event.preventDefault();
        await handleUpdateUserData(event);
        setIsEditing(false);
    };

    const toggleEditMode = (event) => {
        if (isEditing) {
            handleSave(event);
        } else {
            setIsEditing(true);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <IconButton icon="arrow-left" size={24} color="#fff" onPress={() => navigation.goBack()} iconColor="#fff" />
                <View>
                    <Text style={styles.headerTitle}>My Profile</Text>
                    <Text style={styles.headerSubtitle}>Manage your account settings</Text>
                </View>
            </View>

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={['#1B7EDA']}
                        tintColor="#1B7EDA"
                    />
                }
            >
                <AnimatedScreen>
                    <View style={styles.profileCard}>
                        <Avatar.Text
                            size={100}
                            label={initials}
                            style={styles.avatar}
                            labelStyle={styles.avatarLabel}
                        />
                        <Text style={styles.userName}>{userName}</Text>
                        <View style={styles.badgeContainer}>
                            <Icon source="shield-check" size={14} color="#fff" />
                            <Text style={styles.badgeText}>Security Manager</Text>
                        </View>
                    </View>

                    <View style={styles.sectionHeader}>
                        <View style={styles.sectionTitleContainer}>
                            <Icon source="circle" size={10} color="#1B7EDA" />
                            <Text style={styles.sectionTitle}>Personal Information</Text>
                            <View style={styles.editIconContainer}>
                                <IconButton
                                    mode='outlined'
                                    icon={isEditing ? "content-save-outline" : "pencil-outline"}
                                    iconColor='#fff'
                                    size={15}
                                    onPress={toggleEditMode}
                                />
                            </View>
                        </View>
                        <View style={styles.infoItem}>
                            <Text style={styles.label}>Full name</Text>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    left={<TextInput.Icon icon="account-outline" color="#1E88E5" />}
                                    style={[styles.inputField, { backgroundColor: "#1D2C2D", borderColor: "#1E88E5", width: "50%" }]}
                                    textColor='#fff'
                                    placeholder="First Name"
                                    placeholderTextColor="#aaa"
                                    value={userDataToUpdate?.first_name || ''}
                                    keyboardType="default"
                                    onChangeText={(text) => handleChange("first_name")(text)}
                                    underlineColor="transparent"
                                    activeUnderlineColor="transparent"
                                    cursorColor='#fff'
                                    editable={isEditing}
                                />
                                <TextInput
                                    left={<TextInput.Icon icon="account-outline" color="#1E88E5" />}
                                    style={[styles.inputField, { 
                                        backgroundColor: "#1D2C2D", borderColor: "#1E88E5", width: isPortrait ? "47%" : "48%"
                                    }]}
                                    textColor='#fff'
                                    placeholder="Last Name"
                                    placeholderTextColor="#aaa"
                                    value={userDataToUpdate?.last_name || ''}
                                    keyboardType="default"
                                    onChangeText={(text) => handleChange("last_name")(text)}
                                    underlineColor="transparent"
                                    activeUnderlineColor="transparent"
                                    cursorColor='#fff'
                                    editable={isEditing}
                                />
                            </View>
                            <Text style={[styles.label, { marginTop: 10 }]}>Email Address</Text>
                            <TextInput
                                left={<TextInput.Icon icon="email-outline" color="#26A69A" />}
                                style={[styles.inputField, { backgroundColor: "#202D26", borderColor: "#26A69A" }]}
                                textColor='#fff'
                                placeholder="Email Address"
                                placeholderTextColor="#aaa"
                                value={userDataToUpdate?.email || ''}
                                keyboardType="email-address"
                                onChangeText={(text) => handleChange("email")(text)}
                                underlineColor="transparent"
                                activeUnderlineColor="transparent"
                                cursorColor='#fff'
                                editable={isEditing}
                            />
                            <Text style={[styles.label, { marginTop: 10 }]}>Password</Text>
                            <TextInput
                                left={<TextInput.Icon icon="lock-outline" color="#1E88E5" />}
                                style={[styles.inputField, { backgroundColor: "#1D2C2D", borderColor: "#1E88E5" }]}
                                textColor='#fff'
                                placeholder="Password"
                                placeholderTextColor="#aaa"
                                value={userDataToUpdate?.password || ''}
                                keyboardType="default"
                                onChangeText={(text) => handleChange("password")(text)}
                                underlineColor="transparent"
                                activeUnderlineColor="transparent"
                                cursorColor='#fff'
                                secureTextEntry={true}
                                editable={isEditing}
                            />
                            <TextInput
                                left={<TextInput.Icon icon="lock-outline" color="#1E88E5" />}
                                style={[styles.inputField, { backgroundColor: "#1D2C2D", borderColor: "#1E88E5" }]}
                                textColor='#fff'
                                placeholder="Confirm Password"
                                placeholderTextColor="#aaa"
                                value={userDataToUpdate?.confirm_password || ''}
                                keyboardType="default"
                                onChangeText={(text) => handleChange("confirm_password")(text)}
                                underlineColor="transparent"
                                activeUnderlineColor="transparent"
                                cursorColor='#fff'
                                secureTextEntry={true}
                                editable={isEditing}
                            />
                        </View>
                    </View>
                    <View style={styles.statsContainer}>
                        <View style={styles.statsTitleContainer}>
                            <Icon source="circle" size={10} color="#35A375" />
                            <Text style={styles.statsTitle}>Performance Stats</Text>
                            <View style={styles.editIconContainer}>
                                <Icon source="seal-variant" size={18} color="#43A047" />
                            </View>
                        </View>
                        <View style={styles.stats}>
                            <LinearGradient
                                colors={['#419C45', '#246D29']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={styles.statCard}
                            >
                                <View style={[styles.statIcon, { backgroundColor: "#428846" }]}></View>
                                <Text style={styles.statNumber}>{visitorData?.length}</Text>
                                <Text style={styles.statLabel}>Visitors Registered</Text>
                                <Text style={styles.statSubLabel}>📈 This month</Text>
                            </LinearGradient>
                            <LinearGradient
                                colors={['#1D85E2', '#0D49A4']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={styles.statCard}
                            >
                                <View style={[styles.statIcon, { backgroundColor: "#2C72C4" }]}></View>
                                <Text style={styles.statNumber}>{daysActive}</Text>
                                <Text style={styles.statLabel}>Days Active</Text>
                                <Text style={styles.statSubLabel}>📅 Since joining</Text>
                            </LinearGradient>
                        </View>
                    </View>
                </AnimatedScreen>
            </ScrollView>
        </View>
    );
}