/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Container from '../../components/Container';
import {
  AppColors,
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../utils';
import { useNavigation } from '@react-navigation/native';
import LineBreak from '../../components/LineBreak';
import BackIcon from '../../components/BackIcon';
import { AppIcons } from '../../assets/icons';
import SVGXml from '../../assets/icons/SVGXML';
import AppTextInput from '../../components/AppTextInput';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AppButton from '../../components/AppButton';

const CreateNewPassword = () => {
  const nav = useNavigation();
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] =
    useState(false);
  const [isShow, setIsShow] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);

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
            icon={AppIcons.create_new_password}
            width={responsiveWidth(80)}
            height={responsiveHeight(10)}
          />
        </View>
        <LineBreak space={1} />
        <AppTextInput
          inputPlaceHolder={'Password'}
          borderWidth={1}
          isFocused={isPasswordFocused}
          onFocus={() => setIsPasswordFocused(true)}
          onBlur={() => setIsPasswordFocused(false)}
          inputWidth={72}
          rightIcon={
            <TouchableOpacity onPress={() => setIsShow(!isShow)}>
              <Ionicons
                name={!isShow ? 'eye' : 'eye-off'}
                size={responsiveFontSize(2.5)}
                color={
                  isPasswordFocused ? AppColors.ThemeColor : AppColors.DARKGRAY
                }
              />
            </TouchableOpacity>
          }
          borderColor={AppColors.LIGHTGRAY}
        />
        <LineBreak space={1} />
        <AppTextInput
          inputPlaceHolder={'Confirm Password'}
          borderWidth={1}
          isFocused={isConfirmPasswordFocused}
          onFocus={() => setIsConfirmPasswordFocused(true)}
          onBlur={() => setIsConfirmPasswordFocused(false)}
          inputWidth={72}
          rightIcon={
            <TouchableOpacity
              onPress={() => setIsShowConfirmPassword(!isShowConfirmPassword)}
            >
              <Ionicons
                name={!isShowConfirmPassword ? 'eye' : 'eye-off'}
                size={responsiveFontSize(2.5)}
                color={
                  isConfirmPasswordFocused
                    ? AppColors.ThemeColor
                    : AppColors.DARKGRAY
                }
              />
            </TouchableOpacity>
          }
          borderColor={AppColors.LIGHTGRAY}
        />
        <LineBreak space={1} />
        <AppButton
          title={'Continue'}
          handlePress={() => nav.navigate('SignIn')}
        />
        <LineBreak space={1} />
      </View>
    </Container>
  );
};

export default CreateNewPassword;
