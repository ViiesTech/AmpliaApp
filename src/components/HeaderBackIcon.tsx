import React from 'react';
import {TouchableOpacity} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { AppColors, responsiveFontSize } from '../utils';

const HeaderBackIcon = ({onBackPress, iconColor}: any) => {
  return (
    <TouchableOpacity onPress={onBackPress}>
      <FontAwesome
        name={'angle-left'}
        size={responsiveFontSize(4)}
        color={iconColor ? iconColor : AppColors.ThemeBlue}
      />
    </TouchableOpacity>
  );
};

export default HeaderBackIcon;
