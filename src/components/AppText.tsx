/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Text } from 'react-native';
import { AppColors, responsiveFontSize, responsiveHeight, responsiveWidth } from '../utils';

type textProps = {
  title?: any;
  textSize?: any;
  textColor?: any;
  textFontWeight?: boolean;
  textAlignment?: any;
  textwidth?: any;
  lineHeight?: any;
  numberOfLines?: any;
  borderBottomColor?: any;
  borderBottomWidth?: any;
  paddingBottom?: any;
  textTransform?: any;
  children?: React.ReactNode;
  textDecorationLine?: any;
  paddingHorizontal?: any;
};

const AppText = ({
  title,
  textSize,
  textColor,
  textFontWeight,
  textAlignment,
  textwidth,
  lineHeight,
  numberOfLines,
  borderBottomColor,
  borderBottomWidth,
  paddingBottom,
  textTransform,
  children,
  textDecorationLine,
  paddingHorizontal,
}: textProps) => {
  return (
    <Text
      numberOfLines={numberOfLines}
      style={{
        width: textwidth ? responsiveWidth(textwidth) : undefined,
        fontSize: textSize
          ? responsiveFontSize(textSize)
          : responsiveFontSize(1.4),
        fontWeight: textFontWeight ? 'bold' : 'regular',
        color: textColor ? textColor : AppColors.BLACK,
        lineHeight: lineHeight ? responsiveHeight(lineHeight) : undefined,
        borderBottomWidth: borderBottomWidth ? borderBottomWidth : undefined,
        borderBottomColor: borderBottomColor ? borderBottomColor : undefined,
        textTransform: textTransform ? textTransform : undefined,
        paddingBottom: paddingBottom ? responsiveHeight(paddingBottom) : undefined,
        textDecorationLine: textDecorationLine,
        paddingHorizontal: paddingHorizontal ? responsiveWidth(paddingHorizontal) : 0,
      }}>
      {title}
      {children}
    </Text>
  );
};

export default AppText;
