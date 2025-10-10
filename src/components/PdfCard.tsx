/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import { View, TouchableOpacity, Image } from 'react-native'
import { AppColors, responsiveHeight, responsiveWidth } from '../utils'
import { AppImages } from '../assets/images'
import LineBreak from './LineBreak'
import AppText from './AppText'

type Prop = {
    title?: any,
}

const PdfCard = ({ title }: Prop) => {
    return (
        <TouchableOpacity style={{
            backgroundColor: AppColors.app_light,
            width: responsiveWidth(42),
            paddingBottom: responsiveHeight(1.5),
            borderRadius: 15,
        }}>
            <Image source={AppImages.pdf} style={{ width: responsiveWidth(42) }} />
            <LineBreak space={1.5} />

            <View style={{ flex: 1, paddingHorizontal: responsiveWidth(4) }}>
                <AppText
                    title={title}
                    textSize={1.8}
                    textColor={AppColors.ThemeColor}
                    textFontWeight
                    textwidth={40}
                />
            </View>
        </TouchableOpacity>
    )
}

export default PdfCard