/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { AppColors, responsiveFontSize } from '../utils'
import SVGXml from '../assets/icons/SVGXML';
import { AppIcons } from '../assets/icons';

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

            {icon ? icon : <SVGXml
                icon={AppIcons.arrow_back(AppColors.Dark_themeColor)}
                width={responsiveFontSize(3)}
                height={responsiveFontSize(3)}
            />}
        </TouchableOpacity>
    )
}

export default BackIcon