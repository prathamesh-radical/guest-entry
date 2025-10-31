import React, { useContext } from 'react';
import { Dimensions, View } from 'react-native';
import { IconButton, Menu } from 'react-native-paper';
import { MyContext } from '../../context/ContextProvider';
import DateTimePicker, { useDefaultStyles } from 'react-native-ui-datepicker';
import { dateTimePickerStyles, Styles } from '../../styles/CalendarModal';

export default function CalendarModal({ modalKey = 'calendar' }) {
    const { selected, setSelected, modalsVisible, toggleModal, orientation } = useContext(MyContext);
    const defaultStyles = useDefaultStyles();
    const { height, width } = Dimensions.get('window');
    const isPortrait = orientation === 'portrait';
    const styles = Styles({ width, height, isPortrait });

    return (
        <View style={styles.container}>
            <Menu
                visible={modalsVisible[modalKey]}
                onDismiss={() => toggleModal(modalKey, false)}
                anchor={
                    <IconButton icon="calendar" mode='outlined' iconColor='#fff' size={20} style={styles.sortButton} onPress={() => toggleModal(modalKey, true)} />
                }
                style={styles.menu}
                contentStyle={styles.contentStyle}
                elevation={0}
            >
                <DateTimePicker
                    mode="single"
                    date={selected}
                    onChange={({ date }) => {
                        setSelected(date);
                        toggleModal(modalKey, false);
                    }}
                    styles={{ ...defaultStyles, ...dateTimePickerStyles }}
                    style={styles.datePicker}
                />
            </Menu>
        </View>
    );
};