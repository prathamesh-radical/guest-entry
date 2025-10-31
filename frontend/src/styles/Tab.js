import { StyleSheet } from "react-native";

export const Styles = ({ isPortrait }) => StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        height: "100%",
    },
    tabContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    contentContainerStyle: {
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        marginLeft: isPortrait ? "10%" : "18%",
        marginRight: isPortrait ? "16%" : "20%",
    },
    tabText: {
        fontSize: 15,
        paddingVertical: 15,
        marginLeft: 10,
        textAlign: "center",
    },
});