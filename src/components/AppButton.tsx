/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { AppColors, responsiveWidth } from '../utils/index';
import AppText from './AppText';
import LinearGradient from 'react-native-linear-gradient';

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
}: props) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={activeOpacity || 0.8}
      style={{
        borderRadius: borderRadius ?? 100,
      }}
    >
      <LinearGradient
        colors={ btnBackgroundColor ? [AppColors.WHITE, AppColors.WHITE] : ['#003C46', '#007C91']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          padding: btnPadding ?? 14,
          borderRadius: borderRadius ?? 100,
          width: btnWidth ? responsiveWidth(btnWidth) : 'auto',
          borderWidth: borderWidth || 0,
          borderColor: borderColor ?? 'transparent',
          flexDirection: 'row',
          backgroundColor: btnBackgroundColor,
        }}
      >
        {leftIcon && leftIcon}
        <AppText
          textColor={textColor ?? AppColors.WHITE}
          textSize={textSize ?? 2}
          title={title}
          textFontWeight={textFontWeight}
        />
      </LinearGradient>
    </TouchableOpacity>

  );
};

export default AppButton;
