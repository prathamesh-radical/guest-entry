import { StyleSheet } from 'react-native';

export const Styles = ({ width, height, isPortrait }) => StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#1A1A1A',
        borderRadius: 16,
        marginBottom: 16,
        padding: 20,
        borderWidth: 1,
        borderColor: '#2A2A2A',
    },
    modalTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 16,
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
        marginTop: 5,
        borderWidth: 1,
        borderColor: '#333',
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
        marginTop: "4%",
    },
    buttonLabelStyle: {
        color: '#fff',
        fontSize: 14,
    },
});