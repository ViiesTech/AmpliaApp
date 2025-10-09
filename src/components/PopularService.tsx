/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import { View, Image, TouchableOpacity } from 'react-native'
import { AppColors, responsiveFontSize, responsiveHeight, responsiveWidth } from '../utils'
import AppText from './AppText'
import LineBreak from './LineBreak'
import Icon from 'react-native-vector-icons/Entypo';

type Props = {
    image?: any,
    title?: any,
    rating?: any,
    price?: any,
}

const PopularService = ({ image, title, rating, price }: Props) => {
    return (
        <TouchableOpacity
            style={{
                backgroundColor: AppColors.app_light,
                width: responsiveWidth(45),
                paddingBottom: responsiveHeight(1.5),
                borderRadius: 15,
            }}>
            <Image source={image} />
            <LineBreak space={1.5} />
            <View style={{ paddingHorizontal: responsiveWidth(4) }}>
                <AppText
                    title={title}
                    textSize={1.8}
                    textColor={AppColors.ThemeColor}
                    textFontWeight
                    numberOfLines={1}
                />
                <View style={{ flexDirection: 'row', gap: responsiveWidth(2) }}>
                    <View style={{ flexDirection: 'row' }}>
                        {[...Array(5)].map((_, index) => (
                            <Icon
                                key={index}
                                name="star"
                                size={responsiveFontSize(2.2)}
                                color={AppColors.ThemeColor}
                            />
                        ))}
                    </View>
                    <AppText
                        title={rating}
                        textSize={1.8}
                        textColor={AppColors.GRAY}
                        textFontWeight
                    />
                </View>
                <LineBreak space={0.5} />
                <AppText
                    title={price}
                    textSize={1.8}
                    textColor={AppColors.GRAY}
                    textFontWeight
                />
            </View>
        </TouchableOpacity>
    )
}

export default PopularService