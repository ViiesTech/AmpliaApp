/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View } from 'react-native';
import { AppColors } from '../utils/index';
import { responsiveHeight, responsiveWidth } from '../utils/index';
import { useNavigation } from '@react-navigation/native';
import AppText from './AppText';
import BackIcon from './BackIcon';

type props = {
  // title?: string,
  onBackPress?: any;
  heading?: any;
  rightIcon?: any;
  middleIcon?: any;
  backIconColor?: any;
};

const AppHeader = ({ onBackPress, heading, rightIcon, middleIcon, backIconColor }: props) => {
  const nav = useNavigation();
  const backHandler = () => {
    nav.goBack();
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: responsiveHeight(2),
      }}
    >
      {/* Left icon */}
      {onBackPress && <View style={{ width: responsiveWidth(10), alignItems: 'flex-start' }}>
        <BackIcon onPress={backHandler} />
      </View>}

      {/* Center text */}
      <View style={{ paddingHorizontal: onBackPress ? responsiveWidth(5) : 0 }}>
        {middleIcon ? (
          middleIcon
        ) : (
          <AppText
            title={heading}
            textColor={backIconColor ? backIconColor : AppColors.BLACK}
            textFontWeight
            textSize={2.5}
          />
        )}
      </View>

      {/* Right icon */}
      <View style={{ flex: 1, alignItems: 'flex-end' }}>
        {rightIcon}
      </View>
    </View>
  );
};

export default AppHeader;
