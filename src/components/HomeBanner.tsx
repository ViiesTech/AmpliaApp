/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Image, View } from 'react-native';
import { AppColors, responsiveHeight, responsiveWidth } from '../utils';
import AppText from './AppText';
import SmallButton from './SmallButton';
import LineBreak from './LineBreak';
import { AppImages } from '../assets/images';
import { useNavigation } from '@react-navigation/native';

const HomeBanner = () => {
    const nav = useNavigation();
    return (
        <View
            style={{
                backgroundColor: AppColors.app_light,
                paddingVertical: responsiveHeight(2),
                paddingHorizontal: responsiveWidth(4),
                borderRadius: 20,
                flexDirection: 'row',
                alignItems: 'center',
                position: 'relative',
            }}>
            <View>
                <AppText
                    title={'Got Questions?'}
                    textSize={2.3}
                    textColor={AppColors.Dark_themeColor}
                    textFontWeight
                />
                <AppText
                    title={'We’re Here for You!'}
                    textSize={1.8}
                    textColor={AppColors.BLACK}
                    textFontWeight
                />
                <LineBreak space={1} />
                <SmallButton title={'Chat Now'} onPress={() => nav.navigate("LiveChat")} />
            </View>
            <View style={{ position: 'absolute', right: 0, bottom: 0 }}>
                <Image source={AppImages.banner_img} />
            </View>
        </View>
    );
};

export default HomeBanner;