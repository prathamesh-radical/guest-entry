import { StyleSheet } from "react-native";

export const Styles = ({ width, height, isPortrait }) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a1f26',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: isPortrait ? 0 : "1%", 
    },
    backButton: {
        marginRight: 12,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    headerSubtitle: {
        fontSize: 13,
        color: '#a0aec0',
        marginTop: 2,
    },
    content: {
        flex: 1,
        paddingHorizontal: isPortrait ? "2%" : "2%",
    },
    filterSection: {
        padding: 16,
        backgroundColor: '#0f1419',
        margin: isPortrait ? 10 : 0,
        marginBottom: isPortrait ? "4%" : "2%",
        marginHorizontal: 0,
        borderRadius: 12,
    },
    filterMainContainer: {
        flex: 1,
        flexDirection: !isPortrait && 'row',
        justifyContent: !isPortrait && 'space-between',
        alignItems: !isPortrait && 'center',
        gap: 5,
        width: '100%',
    },
    filterSubContainer: {
        flex: 1,
        justifyContent: 'center',
        marginRight: isPortrait ? 0 : "3%"
    },
    filterHeader: {
        marginBottom: 16,
    },
    filterTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    blueDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#2196F3',
        marginRight: 8,
    },
    filterTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
    },
    searchRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        gap: 5,
    },
    searchContainer: {
        flex: 1,
    },
    searchBar: {
        backgroundColor: '#252d36',
        borderRadius: 8,
        elevation: 0,
        height: 45,
        width: "97%",
    },
    searchInput: {
        color: '#fff',
        fontSize: 14,
        marginTop: isPortrait ? "-2.2%" : "-1.5%",
    },
    filterButton: {
        backgroundColor: '#2a323c',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        minWidth: 100,
    },
    filterButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '500',
    },
    filterIcon: {
        margin: 0,
        padding: 0,
    },
    filterByDateButton: {
        flex: 1,
        gap: 5,
        backgroundColor: '#252d36',
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        height: 45,
    },
    filterDateContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    filterPlaceholder: {
        color: '#888',
        fontSize: 14,
    },
    selectedDate: {
        color: '#fff',
        fontSize: 14,
    },
    closeBtn: {
        borderColor: "red",
    },
    statsRow: {
        flex: 1,
        flexDirection: 'row',
        gap: isPortrait ? 10 : 20,
    },
    statsContainer: {
        flexDirection: 'row',
        width: isPortrait ? '31.5%' : '30.3%',
        borderRadius: 12,
    },
    statCard: {
        flex: 1,
        borderRadius: 12,
        paddingVertical: 10,
        paddingHorizontal: 13,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    statContent: {
        // flex: 1,
        width: '60%',
    },
    statLabel: {
        fontSize: 12,
        color: '#fff',
        opacity: 0.9,
        marginBottom: 4,
    },
    statValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
    listSection: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: isPortrait ? 'center' : 'space-between',
        gap: isPortrait ? 0 : 12,
    },
    visitorCard: {
        backgroundColor: '#0f1419',
        borderRadius: 12,
        padding: 16,
        marginBottom: 15,
        borderLeftWidth: 3,
        borderLeftColor: '#6600ff',
        boxShadow: '0px 2px 4px #6600ff',
        width: isPortrait ? "100%" : "49%",
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 5,
    },
    cardHeaderLeft: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 10,
    },
    visitorNumber: {
        backgroundColor: '#2C2C2C',
        fontSize: 14,
        paddingVertical: 3,
        paddingHorizontal: 8,
        borderRadius: 8,
        color: '#ccc',
        fontWeight: '600',
    },
    visitorName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
    statusBadge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    statusText: {
        fontSize: 11,
        color: '#fff',
        fontWeight: '600',
        textTransform: 'lowercase',
    },
    dateTime: {
        fontSize: 12,
        color: '#888',
    },
    cardBody: {
        gap: 8,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    infoIcon: {
        margin: 0,
        marginRight: 4,
    },
    infoText: {
        fontSize: 13,
        color: '#ccc',
        flex: 1,
    },
});