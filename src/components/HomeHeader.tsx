/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import { View, Image, TouchableOpacity } from 'react-native'
import { AppColors, responsiveFontSize, responsiveWidth } from '../utils'
import { AppImages } from '../assets/images'
import AppText from './AppText'
import Icon from 'react-native-vector-icons/FontAwesome';

const HomeHeader = () => {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', gap: responsiveWidth(3), alignItems: 'center' }}>
                <Image source={AppImages.header_img} />
                <View>
                    <AppText
                        title={'Jason Smith'}
                        textSize={1.8}
                        textColor={AppColors.Dark_themeColor}
                        textFontWeight
                    />
                    <AppText
                        title={'AMP-657887'}
                        textSize={1.5}
                        textColor={AppColors.ThemeColor}
                    />
                </View>
            </View>
            <TouchableOpacity
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 40,
                    height: 40,
                    borderRadius: 100,
                    backgroundColor: AppColors.ThemeColor
                }}>
                <Icon
                    name={'bell'}
                    size={responsiveFontSize(2.5)}
                    color={AppColors.LIGHTGRAY}
                />
            </TouchableOpacity>
        </View>
    )
}

export default HomeHeader