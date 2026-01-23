import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { AppColors, responsiveHeight, responsiveWidth } from '../utils';

interface DropDownItem {
    label: string;
    value: string;
}

interface AppDropDownProps {
    items?: DropDownItem[];
    value?: string | null;
    onChangeValue?: (value: string | null) => void;
    placeholder?: string;
}

const AppDropDown: React.FC<AppDropDownProps> = ({
    items: propItems = [],
    value: propValue = null,
    onChangeValue,
    placeholder = 'Choose year',
}) => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState<string | null>(propValue);
    const [items, setItems] = useState<DropDownItem[]>(propItems);

    // Sync with prop changes
    useEffect(() => {
        if (propItems.length > 0) {
            setItems(propItems);
        }
    }, [propItems]);

    useEffect(() => {
        setValue(propValue);
    }, [propValue]);

    const handleValueChange = (val: string | null) => {
        setValue(val);
        if (onChangeValue) {
            onChangeValue(val);
        }
    };

    return (
        <View style={styles.container}>
            <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={handleValueChange as any}
                setItems={setItems}
                placeholder={placeholder}
                placeholderStyle={{color: AppColors.GRAY}}
                style={styles.dropdown}
                dropDownContainerStyle={styles.dropdownContainer}
                listMode="SCROLLVIEW"
                zIndex={1000}
                zIndexInverse={3000}
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
