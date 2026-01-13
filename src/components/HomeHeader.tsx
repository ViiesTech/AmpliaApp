/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import { View, Image, TouchableOpacity } from 'react-native'
import { AppColors, responsiveFontSize, responsiveWidth } from '../utils'
import { AppImages } from '../assets/images'
import AppText from './AppText'
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'

const HomeHeader = () => {
    const { user } = useSelector(state => state.persistedData)
    const nav = useNavigation();
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', gap: responsiveWidth(3), alignItems: 'center' }}>
                <Image style={{ width: 40, height: 40, borderRadius: 40, backgroundColor: AppColors.light_themeColor, }} source={user?.profile ? { uri: user?.profile } : AppImages.userprofile} />
                <View>
                    <AppText
                        title={`${user?.firstName + ' ' + user?.lastName + ' '}`}
                        textSize={1.8}
                        textColor={AppColors.Dark_themeColor}
                        textFontWeight
                    />
                    <AppText
                        title={`#${user?._id?.slice(-4)}`}
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
                }}
                onPress={() => nav.navigate("Notification")}
            >
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