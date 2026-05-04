import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    // Existing styles ke andar add karein:
    modalContainer: {
        backgroundColor: '#0f1419', // Dark background matching your cards
        padding: 24,
        margin: 20,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(255, 82, 82, 0.3)', // Subtle red border
        elevation: 10,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#FF5252',
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 5,
    },
    modalSubtitle: {
        fontSize: 13,
        color: '#888',
        textAlign: 'center',
        marginBottom: 20,
        lineHeight: 18,
    },
    modalActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 12,
        marginTop: 25,
    },
    cancelButton: {
        flex: 1,
        borderRadius: 10,
        borderColor: '#444',
    },
    deleteConfirmButton: {
        flex: 1,
        backgroundColor: '#EE4242',
        borderRadius: 10,
    },
    errorText: {
        color: '#FF5252',
        fontSize: 12,
        marginTop: 5,
        marginLeft: 5,
    }
});