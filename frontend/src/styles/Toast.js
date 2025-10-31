import { StyleSheet } from "react-native";

export const Styles = () => StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
    },

    // Common Toast Styles
    toastWrapper: {
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderRadius: 8,
        minHeight: 60,
        justifyContent: 'center',
    },

    toastContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },

    textContainer: {
        flex: 1,
        justifyContent: 'center',
    },

    // Success Toast Style
    successStyle: {
        borderLeftWidth: 4,
        borderLeftColor: 'green',
        backgroundColor: '#e6ffe6',
        width: "90%",
    },
    successStyleLogin: {
        borderLeftWidth: 4,
        borderLeftColor: 'green',
        backgroundColor: '#e6ffe6',
        width: "90%",
    },
    successText1Style: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'green',
        marginBottom: 2,
    },
    successText2Style: {
        fontSize: 13,
        color: '#2d5016',
        marginTop: 2,
    },
    successImgStyle: {
        width: 24,
        height: 24,
        resizeMode: "contain",
        tintColor: "green",
    },

    // Error Toast Style
    errorStyle: {
        borderLeftWidth: 4,
        borderLeftColor: 'red',
        backgroundColor: '#ffe6e6',
        width: "90%",
    },
    errorText1Style: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'red',
        marginBottom: 2,
    },
    errorText2Style: {
        fontSize: 13,
        color: '#8b0000',
        marginTop: 2,
    },
    errorIconContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    errorIconSize: 24,

    // Info Toast Style
    infoStyle: {
        borderLeftWidth: 4,
        borderLeftColor: '#00e6e6',
        backgroundColor: '#ccffff',
        width: "90%",
    },
    infoStyleLogin: {
        borderLeftWidth: 4,
        borderLeftColor: 'green',
        backgroundColor: '#ccffff',
        width: "90%",
    },
    infoText1Style: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#00cccc',
        marginBottom: 2,
    },
    infoText2Style: {
        fontSize: 13,
        color: '#00b3b3',
        marginTop: 2,
    },
    infoImgStyle: {
        width: 24,
        height: 24,
        resizeMode: "contain",
        tintColor: "green",
    },
});