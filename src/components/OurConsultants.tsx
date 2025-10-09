/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import { View, Image } from 'react-native'
import { AppImages } from '../assets/images'
import { AppColors, responsiveWidth } from '../utils'
import AppText from './AppText'

const OurConsultants = () => {
    return (
        <View
            style={{
                flexDirection: 'row',
                gap: responsiveWidth(2),
                alignItems: 'center',
                borderRadius: responsiveWidth(10),
                backgroundColor: AppColors.app_light,
                paddingRight: responsiveWidth(4),
            }}>
            <Image source={AppImages.consultant} style={{
                width: 50,
                height: 50,
                borderRadius: 100,
                borderWidth: 1,
                borderColor: AppColors.ThemeColor,
                backgroundColor: AppColors.lighttest_gray
            }} />
            <View>
                <AppText
                    title={'Emma Thompson'}
                    textSize={1.5}
                    textColor={AppColors.ThemeColor}
                    textFontWeight
                />
                <AppText
                    title={'Tax Prep Specialist'}
                    textSize={1.2}
                    textColor={AppColors.ThemeColor}
                />
            </View>
        </View>
    )
}

export default OurConsultants