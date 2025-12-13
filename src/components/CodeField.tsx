/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import { AppColors, responsiveFontSize, responsiveHeight, responsiveWidth } from '../utils';

const CELL_COUNT = 4;

interface otpProps {
    value: string;
    setValue: (value: string) => void;
}

const FieldCode = ({value,setValue}: otpProps) => {
    // const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });

    return (
        <View style={styles.container}>
            <CodeField
                ref={ref}
                {...props}
                value={value}
                onChangeText={setValue}
                cellCount={CELL_COUNT}
                rootStyle={styles.codeFieldRoot}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                renderCell={({ index, symbol, isFocused }) => (
                    <View
                        key={index}
                        style={[
                            styles.cellRoot,
                            { borderWidth: 1, borderColor: AppColors.LIGHTGRAY },
                            isFocused && styles.focusCell,
                        ]}
                        onLayout={getCellOnLayoutHandler(index)}>
                        <Text style={styles.cellText}>
                            {symbol || (isFocused ? <Cursor /> : null)}
                        </Text>
                    </View>
                )}
            />
        </View>
    );
};

export default FieldCode;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    codeFieldRoot: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: responsiveWidth(90),
    },
    cellRoot: {
        width: responsiveWidth(20),
        height: responsiveHeight(6),
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: AppColors.BLACK,
        borderRadius: 100,
    },
    cellText: {
        fontSize: responsiveFontSize(3),
        color: AppColors.BLACK,
        fontWeight: '500',
    },
    focusCell: {
        borderColor: AppColors.ThemeColor,
        borderRadius: 100,
        overflow: 'hidden'
    },
});
