import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableWithoutFeedback, Image, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Icon } from 'react-native-paper';

export default function CustomCard({
    route, colors, styles, cardTitle, cardText, iconBgColor, iconName, value, display, mainStyle, customStyle, reportText
}) {
    const navigation = useNavigation();
    const isFullWidth = iconName === "map-marker-outline";

    return (
        <TouchableWithoutFeedback onPress={() => navigation.navigate(route)}>
            <LinearGradient
                colors={colors}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[styles.cardContentContainer, mainStyle, { alignSelf: isFullWidth ? "center" : "flex-start", minHeight: 120 }]}
            >
                <View style={styles.contentWrap}>
                    <Text style={styles.cardTitle}>{cardTitle}</Text>
                    <View style={customStyle}>
                        <View style={[styles.iconContainer, { backgroundColor: iconBgColor }]}>
                            <Icon source={iconName} size={20} color="#fff" />
                        </View>
                    </View>
                </View>
                <View style={{ marginBottom: display === "no" && 24 }}>
                    <Text style={styles.cardSubTitle}>{value}</Text>
                    <Text style={styles.cardText}>{cardText}</Text>
                </View>
                {display === "yes" && (
                    <Text style={styles.textContainer}>
                        <Icon source="eye" size={15} color="#BACFE7" /> <Text style={styles.cardText}>Tap to explore</Text>
                    </Text>
                )}
                {reportText}
            </LinearGradient>
        </TouchableWithoutFeedback>
    );
}

export function VisitorsCard({ styles, onPress, src, analyticsLabel, colors, icon, visitorStats }) {
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={styles.analyticsCard}>
                <View style={styles.analyticsHeader}>
                    <View style={styles.analyticsLabelContainer}>
                        <Image source={src} style={{ width: 20, height: 20 }} />
                        <Text style={styles.analyticsLabel}>{analyticsLabel}</Text>
                    </View>
                    {analyticsLabel === "This Week" ? (
                        <LinearGradient
                            colors={colors}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.analyticsIconContainer}
                        >
                            <Image source={require("../../assets/icons/trend.png")} style={{ width: 20, height: 20 }} tintColor="#fff" />
                        </LinearGradient>
                    ) : (
                        <LinearGradient
                            colors={colors}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.analyticsIconContainer}
                        >
                            <Icon source={icon} size={20} color="#fff" />
                        </LinearGradient>
                    )}
                </View>
                <Text style={styles.analyticsValue}>{visitorStats}</Text>
                <View style={styles.analyticsProgressContainer}>
                    <LinearGradient
                        colors={colors}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={{ width: "90%" }}
                    >
                        <View style={styles.progressLine} />
                    </LinearGradient>
                    <Icon source="pulse" size={20} color="#B0BEC5" />
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}