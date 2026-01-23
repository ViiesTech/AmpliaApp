/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Platform, TouchableOpacity, View, Text } from 'react-native';
import { AppColors, responsiveWidth, responsiveFontSize } from '../utils/index';
import LinearGradient from 'react-native-linear-gradient';
import Loader from './Loader';

type props = {
  title?: any;
  handlePress?: () => void;
  textColor?: any;
  textFontWeight?: boolean;
  textSize?: any;
  btnWidth?: any;
  btnBackgroundColor?: any;
  btnPadding?: any;
  borderWidth?: any;
  borderColor?: any;
  borderRadius?: any;
  leftIcon?: any;
  activeOpacity?: any;
  indicator?: any;
  indicatorColor?: any;
};
const AppButton = ({
  title,
  handlePress,
  leftIcon,
  borderRadius,
  borderWidth,
  borderColor,
  btnPadding,
  btnBackgroundColor,
  btnWidth,
  textColor = AppColors.WHITE,
  textFontWeight = true,
  textSize = 2.2,
  activeOpacity,
  indicator,
  indicatorColor
}: props) => {
  const hasCustomPadding = btnPadding != null;
  const verticalPadding = hasCustomPadding ? btnPadding : 16;
  const horizontalPadding = hasCustomPadding ? btnPadding + 8 : 20;
  const minHeight = !hasCustomPadding && Platform.OS === 'ios' ? 48 : undefined;
  const buttonWidth = btnWidth ? responsiveWidth(btnWidth) : undefined;
  const alignSelf = btnWidth ? 'flex-start' : 'stretch';

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={activeOpacity || 0.8}
      style={{
        width: buttonWidth,
        alignSelf,
        minHeight,
      }}
    >
      <LinearGradient
        colors={btnBackgroundColor ? [AppColors.WHITE, AppColors.WHITE] : ['#003C46', '#007C91']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{
          alignSelf: 'stretch',
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: verticalPadding,
          paddingHorizontal: horizontalPadding,
          minHeight,
          borderRadius: borderRadius ?? 100,
          borderWidth: borderWidth || 0,
          borderColor: borderColor ?? 'transparent',
          backgroundColor: btnBackgroundColor,
        }}
      >
        {indicator ? (
          <Loader color={indicatorColor} />
        ) : (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {leftIcon && leftIcon}
            <Text
              style={{
                color: textColor,
                fontSize: responsiveFontSize(textSize),
                fontWeight: textFontWeight ? 'bold' : 'normal',
              }}
            >
              {title}
            </Text>
          </View>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default AppButton;
