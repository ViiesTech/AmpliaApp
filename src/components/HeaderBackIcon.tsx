import React from 'react';
import {TouchableOpacity} from 'react-native';
import SVGXml from '../assets/icons/SVGXML';
import { AppIcons } from '../assets/icons';
import { AppColors, responsiveFontSize } from '../utils';

const HeaderBackIcon = ({onBackPress, iconColor}: any) => {
  return (
    <TouchableOpacity onPress={onBackPress}>
      <SVGXml
        icon={AppIcons.chevron_left(iconColor ? iconColor : AppColors.ThemeBlue)}
        width={responsiveFontSize(4)}
        height={responsiveFontSize(4)}
      />
    </TouchableOpacity>
  );
};

export default HeaderBackIcon;
