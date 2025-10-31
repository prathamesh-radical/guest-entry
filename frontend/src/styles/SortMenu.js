import { StyleSheet } from "react-native";

export const Styles = ({ width, height, isPortrait }) => StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    modalContainer: {
        flexGrow: 1,
    },
    sortButton: {
        backgroundColor: "#252d36",
        borderRadius: 10,
    },
    menu: {
        marginTop: 40,
        backgroundColor: "#fff",
        borderRadius: 10,
        backgroundColor: '#fff',
        height: !isPortrait && "55%",
    },
    contentStyle: {
        backgroundColor: '#fff',
        borderRadius: 10,
        height: !isPortrait && "100%",
    },
});