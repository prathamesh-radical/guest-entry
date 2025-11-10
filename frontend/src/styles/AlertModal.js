import { StyleSheet, Dimensions } from 'react-native';

export const Styles = ({ width, height, isPortrait }) => StyleSheet.create({
    blurContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1A1A1A',
        borderRadius: 16,
        paddingVertical: 16,
        marginBottom: 20,
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
        color: '#fff',
        fontSize: 20,
        fontWeight: '600',
        marginTop: 5,
        textAlign: 'center',
    },
    modalText: {
        color: '#ccc',
        fontSize: 16,
        marginTop: 5,
    },
    modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 20,
        marginTop: 20,
    },
    modalButton: {
        flex: 1,
        borderRadius: 8,
        alignItems: 'center',
    },
    modalButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});