import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    loader: {
        width: 40,
        height: 40,
    },
    iconCircle: {
        justifyContent: 'center',
        alignItems: 'center',   // ✅ fixed for circle
        backgroundColor: '#1B3861',
        borderColor: '#275C90',
        borderWidth: 2,
        padding: 15,
        borderRadius: 25,
    },
    text1: {
        marginTop: 20,
        fontSize: 30,
        color: '#4FA3FF',
    },
    text2: {
        marginTop: 10,
        fontSize: 15,
        color: '#CAD5E2',
    },
    text3: {
        marginTop: 1,
        marginBottom: 10,
        fontSize: 13,
        color: '#CAD5E2',
    },
    img: {
    },
    imgContainer: {
        padding: 8,
        backgroundColor: 'green',
        borderRadius: 50,
        position: 'absolute',
        top: -8,
        right: -10,
    }
});