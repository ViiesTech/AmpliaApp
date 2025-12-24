/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import { View, Image, TouchableOpacity } from 'react-native'
import { AppColors, responsiveHeight, responsiveWidth } from '../utils'
import AppText from './AppText'
import LineBreak from './LineBreak'
import { useNavigation } from '@react-navigation/native'
import RatingView from './RatingView'

type Props = {
    image?: any,
    title?: any,
    rating?: any,
    price?: any,
    onPress?: () => void
}

const PopularService = ({ image, title, rating, price, onPress }: Props) => {
    const nav = useNavigation();
    return (
        <TouchableOpacity
            style={{
                backgroundColor: AppColors.app_light,
                width: responsiveWidth(45),
                paddingBottom: responsiveHeight(1.5),
                borderRadius: 15,
            }} onPress={onPress}>
            <Image source={image} style={{
                width: responsiveWidth(45),
                borderRadius: 10,
                resizeMode: 'cover',
                height: responsiveHeight(10)
            }} />
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
                    <RatingView rating={rating} />
                    <AppText
                        title={rating}
                        textSize={1.8}
                        textColor={AppColors.GRAY}
                        textFontWeight
                    />
                </View>
                <LineBreak space={0.5} />
                {price?.map((item) => {
                    return (
                        <AppText
                            title={`$${item.price}`}
                            textSize={1.8}
                            textColor={AppColors.GRAY}
                            textFontWeight
                        />
                    )
                })}
            </View>
        </TouchableOpacity>
    )
}

export default PopularService