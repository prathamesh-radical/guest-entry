import { StyleSheet } from "react-native";

export const Styles = ({ width, height, isPortrait }) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0f1419',
    },
    scrollContainer: {
        padding: 16,
        paddingHorizontal: isPortrait ? 16 : "7%",
    },
    header: {
        flexDirection: 'row',
        paddingVertical: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: isPortrait ? 0 : "1%",
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    subtitle: {
        fontSize: 14,
        color: '#8b92a7',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        gap: "5%",
        marginRight: !isPortrait && "2.5%",
    },
    exportButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1a2332',
        paddingHorizontal: 10,
        height: 40,
        borderRadius: 8,
        marginRight: 5,
        gap: 6,
    },
    exportText: {
        color: '#4ade80',
        fontSize: 14,
        fontWeight: '600',
    },
    periodSelector: {
        flexDirection: 'row',
        backgroundColor: '#1a2332',
        borderRadius: 8,
        padding: 4,
        marginBottom: 20,
    },
    periodButton: {
        flex: 1,
        paddingVertical: 8,
        paddingHorizontal: 8,
        borderRadius: 6,
        alignItems: 'center',
    },
    periodButtonActive: {
        backgroundColor: '#2a3f5f',
    },
    periodText: {
        color: '#8b92a7',
        fontSize: 13,
        fontWeight: '500',
    },
    periodTextActive: {
        color: '#ffffff',
    },
    metricsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: "5%",
        marginBottom: 24,
    },
    metricCard: {
        flex: 1,
        minWidth: '47%',
        borderRadius: 12,
        padding: 16,
    },
    metricCardBlue: {
        backgroundColor: '#2563eb',
    },
    metricCardGreen: {
        backgroundColor: '#059669',
    },
    metricCardTeal: {
        backgroundColor: '#0d9488',
    },
    metricCardLightBlue: {
        backgroundColor: '#0284c7',
    },
    metricHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    metricLabel: {
        fontSize: 13,
        color: '#e0f2fe',
        fontWeight: '500',
    },
    metricIcon: {
        position: "absolute",
        top: "-90%",
        right: isPortrait ? "-11%" : "-5.5%",
        padding: 15,
        paddingLeft: 30,
        paddingBottom: 30,
        borderTopRightRadius: 12,
        borderBottomLeftRadius: 50,
    },
    metricValue: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 4,
    },
    metricSubtext: {
        fontSize: 12,
        color: '#e0f2fe',
        opacity: 0.9,
    },
    metricChange: {
        fontSize: 12,
        color: '#e0f2fe',
        marginTop: 4,
    },
    sectionCard: {
        backgroundColor: '#1a2332',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        gap: 8,
    },
    sectionDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#ffffff',
        flex: 1,
    },
    vehicleItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#2563eb',
        padding: 14,
        borderRadius: 8,
        marginBottom: 8,
    },
    vehicleItemBike: {
        backgroundColor: '#1e3a5f',
    },
    vehicleLabel: {
        fontSize: 15,
        color: '#ffffff',
        fontWeight: '500',
    },
    vehicleBadge: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
    },
    vehicleCount: {
        fontSize: 14,
        color: '#ffffff',
        fontWeight: '600',
    },
    popularVehicle: {
        backgroundColor: '#0d4a3e',
        padding: 12,
        borderRadius: 8,
        flexDirection: 'column',
        gap: 8,
        marginTop: 8,
    },
    popularLabel: {
        fontSize: 13,
        color: '#4ade80',
        fontWeight: '500',
    },
    popularValue: {
        fontSize: 13,
        color: '#ffffff',
    },
    timeInsightItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 14,
        borderRadius: 8,
        marginBottom: 8,
    },
    timeInsightGold: {
        backgroundColor: '#78350f',
    },
    timeInsightGreen: {
        backgroundColor: '#0d4a3e',
    },
    timeInsightBlue: {
        backgroundColor: '#1e3a8a',
    },
    timeInsightLabel: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    timeInsightIcon: {
        width: 8,
        height: 8,
        borderRadius: 2,
    },
    timeInsightText: {
        fontSize: 14,
        color: '#ffffff',
        fontWeight: '500',
    },
    timeInsightValue: {
        fontSize: 14,
        fontWeight: '600',
    },
    timeInsightValueGold: {
        color: '#fbbf24',
    },
    timeInsightValueGreen: {
        color: '#4ade80',
    },
    timeInsightValueBlue: {
        color: '#60a5fa',
    },
    performanceCard: {
        backgroundColor: '#1a2332',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
    },
    performanceLabel: {
        fontSize: 15,
        color: '#ffffff',
        marginBottom: 12,
        fontWeight: '500',
    },
    performanceBar: {
        height: 8,
        backgroundColor: '#2a3f5f',
        borderRadius: 4,
        overflow: 'hidden',
        marginBottom: 8,
    },
    performanceProgress: {
        height: '100%',
        backgroundColor: '#4ade80',
        borderRadius: 4,
    },
    performanceScore: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    performanceScoreText: {
        fontSize: 13,
        color: '#8b92a7',
    },
    performanceBadge: {
        backgroundColor: '#0d4a3e',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 6,
    },
    performanceBadgeText: {
        fontSize: 12,
        color: '#4ade80',
        fontWeight: '600',
    },
});