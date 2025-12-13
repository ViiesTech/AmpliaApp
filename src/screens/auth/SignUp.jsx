/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import Container from '../../components/Container';
import {
  AppColors,
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
  ShowToast,
} from '../../utils';
import { AppImages } from '../../assets/images';
import LineBreak from '../../components/LineBreak';
import SVGXml from '../../assets/icons/SVGXML';
import { AppIcons } from '../../assets/icons';
import AppTextInput from '../../components/AppTextInput';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AppButton from '../../components/AppButton';
import { useNavigation } from '@react-navigation/native';
import AppText from '../../components/AppText';
import { useRegisterMutation } from '../../redux/services/authService';

const SignUp = () => {
  const [isFirstNameFocused, setIsFirstNameFocused] = useState(false);
  const [isLastNameFocused, setIsLastNameFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isCompanyFocused, setIsCompanyFocused] = useState(false);
  const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] =
    useState(false);
  const [isShow, setIsShow] = useState(true);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(true);
  const [state, setState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    companyName: '',
    password: '',
    confirmPassword: '',
  });
  const [register,{isLoading}] = useRegisterMutation();
  const nav = useNavigation();

  const onChangeText = (key, value) => {
    setState({
      ...state,
      [key]: value,
    });
  };

  const onSignUpPress = async () => {
    if (!state.firstName) {
      ShowToast('Please enter first name');
      return;
    }
    if (!state.lastName) {
      ShowToast('Please enter last name');
      return;
    }
    if (!state.email) {
      ShowToast('Please enter email address');
      return;
    }
    if (!state.companyName) {
      ShowToast('Please enter company name');
      return;
    }
    if (!state.password) {
      ShowToast('Please enter password');
      return;
    }
    if (state.password.length < 6) {
      ShowToast('Password must be at least 6 characters long');
      return;
    }
    if (state.password !== state.confirmPassword) {
      ShowToast('Confirm Password does not match');
      return;
    }

    let data = {
      firstName: state.firstName,
      lastName: state.lastName,
      email: state.email,
      companyName: state.companyName,
      password: state.password,
    };

    await register(data)
      .unwrap()
      .then(res => {
        console.log('register response ===>', res);
        if (res.success) {
          ShowToast(res.message);
          nav.navigate('EnterOtp', { email: state.email, type: 'register' });
        }
      })
      .catch(err => {
        console.log('error while register', err);
        return ShowToast(err?.data?.message || 'Some problem occured');
      });
  }

  return (
    <Container
      showScrollBar={false}
      safeAreaViewStyle={{
        paddingHorizontal: responsiveWidth(5),
      }}
    >
      <Image source={AppImages.horizontal_logo} style={styles.image} />
      <LineBreak space={1} />
      <SVGXml icon={AppIcons.sign_up} width={90} height={90} />
      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <AppTextInput
            inputPlaceHolder={'First Name'}
            borderWidth={1}
            value={state.firstName}
            onChangeText={text => onChangeText('firstName', text)}
            borderColor={AppColors.LIGHTGRAY}
            isFocused={isFirstNameFocused}
            onFocus={() => setIsFirstNameFocused(true)}
            onBlur={() => setIsFirstNameFocused(false)}
            inputWidth={33}
          />
          <AppTextInput
            inputPlaceHolder={'Last Name'}
            borderWidth={1}
            value={state.lastName}
            onChangeText={text => onChangeText('lastName', text)}
            borderColor={AppColors.LIGHTGRAY}
            isFocused={isLastNameFocused}
            onFocus={() => setIsLastNameFocused(true)}
            onBlur={() => setIsLastNameFocused(false)}
            inputWidth={33}
          />
        </View>
        <LineBreak space={1} />
        <AppTextInput
          inputPlaceHolder={'Email Address'}
          borderWidth={1}
          value={state.email}
          onChangeText={text => onChangeText('email', text)}
          borderColor={AppColors.LIGHTGRAY}
          isFocused={isEmailFocused}
          onFocus={() => setIsEmailFocused(true)}
          onBlur={() => setIsEmailFocused(false)}
        />
        <LineBreak space={1} />
        <AppTextInput
          inputPlaceHolder={'Company Name'}
          borderWidth={1}
          value={state.companyName}
          onChangeText={text => onChangeText('companyName', text)}
          borderColor={AppColors.LIGHTGRAY}
          isFocused={isCompanyFocused}
          onFocus={() => setIsCompanyFocused(true)}
          onBlur={() => setIsCompanyFocused(false)}
        />
        <LineBreak space={1} />
        <AppTextInput
          inputPlaceHolder={'Password'}
          borderWidth={1}
          value={state.password}
          onChangeText={text => onChangeText('password', text)}
          isFocused={isPasswordFocused}
          onFocus={() => setIsPasswordFocused(true)}
          onBlur={() => setIsPasswordFocused(false)}
          secureTextEntry={isShow}
          inputWidth={72}
          rightIcon={
            <TouchableOpacity onPress={() => setIsShow(!isShow)}>
              <Ionicons
                name={isShow ? 'eye-off' : 'eye'}
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
          value={state.confirmPassword}
          onChangeText={text => onChangeText('confirmPassword', text)}
          isFocused={isConfirmPasswordFocused}
          onFocus={() => setIsConfirmPasswordFocused(true)}
          onBlur={() => setIsConfirmPasswordFocused(false)}
          secureTextEntry={isShowConfirmPassword}
          inputWidth={72}
          rightIcon={
            <TouchableOpacity
              onPress={() => setIsShowConfirmPassword(!isShowConfirmPassword)}
            >
              <Ionicons
                name={isShowConfirmPassword ? 'eye-off' : 'eye'}
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
          title={'Sign Up'}
          indicator={isLoading}
          handlePress={() => onSignUpPress()}
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
            title={'Already have an account?'}
            textSize={1.8}
            textColor={AppColors.Dark_themeColor}
          />
          <TouchableOpacity onPress={() => nav.navigate('SignIn')}>
            <AppText
              title={' Sign In'}
              textSize={1.8}
              textFontWeight
              textColor={AppColors.ThemeColor}
            />
          </TouchableOpacity>
        </View>
        <LineBreak space={2} />
      </View>
    </Container>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  image: {
    width: responsiveWidth(49),
    resizeMode: 'contain',
    alignSelf: 'center',
    height: responsiveHeight(20),
  },
});
