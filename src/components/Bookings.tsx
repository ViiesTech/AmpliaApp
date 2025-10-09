/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import { View } from 'react-native'
import SVGXml from '../assets/icons/SVGXML'
import { AppIcons } from '../assets/icons'
import { AppColors, responsiveHeight, responsiveWidth } from '../utils'
import AppText from './AppText'
import LineBreak from './LineBreak'

type Props = {
    title?: any,
    date?: any,
    status?: any,
}

const Bookings = ({ title, date, status }: Props) => {
    return (
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderRadius: 20,
                borderBottomWidth: 1,
                borderBottomColor: AppColors.LIGHTGRAY,
                paddingVertical: responsiveHeight(2)
            }}>
            <View
                style={{
                    flexDirection: 'row',
                    gap: responsiveWidth(3),
                    alignItems: 'center'
                }}>
                <View
                    style={{
                        backgroundColor: AppColors.ThemeColor,
                        width: 45,
                        height: 45,
                        borderRadius: 100,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <SVGXml icon={AppIcons.file_white} width={21} height={21} />
                </View>
                <View>
                    <AppText
                        title={title}
                        textSize={1.7}
                        textColor={AppColors.ThemeColor}
                        textFontWeight
                    />
                    <LineBreak space={0.5} />
                    <View style={{ flexDirection: 'row', gap: responsiveWidth(2), alignItems: 'center' }}>
                        <View style={{
                            borderWidth: 1,
                            borderColor: AppColors.ThemeColor,
                            width: 25,
                            height: 25,
                            borderRadius: 100,
                            justifyContent: 'center', alignItems: 'center'
                        }}>
                            <SVGXml icon={AppIcons.file_theme} width={15} height={15} />
                        </View>
                        <AppText
                            title={'Schedule Date:'}
                            textSize={1.7}
                            textColor={AppColors.ThemeColor}
                        >{" "}
                            <AppText
                                title={date}
                                textSize={1.7}
                                textColor={AppColors.ThemeColor}
                                textFontWeight
                            />
                        </AppText>
                    </View>
                </View>
            </View>
            <View style={{
                backgroundColor: status === 'Active' ? AppColors.lighttest_yellow : status === 'Completed' ? AppColors.lighttest_green : AppColors.lighttest_gray,
                paddingHorizontal: responsiveWidth(3),
                paddingVertical: responsiveHeight(0.5), borderRadius: 100
            }}>
                <AppText
                    title={status}
                    textSize={1.2}
                    textColor={status === 'Active' ? AppColors.darkYellow : status === 'Completed' ? AppColors.darkGreen : AppColors.darkest}
                />
            </View>
        </View>
    )
}

export default Bookings