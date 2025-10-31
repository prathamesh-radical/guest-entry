import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        width: '100%',
    },
    subContainer: {
        flexGrow: 1,
        paddingVertical: 20,
        paddingHorizontal: 20,
    },
    label: {
        fontSize: 20,
        marginBottom: 10,
    },
    inputField: {
        color:"#000",
        width: "100%",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        backgroundColor: "#F8F8F8",
        marginVertical: 8,
        paddingHorizontal: 15,
    },
    button: {
        backgroundColor: '#6600ff',
        justifyContent: 'center',
        alignContent: 'center',
        marginVertical: 8,
        borderRadius: 10,
        width: '100%',
        height: 45,
    },
    buttonLabelStyle: {
        color: '#fff',
        fontSize: 18,
    },
});