import { StyleSheet } from "react-native";

export const Styles = ({ width, height, isPortrait }) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a1f26',
    },
    header: {
        flexDirection: 'row',
        paddingTop: 15,
        paddingBottom: 10,
        backgroundColor: '#1a1f26',
        marginHorizontal: isPortrait ? 0 : "1%",
    },
    backButton: {
        backgroundColor: '#0f1419',
        borderRadius: 10,
        margin: 0,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 4,
    },
    headerSubtitle: {
        fontSize: 14,
        color: '#888',
    },
    scrollContent: {
        paddingHorizontal: isPortrait ? "5%" : "10%",
        paddingVertical: 20,
        paddingBottom: 40,
    },
    
    // Profile Card Styles
    profileCard: {
        backgroundColor: '#0f1419',
        borderRadius: 20,
        padding: 30,
        alignItems: 'center',
        marginBottom: 24,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    avatar: {
        backgroundColor: '#1B7EDA',
        borderWidth: 5,
        borderColor: '#2a3139',
        shadowColor: '#1B7EDA',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
        marginBottom: 16,
    },
    avatarLabel: {
        fontSize: 40,
        fontWeight: '700',
        color: '#fff',
    },
    userName: {
        fontSize: 22,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 8,
    },
    badgeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1B7EDA',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        gap: 6,
    },
    badgeText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '600',
    },

    // Performance Stats
    statsContainer: {
        flex: 1,
        flexDirection: 'column',
        gap: 12,
        backgroundColor: "#0f1419",
        padding: 20,
        borderRadius: 10,
    },
    statsTitleContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    statsTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#fff',
        marginLeft: 10,
    },
    stats: {
        flex: 1,
        flexDirection: 'row',
        gap: 12,
    },
    statCard: {
        flex: 1,
        borderRadius: 16,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    statIcon: {
        position: "absolute",
        right: 0,
        padding: 25,
        borderTopRightRadius: 16,
        borderBottomLeftRadius: 50,
        backgroundColor: '#419C45',
    },
    statNumber: {
        fontSize: 32,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 13,
        color: '#fff',
        fontWeight: '600',
        marginBottom: 4,
        opacity: 0.9,
    },
    statSubLabel: {
        fontSize: 11,
        color: '#fff',
        opacity: 0.8,
    },

    // Section Header
    sectionHeader: {
        flexDirection: 'col',
        justifyContent: 'space-between',
        marginBottom: 16,
        backgroundColor: '#0f1419',
        padding: 20,
        borderRadius: 10,
    },
    sectionTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        backgroundColor: '#0f1419',
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#fff',
    },
    editIconContainer: {
        flex: 1,
        alignItems: 'flex-end',
    },
    infoItem: {
        flexDirection: 'col',
        paddingVertical: 16,
        gap: 5,
    },
    label: {
        color: "#B0BEC5",
    },
    inputContainer: {
        flex: 1,
        flexDirection: "row",
        gap: 10,
    },
    inputField: {
        color:"#000",
        height: 40,
        borderWidth: 1,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderColor: "#1E88E5",
        borderRadius: 10,
        backgroundColor: "#F8F8F8",
        paddingHorizontal: 15,
    },

    // Info Card
    infoCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        borderRadius: 16,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
    },
    infoItemBorder: {
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.05)',
    },
    infoIconContainer: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: 'rgba(27, 126, 218, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    infoContent: {
        flex: 1,
        gap: 4,
    },
    infoLabel: {
        fontSize: 13,
        color: '#888',
        fontWeight: '500',
    },
    infoValue: {
        fontSize: 15,
        color: '#fff',
        fontWeight: '600',
    },
});