/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import AppText from './AppText'
import { AppColors, responsiveHeight, responsiveWidth } from '../utils'
import LineBreak from './LineBreak'
import SVGXml from '../assets/icons/SVGXML'
import { AppIcons } from '../assets/icons'

const data = [
    { id: 1, title: 'From', subTitle: '24/12/24', icon: AppIcons.calendar_small },
    { id: 2, title: 'To', subTitle: '24/12/24', icon: AppIcons.calendar_small },
    { id: 3, title: 'Paid', subTitle: '$250', icon: AppIcons.dollar_small },
]

const BookingChatStatus = () => {
    return (
        <View>
            <View
                style={{
                    backgroundColor: AppColors.lighttest_yellow,
                    paddingVertical: responsiveHeight(0.5),
                    borderRadius: 100,
                    alignItems: 'center',
                }}>
                <AppText
                    title={'Project Status : Active'}
                    textSize={1.5}
                    textColor={AppColors.dark_yellow}
                />
            </View>
            <LineBreak space={1} />
            <View
                style={{
                    backgroundColor: AppColors.lighttest_yellow,
                    paddingVertical: responsiveHeight(2),
                    borderRadius: 15,
                    paddingHorizontal: responsiveWidth(4),
                }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: responsiveWidth(1) }}>
                        <SVGXml icon={AppIcons.requirements} width={20} height={20} />
                        <AppText
                            title={'Requirement & Details'}
                            textSize={1.8}
                            textColor={AppColors.ThemeColor}
                        />
                    </View>
                    <AppText
                        title={'ID#54654'}
                        textSize={1.8}
                        textColor={AppColors.ThemeColor}
                    />
                </View>
                <LineBreak space={1} />
                <AppText
                    title={'Lorem ipsum dolor sit amet, consectetur adipicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Lorem amet eiusmod tempor incididunt.'}
                    textSize={1.6}
                    textColor={AppColors.ThemeColor}
                />
            </View>
            <LineBreak space={1} />
            <View style={styles.container}>
                <FlatList
                    data={data}
                    horizontal
                    contentContainerStyle={{ flex: 1, justifyContent: 'space-between' }}
                    renderItem={({ item }) => (
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: responsiveWidth(2),
                            }}>
                            <View
                                style={{
                                    width: 20,
                                    height: 20,
                                    borderWidth: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: 100,
                                    borderColor: AppColors.ThemeColor
                                }}>
                                <SVGXml icon={item.icon} width={12} height={12} />
                            </View>
                            <AppText
                                textColor={AppColors.ThemeColor}
                                textSize={1.5}
                                title={item.title}
                            >:{" "}
                                <AppText
                                    textColor={AppColors.ThemeColor}
                                    textSize={1.5}
                                    title={item.subTitle}
                                    textFontWeight
                                />
                            </AppText>
                        </View>
                    )}
                />
            </View>

            <LineBreak space={1} />
            <View style={[styles.container, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
                <AppText
                    title={'Standard Plan'}
                    textSize={1.8}
                    textColor={AppColors.ThemeColor}
                />
                <SVGXml icon={AppIcons.right_arrow_two} width={15} height={15} />
            </View>

            <LineBreak space={2} />
        </View>
    )
}

export default BookingChatStatus;

const styles = StyleSheet.create({
    container: { borderWidth: 1, borderRadius: 15, borderColor: AppColors.LIGHTGRAY, paddingHorizontal: responsiveWidth(2), paddingVertical: responsiveHeight(1.5) }
})