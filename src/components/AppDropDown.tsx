import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { AppColors, responsiveHeight, responsiveWidth } from '../utils';

const AppDropDown = () => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([]);

    return (
        <View style={styles.container}>
            <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                placeholder="Choose year"
                placeholderStyle={{color: AppColors.GRAY}}
                style={styles.dropdown}
                dropDownContainerStyle={styles.dropdownContainer}
            />
        </View>
    );
};

export default AppDropDown;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dropdown: {
        borderColor: '#ccc',
        borderRadius: 100,
        backgroundColor: '#F6F8F8',
        paddingHorizontal: responsiveWidth(6),
        height: responsiveHeight(7),
    },
    dropdownContainer: {
        borderColor: '#ccc',
    },
});
