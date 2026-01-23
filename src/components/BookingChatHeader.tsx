/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import { View, Image, TouchableOpacity } from 'react-native'
import { AppColors, responsiveFontSize, responsiveHeight, responsiveWidth } from '../utils'
import BackIcon from './BackIcon'
import { AppImages } from '../assets/images'
import AppText from './AppText'
import SVGXml from '../assets/icons/SVGXML';
import { AppIcons } from '../assets/icons';
import { useNavigation } from '@react-navigation/native'

const BookingChatHeader = () => {
    const nav = useNavigation();
    return (
        <View
            style={{
                flexDirection: 'row',
                gap: responsiveWidth(2),
                alignItems: 'center',
                paddingVertical: responsiveHeight(2),
            }}
        >
            <BackIcon onPress={() => nav.goBack()} />
            <Image
                source={AppImages.consultant}
                style={{
                    width: 45,
                    height: 45,
                    borderRadius: 100,
                    borderWidth: 2,
                    borderColor: AppColors.ThemeColor,
                }}
            />
            <View>
                <AppText
                    title={'Tax Preparation & Filing'}
                    textSize={1.8}
                    textColor={AppColors.ThemeColor}
                    textFontWeight
                />
                <AppText
                    title={'J William Consultant'}
                    textSize={1.6}
                    textColor={AppColors.ThemeColor}
                />
            </View>
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
                <TouchableOpacity>
                    <SVGXml
                        icon={AppIcons.dots_vertical(AppColors.ThemeColor)}
                        width={responsiveFontSize(2)}
                        height={responsiveFontSize(2)}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default BookingChatHeader