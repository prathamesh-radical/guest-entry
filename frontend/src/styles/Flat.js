import { StyleSheet } from 'react-native';

export const Styles = ({ width, height, isPortrait }) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingVertical: 10,
        backgroundColor: '#0A0A0A',
        marginHorizontal: isPortrait ? 0 : "1%",
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 5,
    },
    addButton: {
        backgroundColor: '#2196F3',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
        borderRadius: 8,
        marginBottom: 16,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 8,
    },

    // Search Bar
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        gap: 15,
    },
    searchBar: {
        flex: 1,
        height: 48,
        backgroundColor: '#1A1A1A',
        borderWidth: 1,
        borderColor: '#2A2A2A',
        borderRadius: 8,
        elevation: 0,
    },
    searchInput: {
        marginTop: isPortrait ? "-1.5%" : "-0.7%",
        height: 48,
        color: "#fff",
        fontSize: 14,
    },
    dropdownIcon: {
        position: 'absolute',
        right: 0,
        margin: 0,
    },

    // Scroll Content
    scrollContent: {
        paddingBottom: 20,
        padding: 16,
        paddingTop: 0,
        paddingHorizontal: isPortrait ? "5%" : "8%",
    },

    // Flat Cards Container
    flatCardsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 16,
    },

    // Flat Card
    flatCard: {
        backgroundColor: '#2a2a2a',
        borderRadius: 12,
        overflow: 'hidden',
    },

    // Card Header
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        paddingBottom: 5,
        backgroundColor: '#2a2a2a',
    },
    flatBadge: {
        backgroundColor: '#00bcd4',
        width: 30,
        height: 25,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    flatBadgeText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
    flatTitleContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginLeft: 12,
    },
    flatNumber: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    floorNumberContainer: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: '#1A1A1A',
        borderWidth: 1,
        borderColor: '#2A2A2A',
        borderRadius: 8,
    },
    floorNumber: {
        color: '#fff',
        fontSize: 13,
        marginTop: 2,
    },
    locationButton: {
        position: "absolute",
        top: "20%",
        right: 0,
        padding: 8,
    },

    // Card Content
    cardContent: {
        padding: 16,
        paddingTop: 0,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    infoText: {
        color: '#ccc',
        fontSize: 14,
        marginLeft: 8,
    },

    // Card Footer
    cardFooter: {
        padding: 16,
        paddingTop: 8,
        borderTopWidth: 1,
        borderTopColor: '#333',
    },
    dateText: {
        color: '#888',
        fontSize: 12,
    },
    iconButtonContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        position: 'absolute',
        bottom: 5,
        right: 0,
    },
    iconButton: {
        position: 'absolute',
        top: -10,
        right: -10,
        padding: 8,
        backgroundColor: '#1E1E1E',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#2A2A2A',
    },

    // Empty State
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 60,
    },
    emptyText: {
        color: '#888',
        fontSize: 16,
    },
});