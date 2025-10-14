/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import { View, Image, FlatList, TouchableOpacity } from 'react-native'
import { AppColors, responsiveHeight, responsiveWidth } from '../utils';
import { AppImages } from '../assets/images';
import AppText from './AppText';
import LineBreak from './LineBreak';
import SVGXml from '../assets/icons/SVGXML';
import { AppIcons } from '../assets/icons';
import AppButton from './AppButton';
import { useNavigation } from '@react-navigation/native';

const data = [
    { id: 1, title: 'From', subTitle: '24/12/24', icon: AppIcons.calendar_small },
    { id: 2, title: 'To', subTitle: '24/12/24', icon: AppIcons.calendar_small },
    { id: 3, title: 'Paid', subTitle: '$250', icon: AppIcons.dollar_small },
]

type Prop = {
    title?: string,
    subTitle?: string,
    status?: string,
    OnPressCard?: () => void,
}

const ManageBookingsCard = ({ title, subTitle, status, OnPressCard }: Prop) => {
    const nav = useNavigation();
    return (
        <TouchableOpacity
            style={{
                backgroundColor: AppColors.app_light,
                paddingHorizontal: responsiveWidth(4),
                paddingVertical: responsiveHeight(2),
                borderRadius: 10,
            }}
            onPress={OnPressCard}
        >
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: responsiveWidth(3) }}>
                <Image source={AppImages.service_one} style={{ width: 45, height: 45, borderRadius: 10 }} />
                <View>
                    <AppText
                        textColor={AppColors.Dark_themeColor}
                        textSize={1.6}
                        title={title}
                        textFontWeight
                    />
                    <AppText
                        textColor={AppColors.ThemeColor}
                        textSize={1.5}
                        title={subTitle}
                    />
                </View>
                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                    <View style={{
                        backgroundColor: status === 'Active' ? AppColors.lighttest_yellow : status === 'Completed' ? AppColors.lighttest_green : AppColors.lighttest_gray,
                        paddingHorizontal: responsiveWidth(3),
                        paddingVertical: responsiveHeight(0.5), borderRadius: 100
                    }}>
                        <AppText
                            title={status}
                            textSize={1.2}
                            textColor={status === 'Active' ? AppColors.dark_yellow : status === 'Completed' ? AppColors.darkGreen : AppColors.darkest}
                        />
                    </View>
                </View>
            </View>
            <LineBreak space={2} />
            <FlatList
                data={data}
                horizontal
                contentContainerStyle={{ flex: 1, justifyContent: 'space-between' }}
                renderItem={({ item }) => (
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: responsiveWidth(2)
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
            {status === 'Completed' && <View>
                <LineBreak space={2} />

                <AppText
                    textColor={AppColors.ThemeColor}
                    textSize={1.5}
                    title={'Remarks by admin:'}
                />
                <LineBreak space={0.5} />
                <AppText
                    textColor={AppColors.ThemeColor}
                    textSize={1.5}
                    title={'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nis'}
                />
                <LineBreak space={2} />
                <AppButton title={'Review'} textSize={2} btnPadding={10} textFontWeight={false} handlePress={() => nav.navigate("ReviewsAndRatings")} />
            </View>}
        </TouchableOpacity>
    );
};

export default ManageBookingsCard;