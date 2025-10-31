import React, { useContext, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { MyContext } from '../../context/ContextProvider';

export default function VisitorSortMenu({ toggleSort }) {
    const { orientation } = useContext(MyContext);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'S. No.', value: 'sno' },
        { label: 'Visitor Name', value: 'vname' },
        { label: 'Phone No.', value: 'pno' },
        { label: 'Address', value: 'address' },
        { label: 'Vehicle Type', value: 'vtype' },
        { label: 'Vehicle No', value: 'vno' },
        { label: 'Person to meet', value: 'ptm' },
        { label: 'Apartment Name', value: 'apartmentname' },
        { label: 'Floor No.', value: 'floorno' },
        { label: 'Flat No.', value: 'flatno' },
        { label: 'Date', value: 'date' },
    ]);
    const { height, width } = Dimensions.get('window');
    const isPortrait = orientation === 'portrait';
    const styles = Styles({ width, height, isPortrait });

    const handleValueChange = (selectedValue) => {
        if (selectedValue) {
            toggleSort(selectedValue);
            setValue(null);
        }
    };

    return (
        <View style={styles.container}>
            <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                onChangeValue={handleValueChange}
                placeholder="Sort by"
                placeholderStyle={styles.placeholder}
                style={styles.dropdown}
                textStyle={styles.text}
                dropDownContainerStyle={styles.dropdownContainer}
                arrowIconStyle={styles.arrowIcon}
                tickIconStyle={styles.tickIcon}
                iconContainerStyle={styles.iconContainer}
                listItemLabelStyle={{ color: '#fff' }}
                listMode="SCROLLVIEW"
                scrollViewProps={{
                    nestedScrollEnabled: true,
                }}
                zIndex={3000}
                zIndexInverse={1000}
                dropDownDirection='BOTTOM'
            />
        </View>
    );
}

const Styles = ({ width, height, isPortrait }) => StyleSheet.create({
    container: {
        width: isPortrait ? "39%" : "30%",
        zIndex: 3000,
    },
    dropdown: {
        backgroundColor: '#252d36',
        borderRadius: 8,
        minHeight: 47,
        paddingHorizontal: 10,
    },
    dropdownContainer: {
        backgroundColor: '#252d36',
        borderRadius: 8,
        maxHeight: 500,
    },
    placeholder: {
        color: '#888',
        fontSize: 14,
    },
    text: {
        color: '#fff',
        fontSize: 14,
    },
    arrowIcon: {
        tintColor: '#888',
    },
    tickIcon: {
        tintColor: '#fff',
    },
    iconContainer: {
        right: 10,
    },
});