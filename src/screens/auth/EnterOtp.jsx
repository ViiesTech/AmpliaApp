/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Container from '../../components/Container';
import {
  AppColors,
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
  ShowToast,
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
import { useSignupVerifyOTPMutation, useVerifyOTPMutation } from '../../redux/services/authService';

const EnterOtp = ({ route }) => {
  const nav = useNavigation();
  const [code, setCode] = useState('');
  const [verifyOTP, { isLoading }] = useVerifyOTPMutation();
  const [signupVerifyOTP,{isLoading: signupVerifyLoading}] = useSignupVerifyOTPMutation();

  const { email, type } = route?.params;

  console.log(email,type)

  const onVerifyPress = async () => {
    if (!code) {
      ShowToast('Please enter the OTP');
      return;
    }

    let data = {
      email: email,
      otp: code,
    };
   if(type === 'forget'){
      await verifyOTP(data).unwrap().then(res => {
        console.log('resend otp response', res);
        ShowToast(res?.message || 'OTP verified successfully');
        nav.navigate('CreateNewPassword', { email: email,type });
      })
      .catch(err => {
        console.log('verify otp error', err);
        ShowToast(err?.data?.message || 'Failed to verify OTP');
      });
   } else {
    await signupVerifyOTP(data).unwrap().then(res => {
      console.log('signup verify otp response', res);
      ShowToast(res?.message || 'OTP verified successfully');
      // nav.navigate('SignIn');
    })
    .catch(err => {
      console.log('signup verify otp error', err);
      ShowToast(err?.data?.message || 'Failed to verify OTP');
    });
   }
  };

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
        <FieldCode value={code} setValue={setCode} />
        <LineBreak space={2} />
        <AppButton indicator={type === 'register' ? isLoading : signupVerifyLoading} title={'Continue'} handlePress={() => onVerifyPress()} />
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
