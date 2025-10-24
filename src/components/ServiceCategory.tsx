/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { AppColors, responsiveWidth } from '../utils'
import AppText from './AppText'
import LineBreak from './LineBreak'
import SVGXml from '../assets/icons/SVGXML'

type Prop = {
    title?: any,
    icon?: any,
    onPress?: any,
    subTitle?: any,
}

const ServiceCategory = ({ title, icon, onPress, subTitle }: Prop) => {
    return (
        <TouchableOpacity style={{ alignItems: 'center' }} onPress={onPress}>
            <View
                style={{
                    backgroundColor: AppColors.app_light,
                    width: 60,
                    height: 60,
                    borderRadius: 100,
                    justifyContent: 'center', alignItems: 'center'
                }}>
                <SVGXml icon={icon} width={30} height={30} />
            </View>
            <LineBreak space={1} />
            <AppText
                title={title}
                textSize={1.6}
                textColor={AppColors.ThemeColor}
                textFontWeight
                textAlignment={'center'}
            />
            <AppText
                title={subTitle}
                textSize={1.6}
                textColor={AppColors.ThemeColor}
                textFontWeight
                textAlignment={'center'}
            />
        </TouchableOpacity>
    )
}

export default ServiceCategory