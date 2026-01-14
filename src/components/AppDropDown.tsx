import React, { useState, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { AppColors, responsiveHeight, responsiveWidth } from '../utils';

const AppDropDown = ({
    value,
    setValue = () => { },
    items: propItems,
    placeholder = 'Choose year',
    zIndex = 1000,
}) => {
    const [open, setOpen] = useState(false);

    // Default year list if no items are passed
    const defaultItems = useMemo(() => {
        const currentYear = new Date().getFullYear();
        return Array.from({ length: 20 }, (_, i) => {
            const year = currentYear - i;
            return { label: `${year}`, value: year };
        });
    }, []);

    const items = propItems || defaultItems;

    return (
        <View style={[styles.container, { zIndex }]}>
            <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={(callback) => {
                    const selectedValue = callback(value);
                    setValue(selectedValue);
                }}
                placeholder={placeholder}
                placeholderStyle={{ color: AppColors.GRAY }}
                style={styles.dropdown}
                dropDownContainerStyle={styles.dropdownContainer}
                listMode="SCROLLVIEW"
            />
        </View>
    );
};

export default AppDropDown;

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    dropdown: {
        borderColor: '#ccc',
        borderRadius: 30,
        backgroundColor: '#F6F8F8',
        paddingHorizontal: responsiveWidth(6),
        height: responsiveHeight(7),
    },
    dropdownContainer: {
        borderColor: '#ccc',
        backgroundColor: '#FFF',
    },
});

