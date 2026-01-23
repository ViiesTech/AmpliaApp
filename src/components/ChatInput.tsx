/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import AppTextInput from './AppTextInput'
import { AppColors, responsiveFontSize, responsiveWidth } from '../utils'
import LinearGradient from 'react-native-linear-gradient'
import SVGXml from '../assets/icons/SVGXML';
import { AppIcons } from '../assets/icons';

const ChatInput = () => {
    return (
        <View>
            <AppTextInput
                inputPlaceHolder={'Enter Your Message'}
                borderWidth={1}
                inputWidth={55}
                borderColor={AppColors.LIGHTGRAY}
                rightIcon={
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: responsiveWidth(3),
                        }}
                    >
                        <TouchableOpacity>
                            <SVGXml
                                icon={AppIcons.attachment_icon(AppColors.Dark_themeColor)}
                                width={responsiveFontSize(2.2)}
                                height={responsiveFontSize(2.2)}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <SVGXml
                                icon={AppIcons.image_icon(AppColors.Dark_themeColor)}
                                width={responsiveFontSize(2.2)}
                                height={responsiveFontSize(2.2)}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <LinearGradient
                                colors={['#003C46', '#007C91']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width: 40,
                                    height: 40,
                                    borderRadius: 100,
                                    backgroundColor: AppColors.ThemeColor,
                                }}
                            >
                                <SVGXml
                                    icon={AppIcons.send_icon(AppColors.WHITE)}
                                    width={responsiveFontSize(2.2)}
                                    height={responsiveFontSize(2.2)}
                                />
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                }
            />
        </View>
    )
}

export default ChatInput