import { StyleSheet } from "react-native";

export const Styles = ({ width, height, isPortrait }) => StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    menu: {
        flex: 1,
        marginTop: isPortrait && 40,
        borderRadius: 10,
    },
    contentStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        borderRadius: 10,
        width: isPortrait ? '90%' : '80%',
        left: isPortrait ? "88%" : "10%",
        top: !isPortrait && "-53%",
        height: !isPortrait && "100%",
    },
    sortButton: {
        borderRadius: 10,
        borderWidth: 0,
        backgroundColor: "#0f1419",
    },
    modalContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: "50%",
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    datePicker: {
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        backgroundColor: "#fff",
        paddingHorizontal: 10,
        paddingTop: 10,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
        elevation: 5,
    },
});

export const dateTimePickerStyles = {
    selected: {
        backgroundColor: '#6600ff',
        borderColor: '#6600ff',
        borderWidth: 1,
        borderRadius: 10,
    },
    selected_label: {
        color: '#ffffff',
        fontWeight: 'bold',
    },
    today: {
        color: "#fff",
        borderRadius: 10,
        backgroundColor: '#0f1419',
    },
    today_label: {
        color: "#fff",
        fontWeight: 'bold',
    },
};