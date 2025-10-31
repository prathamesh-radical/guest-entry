import { StyleSheet } from "react-native";

export const Styles = ({ width, height, isPortrait }) => StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    searchBarContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignContent: "center",
    },
    searchBar: {
        width: "80%",
        margin: 10,
        height: 45,
        borderRadius: 10,
        borderColor: '#6600ff',
        borderWidth: 2,
        backgroundColor: "#fff",
    },
    searchBarInput: {
        color: "#000",
        position: "relative",
        bottom: 7,
    },
    sortButton: {
        margin: 10,
        marginLeft: 0,
        backgroundColor: "#6600ff",
        borderRadius: 10,
    },
    scrollContainer: {
        flexGrow: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    dataTable: {
        flex: 1,
        width: "100%",
        borderWidth: 0,
        backgroundColor: "#fff",
    },
    tableHeader: {
        borderWidth: 0,
        borderColor: "#6600ff",
        backgroundColor: "#6600ff",
    },
    checkboxCell: {
        flex: 1,
        justifyContent: "center",
        position: "relative",
    },
    userNameTitle: {
        flex: isPortrait ? 2 : 2,
        justifyContent: isPortrait ? "center" : "flex-start",
    },
    eventDateTitle: {
        flex: isPortrait ? 2 : 1,
        justifyContent: "center",
        position: "relative",
    },
    actionTitle: {
        flex: 1,
        justifyContent: "center",
    },
    headerText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 14,
    },
    scrollContainer: {
        flexGrow: 1,
        backgroundColor: "#fff",
    },
    tableRow: {
        borderBottomWidth: 0,
        backgroundColor: "#F8F8F8",
        marginTop: 10,
    },
    userCheckboxCell: {
        flex: 1,
        justifyContent: "center",
        position: "relative",
        paddingVertical: 0,
    },
    userNameCell: {
        flex: isPortrait ? 2 : 2,
        justifyContent: "flex-start",
        position: "relative",
    },
    eventDateCell: {
        flex: isPortrait ? 2 : 1,
        justifyContent: "center",
        position: "relative",
    },
    actionCell: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    nodatacontainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});