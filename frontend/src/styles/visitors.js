import { StyleSheet } from "react-native";

export const Styles = ({ width, height, isPortrait }) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a1f26',
    },
    header: {
        flexDirection: 'row',
        paddingTop: 10,
        paddingBottom: 12,
        backgroundColor: '#1a1f26',
        paddingHorizontal: isPortrait ? 0 : "1%", 
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 4,
    },
    headerSubtitle: {
        fontSize: 14,
        color: '#888',
    },
    filterSection: {
        flex: 1,
        backgroundColor: '#0f1419',
        padding: 16,
        marginBottom: isPortrait ? "4%" : "3%",
        borderRadius: 10,
        marginHorizontal: isPortrait ? "4%" : "3%",
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
    sectionTitleContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
    },
    searchRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        gap: 5,
        width: '100%',
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
        marginTop: isPortrait ? "-2.2%" : "-0.7%",
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
    calendarIcon: {
        margin: 0,
        marginRight: 4,
    },
    statsContainer: {
        flexDirection: 'row',
        width: isPortrait ? '100%' : '25%',
        marginTop: !isPortrait && "-2%",
        borderRadius: 12,
    },
    statCard: {
        flex: 1,
        borderRadius: 12,
        paddingVertical: isPortrait ? 16 : "18%",
        paddingHorizontal: isPortrait ? "10%" : "15%",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    statContent: {
        flex: 1,
    },
    statLabel: {
        fontSize: 12,
        color: 'rgba(255, 255, 255, 0.8)',
    },
    statValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
    statIcon: {
        margin: 0,
    },
    listContainer: {
        flex: 1,
    },
    listContent: {
        paddingTop: 8,
        marginHorizontal: isPortrait ? 0 : "5%",
    },
    visitorListContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: isPortrait ? 'center' : 'space-between',
        paddingHorizontal: isPortrait ? "4%" : "3%",
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
        width: isPortrait ? "100%" : "48%",
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    cardHeaderLeft: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 10,
    },
    visitorNumber: {
        backgroundColor: '#26A69A',
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
    noDataContainer: {
        padding: 40,
        alignItems: 'center',
    },
    noDataText: {
        fontSize: 16,
        color: '#888',
    },
});