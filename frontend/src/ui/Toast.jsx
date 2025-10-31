import { Image, View, Text } from 'react-native';
import { Icon } from 'react-native-paper';
import { Styles } from '../styles/Toast';

export const SuccessToast = (props) => {
    const isLoginSuccess = props.text1 && props.text1.includes('Welcome');
    const styles = Styles();
    const successStyle = isLoginSuccess ? styles.successStyleLogin : styles.successStyle;

    return (
        <View style={styles.container}>
            <View style={[successStyle, styles.toastWrapper]}>
                <View style={styles.toastContent}>
                    <Image
                        source={require("../../assets/icons/check.png")}
                        style={styles.successImgStyle}
                    />
                    <View style={styles.textContainer}>
                        <Text style={styles.successText1Style}>{props.text1}</Text>
                        {props.text2 && (
                            <Text style={styles.successText2Style}>{props.text2}</Text>
                        )}
                    </View>
                </View>
            </View>
        </View>
    );
};

export const ErrorToast = (props) => {
    const styles = Styles();

    return (
        <View style={styles.container}>
            <View style={[styles.errorStyle, styles.toastWrapper]}>
                <View style={styles.toastContent}>
                    <View style={styles.errorIconContainer}>
                        <Icon source="close-circle-outline" size={styles.errorIconSize} color="red" />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.errorText1Style}>{props.text1}</Text>
                        {props.text2 && (
                            <Text style={styles.errorText2Style}>{props.text2}</Text>
                        )}
                    </View>
                </View>
            </View>
        </View>
    );
}

export const InfoToast = (props) => {
    const styles = Styles();

    return (
        <View style={styles.container}>
            <View style={[styles.infoStyle, styles.toastWrapper]}>
                <View style={styles.toastContent}>
                    <Icon source="information-outline" size={25} color="#00cccc" />
                    <View style={styles.textContainer}>
                        <Text style={styles.infoText1Style}>{props.text1}</Text>
                        {props.text2 && (
                            <Text style={styles.infoText2Style}>{props.text2}</Text>
                        )}
                    </View>
                </View>
            </View>
        </View>
    );
}