/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Container from '../../components/Container';
import {
  AppColors,
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../utils';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LineBreak from '../../components/LineBreak';
import SVGXml from '../../assets/icons/SVGXML';
import { AppIcons } from '../../assets/icons';
import FieldCode from '../../components/CodeField';
import AppButton from '../../components/AppButton';
import { useNavigation } from '@react-navigation/native';
import AppText from '../../components/AppText';
import BackIcon from '../../components/BackIcon';

const EnterOtp = () => {
  const nav = useNavigation();

  return (
    <Container
      scrollEnabled={false}
      safeAreaViewStyle={{
        flex: 1,
        paddingHorizontal: responsiveWidth(5),
      }}
    >
      <LineBreak space={2} />
      <BackIcon onPress={() => nav.goBack()} />

      <View style={{ flex: 1, justifyContent: 'center' }}>
        <View>
          <SVGXml
            icon={AppIcons.enter_otp}
            width={responsiveWidth(40)}
            height={responsiveHeight(10)}
          />
        </View>
        <FieldCode />
        <LineBreak space={2} />
        <AppButton
          title={'Continue'}
          handlePress={() => nav.navigate('SignIn')}
        />
        <LineBreak space={1} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <AppText
            title={"Didn't  Receive the OTP?"}
            textSize={1.8}
            textColor={AppColors.Dark_themeColor}
          />
          <TouchableOpacity onPress={() => {}}>
            <AppText
              title={' Resend'}
              textSize={1.8}
              textFontWeight
              textColor={AppColors.ThemeColor}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Container>
  );
};

export default EnterOtp;
