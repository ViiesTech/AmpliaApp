/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { AppColors, responsiveFontSize } from '../utils'
import Ionicons from 'react-native-vector-icons/Ionicons';

type Props = {
    onPress?: any;
    icon?: any;
}

const BackIcon = ({ onPress, icon }: Props) => {
    return (
        <TouchableOpacity
            style={{
                backgroundColor: AppColors.app_light,
                width: 40,
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 100,
            }}
            onPress={onPress}
        >

            {icon ? icon : <Ionicons
                name="arrow-back"
                size={responsiveFontSize(3)}
                color={AppColors.Dark_themeColor}
            />}
        </TouchableOpacity>
    )
}

export default BackIcon