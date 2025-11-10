import { StyleSheet, Dimensions } from 'react-native';

export const Styles = ({ width, height, isPortrait }) => StyleSheet.create({
    blurContainer: {
        flexGrow: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    modal: {
        backgroundColor: '#1A1A1A',
        borderRadius: 16,
        paddingVertical: 16,
        paddingHorizontal: 20,
        width: isPortrait ? '100%' : '60%',
        borderWidth: 1,
        borderColor: '#2A2A2A',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    modalTitle: {
        color: '#1E90FF',
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 20,
        textAlign: 'center',
    },
    nameContainer: {
        flexDirection: 'row',
        gap: 20,
    },
    nameFieldContainer: {
        width: '100%',
    },
    label: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 4,
    },
    inputField: {
        backgroundColor: '#2A2A2A',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        color: '#fff',
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#333',
    },
    dropdownStyle: {
        borderColor: "#333",
        backgroundColor: "#2A2A2A",
        minHeight: 45,
        paddingHorizontal: 15,
        marginBottom: 10,
    },
    dropDownContainerStyle: {
        borderColor: "#333",
        backgroundColor: "#2A2A2A",
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: isPortrait ? '5%' : "4%",
    },
    button: {
        justifyContent: 'center',
        alignContent: 'center',
        borderRadius: 10,
        width: isPortrait ? '48%' : '48%',
        height: 45,
        marginTop: "6%",
    },
    buttonLabelStyle: {
        color: '#fff',
        fontSize: 14,
    },
});